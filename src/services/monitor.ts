import { eq } from "drizzle-orm";

import { database, databaseSchema } from "@src/database.js";
import { uptimeService } from "@src/services/uptime.js";

export interface MonitorResult {
  domain: string;
  isUp: boolean;
}

export class MonitorService {
  async checkAll() {
    const monitors = await database.select().from(databaseSchema.monitors);
    const results: MonitorResult[] = await Promise.all(
      monitors.map((monitor) => this.checkOnline(monitor.domain))
    );
    return results;
  }

  async checkOnline(domain: string): Promise<MonitorResult> {
    try {
      const response = await fetch(`https://${domain}`);
      await uptimeService.logUptime(domain, response.ok);
      return { domain, isUp: response.ok };
    } catch {
      await uptimeService.logUptime(domain, false);
      return { domain, isUp: false };
    }
  }

  async create(domain: string) {
    await database.insert(databaseSchema.monitors).values({
      domain,
    });
  }

  async retrieve(domain: string) {
    return await database
      .select()
      .from(databaseSchema.monitors)
      .where(eq(databaseSchema.monitors.domain, domain));
  }

  async update(domain: string, newDomain: string) {
    await database
      .update(databaseSchema.monitors)
      .set({ domain: newDomain })
      .where(eq(databaseSchema.monitors.domain, domain));
  }

  async delete(domain: string) {
    await database
      .delete(databaseSchema.monitors)
      .where(eq(databaseSchema.monitors.domain, domain));
  }
}

export const monitorService = new MonitorService();
