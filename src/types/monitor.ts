import { databaseSchema } from "@src/database.js";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const monitorSchema = createSelectSchema(databaseSchema.monitors);
export type Monitor = z.infer<typeof monitorSchema>;

export type MonitorResult = {
  domain: string;
  isUp: boolean;
};
