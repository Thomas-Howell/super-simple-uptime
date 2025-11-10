import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

// Database connection \\

export const pool = new Pool({ connectionString: process.env["DATABASE_URL"] });
export const database = drizzle(pool);

// Database schema \\

export const alertType = pgEnum("alert_type", ["EMAIL", "SMS", "WEBHOOK"]);

export const monitors = pgTable("monitors", {
  domain: text("domain").primaryKey(),
});

export const checks = pgTable(
  "checks",
  {
    domain: text("domain").references(() => monitors.domain, {
      onDelete: "cascade",
    }),
    checkedAt: timestamp("checked_at").defaultNow(),
    isUp: boolean("is_up").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.domain, table.checkedAt] }),
  })
);

export const alerts = pgTable("alerts", {
  id: text("id").primaryKey(),
  domain: text("domain").references(() => monitors.domain, {
    onDelete: "cascade",
  }),
  type: alertType("type").notNull(),
});

export const emailAlerts = pgTable("email_alerts", {
  id: text("id").references(() => alerts.id, {
    onDelete: "cascade",
  }),
  email: text("email").notNull(),
});

export const smsAlerts = pgTable("sms_alerts", {
  id: text("id").references(() => alerts.id, {
    onDelete: "cascade",
  }),
  phoneNumber: text("phone_number").notNull(),
});

export const webhookAlerts = pgTable("webhook_alerts", {
  id: text("id").references(() => alerts.id, {
    onDelete: "cascade",
  }),
  url: text("url").notNull(),
});

// Class for schema access \\

export class DatabaseSchema {
  monitors = monitors;
  checks = checks;
  alerts = alerts;
  emailAlerts = emailAlerts;
  smsAlerts = smsAlerts;
  webhookAlerts = webhookAlerts;
}

export const databaseSchema = new DatabaseSchema();
