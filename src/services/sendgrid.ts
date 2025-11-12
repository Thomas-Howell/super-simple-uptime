import sgMail from "@sendgrid/mail";
import type { EmailService } from "@src/services/monitor.js";
import { config } from "@src/config.js";

export class SendGridService implements EmailService {
  private sgMail = sgMail;

  constructor(apiKey: string) {
    if (config.emailEnabled) {
      this.sgMail.setApiKey(apiKey);
    }
  }

  async sendEmail(to: string, subject: string, text: string) {
    await this.sgMail.send({
      to,
      from: process.env["SENDGRID_FROM_EMAIL"]! as string,
      subject,
      text,
    });
  }
}

export const sendGridService = new SendGridService(
  process.env["SENDGRID_API_KEY"]! as string
);
