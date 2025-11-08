import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";

// Database connection \\

export const pool = new Pool({ connectionString: process.env["DATABASE_URL"] });
export const database = drizzle(pool);

// Database schema \\

export const monitors = pgTable("monitors", {
  domain: text("domain").primaryKey(),
});

export const checks = pgTable(
  "checks",
  {
    domain: text("domain").references(() => monitors.domain),
    checkedAt: timestamp("checked_at").defaultNow(),
    isUp: boolean("is_up").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.domain, table.checkedAt] }),
  })
);

// Class for schema access \\

export class DatabaseSchema {
  monitors = monitors;
  checks = checks;
}

export const databaseSchema = new DatabaseSchema();
