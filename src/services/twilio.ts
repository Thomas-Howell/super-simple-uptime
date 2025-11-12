import twilio from "twilio";
import type { SMSService } from "./monitor.js";
import { config } from "@src/config.js";

export class TwilioService implements SMSService {
  private twilioClient;

  constructor() {
    if (config.smsEnabled) {
      this.twilioClient = twilio(
        process.env["TWILIO_ACCOUNT_SID"]! as string,
        process.env["TWILIO_AUTH_TOKEN"]! as string
      );
    }
  }

  async sendSMS(to: string, message: string) {
    if (this.twilioClient) {
      await this.twilioClient.messages.create({
        to,
        from: process.env["TWILIO_FROM_PHONE"]! as string,
        body: message,
      });
    }
  }
}

export const twilioService = new TwilioService();
