import { z } from "zod";
import { InferEnum } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { databaseSchema } from "@src/database.js";

export const alertSchema = createSelectSchema(databaseSchema.alerts);
export type Alert = z.infer<typeof alertSchema>;

export const updateAlertSchema = alertSchema.partial();
export type UpdateAlert = WithUndefined<z.infer<typeof updateAlertSchema>>;

export type AlertType = InferEnum<typeof databaseSchema.alerts.type>;

export type HandleAlertResponse = {
  error: boolean;
  alertsExist: boolean;
  alertsTriggered: {
    alertType: AlertType;
    alertSent: {
      [key: string]: unknown;
    };
  }[];
};

export type SendAlertResponse = {
  id: string;
  target: string;
};

export type AlertQuery =
  | { id: string; domain?: never; type?: never }
  | { id?: never; domain: string; type: AlertType };

// Type helpers
export type WithUndefined<T> = { [K in keyof T]: T[K] | undefined };
