import { Router } from "express";
import type { Request, Response } from "express";
import { monitorService } from "../services/monitorService";
import multer from "multer";
import express from "express";

export const monitorController = Router();

// helper to normalize domain input: convert commas to newlines, strip quotes, split and trim
const normalizeDomains = (s: string) =>
  s
    .replace(/,/g, "\n")
    .replace(/['"]/g, "")
    .split(/\r?\n/)
    .map((d) => d.trim())
    .filter(Boolean);

// multer for file uploads (keep files in memory)
const upload = multer({ storage: multer.memoryStorage() });

// Monitor endpoints
monitorController.get("/", async (req: Request, res: Response) => {
  res.json(await monitorService.checkAll());
});

monitorController.get("/:domain", async (req: Request, res: Response) => {
  const { domain } = req.params;
  const result = await monitorService.retrieve(domain);
  res.json(result);
});

monitorController.post("/", async (req: Request, res: Response) => {
  const { domain } = req.body as { domain?: string };
  if (!domain) return res.status(400).json({ error: "domain required" });
  await monitorService.create(domain);
  res.status(201).json({ domain });
});

// Import monitors from a .txt file (newline-separated domains), CSV, or JSON array
// Accepts:
// - text/plain body containing newline-separated domains or comma-separated domains (a .txt upload)
// - application/json with either an array (['a.com','b.com']) or { domains: 'a.com,b.com' } or { domains: ['a.com','b.com'] }
monitorController.post(
  "/import",
  // parse text/plain body for raw .txt uploads
  express.text({ type: "text/plain" }),
  async (req: Request, res: Response) => {
    try {
      let domains: string[] = [];

      if (req.is("text/plain") && typeof req.body === "string") {
        domains = normalizeDomains(req.body);
      } else if (req.is("application/json")) {
        const body = req.body as any;
        if (Array.isArray(body)) {
          // join array elements with newline then parse to handle commas/quotes inside elements
          domains = normalizeDomains(body.map(String).join("\n"));
        } else if (Array.isArray(body?.domains)) {
          domains = normalizeDomains(body.domains.map(String).join("\n"));
        } else if (typeof body?.domains === "string") {
          domains = normalizeDomains(body.domains);
        } else if (typeof body === "string") {
          domains = normalizeDomains(body);
        }
      } else if (typeof req.body === "string") {
        // fallback
        domains = normalizeDomains(req.body);
      }

      if (!domains.length)
        return res.status(400).json({ error: "no domains found" });

      // Deduplicate and validate simple domain format
      domains = Array.from(new Set(domains.map((d) => d.trim()))).filter(
        Boolean
      );

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

      res.status(201).json({ imported: created, failed });
    } catch (err) {
      console.error("Import error:", err);
      res.status(500).json({ error: "internal error" });
    }
  }
);

// File upload endpoint: accepts multipart/form-data with a `file` field (a .txt file)
monitorController.post(
  "/import/file",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      // @ts-ignore - multer adds file to Request
      const file = (req as any).file;
      if (!file) return res.status(400).json({ error: "file required" });

      const text = file.buffer.toString("utf8");
      let domains = normalizeDomains(text);

      if (!domains.length)
        return res.status(400).json({ error: "no domains found in file" });

      domains = Array.from(new Set(domains.map((d) => d.trim()))).filter(
        Boolean
      );

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

      res.status(201).json({ imported: created, failed });
    } catch (err) {
      console.error("File import error:", err);
      res.status(500).json({ error: "internal error" });
    }
  }
);

monitorController.put("/:domain", async (req: Request, res: Response) => {
  const { domain } = req.params;
  const { domain: newDomain } = req.body as { domain?: string };
  if (!newDomain) return res.status(400).json({ error: "new domain required" });
  await monitorService.update(domain, newDomain);
  res.json({ domain: newDomain });
});

monitorController.delete("/:domain", async (req: Request, res: Response) => {
  const { domain } = req.params;
  await monitorService.delete(domain);
  res.status(204).send();
});
