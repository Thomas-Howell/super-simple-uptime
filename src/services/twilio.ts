import twilio from "twilio";
import type { SMSService } from "./monitor.js";

const twilioClient = twilio(
  process.env["TWILIO_ACCOUNT_SID"]! as string,
  process.env["TWILIO_AUTH_TOKEN"]! as string
);

export class TwilioService implements SMSService {
  async sendSMS(to: string, message: string) {
    await twilioClient.messages.create({
      to,
      from: process.env["TWILIO_FROM_PHONE"]! as string,
      body: message,
    });
  }
}

export const twilioService = new TwilioService();
