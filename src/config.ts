export class Config {
  smsEnabled: boolean;
  emailEnabled: boolean;
  databaseUrl: string;

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

    if (!process.env["DATABASE_URL"]) {
      if (
        !process.env["DATABASE_HOST"] ||
        !process.env["DATABASE_PORT"] ||
        !process.env["DATABASE_USER"] ||
        !process.env["DATABASE_PASSWORD"] ||
        !process.env["DATABASE_NAME"]
      ) {
        throw new Error(
          "Database URL is not set, and individual database connection environment variables are missing."
        );
      }
      const host = process.env["DATABASE_HOST"];
      const port = process.env["DATABASE_PORT"];
      const user = process.env["DATABASE_USER"];
      const password = process.env["DATABASE_PASSWORD"];
      const dbName = process.env["DATABASE_NAME"];
      this.databaseUrl = `postgres://${user}:${password}@${host}:${port}/${dbName}`;
    } else {
      this.databaseUrl = process.env["DATABASE_URL"]!;
    }
  }
}

export function createConfig() {
  return new Config();
}
