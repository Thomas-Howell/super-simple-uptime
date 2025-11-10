import {
  Get,
  Patch,
  Route,
  SuccessResponse,
  Post,
  Body,
  Tags,
  Path,
  Delete,
} from "@tsoa/runtime";

import { monitorService } from "@src/services/monitor.js";
import type { MonitorDto } from "./dtos/monitor.js";

@Tags("Monitors")
@Route("monitors")
export class MonitorController {
  @Get("/:domain")
  public async getAllMonitors(
    @Path("domain") domain: string
  ): Promise<MonitorDto | undefined> {
    return monitorService.retrieve(domain);
  }

  @Post("/")
  public async createMonitor(@Body() monitor: MonitorDto): Promise<MonitorDto> {
    return monitorService.create(monitor.domain);
  }

  @Post("/import")
  public async importMonitors(
    @Body() body: any
  ): Promise<{ imported: number; failed: { domain: string; reason: any }[] }> {
    let domains: string[] = [];

    if (Array.isArray(body)) {
      // join array elements with newline then parse to handle commas/quotes inside elements
      domains = this.normalizeDomains(body.map(String).join("\n"));
    } else if (Array.isArray(body?.domains)) {
      domains = this.normalizeDomains(body.domains.map(String).join("\n"));
    } else if (typeof body?.domains === "string") {
      domains = this.normalizeDomains(body.domains);
    } else if (typeof body === "string") {
      domains = this.normalizeDomains(body);
    }

    if (!domains.length) throw new Error("no domains found");

    // Deduplicate and validate simple domain format
    domains = Array.from(new Set(domains.map((d) => d.trim()))).filter(Boolean);

    const results = await Promise.allSettled(
      domains.map((d) => monitorService.create(d))
    );

    const created = results.filter((r) => r.status === "fulfilled").length;
    const failed = results
      .map((r, i) => ({ r, domain: domains[i] }))
      .filter((x) => x.r.status === "rejected")
      .map((x) => ({
        domain: x.domain,
        reason: (x.r as PromiseRejectedResult).reason,
      }));

    return { imported: created, failed };
  }

  @Post("/import/file")
  public async importMonitorsFromFile(
    @Body() file: Express.Multer.File
  ): Promise<{ imported: number; failed: { domain: string; reason: any }[] }> {
    if (!file) throw new Error("file required");

    const text = file.buffer.toString("utf8");
    let domains = this.normalizeDomains(text);

    if (!domains.length) throw new Error("no domains found in file");

    domains = Array.from(new Set(domains.map((d) => d.trim()))).filter(Boolean);

    const results = await Promise.allSettled(
      domains.map((d) => monitorService.create(d))
    );

    const created = results.filter((r) => r.status === "fulfilled").length;
    const failed = results
      .map((r, i) => ({ r, domain: domains[i] }))
      .filter((x) => x.r.status === "rejected")
      .map((x) => ({
        domain: x.domain,
        reason: (x.r as PromiseRejectedResult).reason,
      }));

    return { imported: created, failed };
  }

  @Patch("/:domain")
  public async updateMonitor(
    @Path("domain") domain: string,
    @Body() body: { domain: string }
  ): Promise<MonitorDto | undefined> {
    const { domain: newDomain } = body;
    return monitorService.update(domain, newDomain);
  }

  @SuccessResponse("204", "No Content")
  @Delete("/:domain")
  public async deleteMonitor(@Path("domain") domain: string): Promise<void> {
    await monitorService.delete(domain);
  }

  // helper to normalize domain input: convert commas to newlines, strip quotes, split and trim
  private normalizeDomains = (s: string) =>
    s
      .replace(/,/g, "\n")
      .replace(/['"]/g, "")
      .split(/\r?\n/)
      .map((d) => d.trim())
      .filter(Boolean);
}

export const monitorController = new MonitorController();
