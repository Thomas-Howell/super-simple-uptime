import { eq } from "drizzle-orm";
import { database, databaseSchema } from "@src/database.js";
import { uptimeService } from "@src/services/uptime.js";
import { alertsService } from "@src/services/alerts.js";
import type { Monitor, MonitorResult } from "@src/types/monitor.js";

export interface EmailService {
  sendEmail(to: string, subject: string, text: string): Promise<void>;
}

export interface SMSService {
  sendSMS(to: string, message: string): Promise<void>;
}

export interface WebhookService {
  sendWebhook(url: string, payload: object): Promise<void>;
}

export class MonitorService {
  async startMonitoring() {
    this.checkAll().catch((error) => {
      console.error("Error during initial checkAll:", error);
    });

    setInterval(
      () => {
        this.checkAll().catch((error) => {
          console.error("Error during periodic checkAll:", error);
        });
      },
      Number(process.env["UPTIME_INTERVAL_MINUTES"]) * 60 * 1000
    );
  }

  async checkAll() {
    const monitors = await database.select().from(databaseSchema.monitors);
    const results: MonitorResult[] = await Promise.all(
      monitors.map((monitor) => this.handleMonitorCheck(monitor.domain))
    );
    return results;
  }

  async handleMonitorCheck(domain: string) {
    const check = await this.checkOnline(domain);
    if (check.isUp === false) {
      alertsService.handleAlert(domain).catch((error) => {
        console.error(`Error handling alert for domain ${domain}:`, error);
      });
    }
    return check;
  }

  async checkOnline(domain: string): Promise<MonitorResult> {
    try {
      const request: Request = new Request(`https://${domain}`, {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
        credentials: "omit",
        headers: {
          "User-Agent": "SuperSimpleUptime/1.0",
        },
        mode: "cors",
        keepalive: false,
        referrer: "",
      });

      const response = await fetch(request);
      const isUp = this.parseResponse(response);
      await uptimeService.logUptime(domain, isUp);
      return { domain, isUp };
    } catch {
      await uptimeService.logUptime(domain, false);
      return { domain, isUp: false };
    }
  }

  private parseResponse(response: Response): boolean {
    if (response.ok) {
      return true;
    } else return false;
  }

  async create(domain: string): Promise<Monitor> {
    return (
      await database
        .insert(databaseSchema.monitors)
        .values({
          domain,
        })
        .returning()
    )[0];
  }

  async retrieve(domain: string): Promise<Monitor | undefined> {
    return (
      await database
        .select()
        .from(databaseSchema.monitors)
        .where(eq(databaseSchema.monitors.domain, domain))
        .limit(1)
    )[0];
  }

  async update(
    domain: string,
    newDomain: string
  ): Promise<Monitor | undefined> {
    return (
      await database
        .update(databaseSchema.monitors)
        .set({ domain: newDomain })
        .where(eq(databaseSchema.monitors.domain, domain))
        .returning()
    )[0];
  }

  async delete(domain: string): Promise<void> {
    await database
      .delete(databaseSchema.monitors)
      .where(eq(databaseSchema.monitors.domain, domain));
  }
}

export const monitorService = new MonitorService();
