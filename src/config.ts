export class Config {
  smsEnabled: boolean;
  emailEnabled: boolean;

  constructor() {
    if (process.env["SMS_ENABLED"] === "true") {
      if (
        !process.env["TWILIO_ACCOUNT_SID"] ||
        !process.env["TWILIO_AUTH_TOKEN"] ||
        !process.env["TWILIO_FROM_PHONE"]
      )
        throw new Error(
          "SMS is enabled but Twilio environment variables are not set."
        );
      this.smsEnabled = true;
    } else this.smsEnabled = false;

    if (process.env["EMAIL_ENABLED"] === "true") {
      if (
        !process.env["SENDGRID_API_KEY"] ||
        !process.env["SENDGRID_FROM_EMAIL"]
      )
        throw new Error(
          "Email is enabled but SendGrid environment variables are not set."
        );
      this.emailEnabled = true;
    } else this.emailEnabled = false;
  }
}

export const config = new Config();
