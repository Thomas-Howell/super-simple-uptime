import { eq } from "drizzle-orm";

import { database, databaseSchema } from "@src/database.js";
import { uptimeService } from "@src/services/uptime.js";

export interface MonitorResult {
  domain: string;
  isUp: boolean;
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
      monitors.map((monitor) => this.checkOnline(monitor.domain))
    );
    return results;
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

  async create(domain: string) {
    await database.insert(databaseSchema.monitors).values({
      domain,
    });
  }

  async retrieve(domain: string) {
    return await database
      .select()
      .from(databaseSchema.monitors)
      .where(eq(databaseSchema.monitors.domain, domain));
  }

  async update(domain: string, newDomain: string) {
    await database
      .update(databaseSchema.monitors)
      .set({ domain: newDomain })
      .where(eq(databaseSchema.monitors.domain, domain));
  }

  async delete(domain: string) {
    await database
      .delete(databaseSchema.monitors)
      .where(eq(databaseSchema.monitors.domain, domain));
  }
}

export const monitorService = new MonitorService();
