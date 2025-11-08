import { database, databaseSchema } from "../database";
import { eq, asc } from "drizzle-orm";

export class UptimeService {
  async logUptime(domain: string, isUp: boolean) {
    await database.insert(databaseSchema.checks).values({
      domain,
      checkedAt: new Date(),
      isUp,
    });
  }

  async retrieve(domain: string) {
    return await database
      .select()
      .from(databaseSchema.checks)
      .where(eq(databaseSchema.checks.domain, domain));
  }

  async retrieveUptime(domain: string) {
    const checks = await database
      .select()
      .from(databaseSchema.checks)
      .where(eq(databaseSchema.checks.domain, domain))
      .orderBy(asc(databaseSchema.checks.checkedAt));

    if (!checks.length) {
      return {
        domain,
        uptimePercentage: null,
        uptimeDurationMs: 0,
        downtimeDurationMs: 0,
        totalDurationMs: 0,
        checksCount: 0,
        rangeStart: null,
        rangeEnd: null,
      } as const;
    }

    const toDate = (value: Date | string) =>
      value instanceof Date ? value : new Date(value);
    const now = new Date();
    let uptimeDurationMs = 0;
    let downtimeDurationMs = 0;

    for (let i = 0; i < checks.length; i++) {
      const current = checks[i];
      const currentTime = toDate(current.checkedAt as Date | string);
      const nextTime =
        i < checks.length - 1
          ? toDate(checks[i + 1].checkedAt as Date | string)
          : now;
      const delta = nextTime.getTime() - currentTime.getTime();

      if (delta <= 0) continue;

      if (current.isUp) uptimeDurationMs += delta;
      else downtimeDurationMs += delta;
    }

    const totalDurationMs = uptimeDurationMs + downtimeDurationMs;
    const uptimePercentage =
      totalDurationMs > 0
        ? Number(((uptimeDurationMs / totalDurationMs) * 100).toFixed(2))
        : null;

    return {
      domain,
      uptimePercentage,
      uptimeDurationMs,
      downtimeDurationMs,
      totalDurationMs,
      checksCount: checks.length,
      rangeStart: toDate(checks[0].checkedAt as Date | string),
      rangeEnd: now,
    } as const;
  }

  async delete(domain: string) {
    await database
      .delete(databaseSchema.checks)
      .where(eq(databaseSchema.checks.domain, domain));
  }
}

export const uptimeService = new UptimeService();
