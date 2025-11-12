import type {
  Alert,
  AlertType,
  AlertQuery,
  HandleAlertResponse,
  SendAlertResponse,
  UpdateAlert,
} from "@src/types/alerts.js";

import { eq, and } from "drizzle-orm";

import { config } from "@src/config.js";
import { database, databaseSchema } from "@src/database.js";

import { sendGridService } from "./sendgrid.js";
import { twilioService } from "./twilio.js";

export class AlertsService {
  async handleAlert(domain: string): Promise<HandleAlertResponse> {
    const alerts = await this.retrieveManyByDomain(domain);

    if (alerts === undefined)
      return { error: true, alertsExist: false, alertsTriggered: [] };
    if (alerts.length === 0)
      return { error: false, alertsExist: false, alertsTriggered: [] };

    const alertsTriggered = await Promise.all(
      alerts.map(async (alert) => {
        const alertSent = await this.sendAlert(domain, alert.id, alert.type);
        return { alertType: alert.type, alertSent };
      })
    );

    return { error: false, alertsExist: true, alertsTriggered };
  }

  async create(domain: string, type: AlertType, target: string): Promise<void> {
    const id = crypto.randomUUID();

    await database.insert(databaseSchema.alerts).values({
      id,
      domain,
      type,
    });

    switch (type) {
      case "EMAIL":
        await database.insert(databaseSchema.emailAlerts).values({
          id,
          email: target,
        });
        break;
      case "SMS":
        await database.insert(databaseSchema.smsAlerts).values({
          id,
          phoneNumber: target,
        });
        break;
      case "WEBHOOK":
        await database.insert(databaseSchema.webhookAlerts).values({
          id,
          url: target,
        });
        break;
    }
  }

  async update(
    query: AlertQuery,
    data: UpdateAlert,
    target: string
  ): Promise<void> {
    if (query.id) {
      await database
        .update(databaseSchema.alerts)
        .set(data)
        .where(eq(databaseSchema.alerts.id, query.id))
        .returning();
      switch (data.type) {
        case "EMAIL":
          await database
            .update(databaseSchema.emailAlerts)
            .set({ email: target })
            .where(eq(databaseSchema.emailAlerts.id, query.id));
          break;
        case "SMS":
          await database
            .update(databaseSchema.smsAlerts)
            .set({ phoneNumber: target })
            .where(eq(databaseSchema.smsAlerts.id, query.id));
          break;
        case "WEBHOOK":
          await database
            .update(databaseSchema.webhookAlerts)
            .set({ url: target })
            .where(eq(databaseSchema.webhookAlerts.id, query.id));
          break;
      }
    } else if (query.domain && query.type) {
      const alerts = await database
        .update(databaseSchema.alerts)
        .set(data)
        .where(
          and(
            eq(databaseSchema.alerts.domain, query.domain),
            eq(databaseSchema.alerts.type, query.type)
          )
        )
        .returning();
      for (const alert of alerts) {
        switch (data.type) {
          case "EMAIL":
            await database
              .update(databaseSchema.emailAlerts)
              .set({ email: target })
              .where(eq(databaseSchema.emailAlerts.id, alert.id));
            break;
          case "SMS":
            await database
              .update(databaseSchema.smsAlerts)
              .set({ phoneNumber: target })
              .where(eq(databaseSchema.smsAlerts.id, alert.id));
            break;
          case "WEBHOOK":
            await database
              .update(databaseSchema.webhookAlerts)
              .set({ url: target })
              .where(eq(databaseSchema.webhookAlerts.id, alert.id));
            break;
        }
      }
    } else return undefined;
  }

  async delete(id: string): Promise<void> {
    await database
      .delete(databaseSchema.alerts)
      .where(eq(databaseSchema.alerts.id, id));
  }

  private async sendAlert(
    domain: string,
    id: string,
    type: AlertType
  ): Promise<SendAlertResponse> {
    const target = await this.resolveTarget(id, type);

    // Intentionally not awaited - don't care if the alert fails.
    switch (type) {
      case "EMAIL":
        this.sendEmailAlert(domain, target).catch(() => {
          console.error("Failed to send email alert");
        });
        break;
      case "SMS":
        this.sendSmsAlert(domain, target).catch(() => {
          console.error("Failed to send SMS alert");
        });
        break;
      case "WEBHOOK":
        this.sendWebhookAlert(domain, target).catch(() => {
          console.error("Failed to send webhook alert");
        });
        break;
    }

    return { id, target };
  }

  private async sendEmailAlert(domain: string, email: string): Promise<void> {
    if (config.emailEnabled) {
      sendGridService
        .sendEmail(
          email,
          `Alert: Your monitored domain ${domain} is down`,
          "The domain you are monitoring has been detected as down. This is an automated email, please do not reply."
        )
        .catch((error) => {
          console.error("Error sending email via SendGrid:", error);
        });
    } else console.log("Attempted to send email when disabled.", { domain });
  }

  private async sendSmsAlert(
    domain: string,
    phoneNumber: string
  ): Promise<void> {
    if (config.smsEnabled) {
      twilioService
        .sendSMS(phoneNumber, `Alert: Your monitored domain ${domain} is down`)
        .catch((error) => {
          console.error("Error sending SMS via Twilio:", error);
        });
    } else console.log("Attempted to send SMS when disabled.", { domain });
  }

  private async sendWebhookAlert(domain: string, url: string): Promise<void> {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        domain,
        timestamp: new Date().toISOString(),
        message: `Alert: monitored domain ${domain} is down`,
      }),
    }).catch((error) => {
      console.error("Error sending webhook alert:", error);
    });
  }

  async retrieve(query: AlertQuery): Promise<Alert[] | undefined> {
    if (query.id) {
      return await database
        .select()
        .from(databaseSchema.alerts)
        .where(eq(databaseSchema.alerts.domain, query.id));
    } else if (query.domain && query.type) {
      return await database
        .select()
        .from(databaseSchema.alerts)
        .where(
          and(
            eq(databaseSchema.alerts.domain, query.domain),
            eq(databaseSchema.alerts.type, query.type)
          )
        );
    } else return undefined;
  }

  async retrieveManyByDomain(domain: string): Promise<Alert[] | undefined> {
    return await database
      .select()
      .from(databaseSchema.alerts)
      .where(eq(databaseSchema.alerts.domain, domain));
  }

  private async resolveTarget(
    alertId: string,
    type: AlertType
  ): Promise<string> {
    switch (type) {
      case "EMAIL": {
        const record = (
          await database
            .select()
            .from(databaseSchema.emailAlerts)
            .where(eq(databaseSchema.emailAlerts.id, alertId))
            .limit(1)
        )[0];
        if (!record?.email)
          throw new Error(`alert ${alertId} missing email target`);
        return record.email;
      }
      case "SMS": {
        const record = (
          await database
            .select()
            .from(databaseSchema.smsAlerts)
            .where(eq(databaseSchema.smsAlerts.id, alertId))
            .limit(1)
        )[0];
        if (!record?.phoneNumber)
          throw new Error(`alert ${alertId} missing sms target`);
        return record.phoneNumber;
      }
      case "WEBHOOK": {
        const record = (
          await database
            .select()
            .from(databaseSchema.webhookAlerts)
            .where(eq(databaseSchema.webhookAlerts.id, alertId))
            .limit(1)
        )[0];
        if (!record?.url)
          throw new Error(`alert ${alertId} missing webhook target`);
        return record.url;
      }
    }
  }
}

export const alertsService = new AlertsService();
