import { Router, type Request, type Response } from "express";

import { uptimeService } from "@src/services/uptime.js";

export const uptimeController = Router();

// Uptime endpoints
uptimeController.get("/:domain/raw", async (req: Request, res: Response) => {
  const { domain } = req.params;
  const rows = await uptimeService.retrieve(domain);
  res.json(rows);
});

uptimeController.get("/:domain", async (req: Request, res: Response) => {
  const { domain } = req.params;
  const result = await uptimeService.retrieveUptime(domain);
  res.json(result);
});

uptimeController.delete("/:domain", async (req: Request, res: Response) => {
  const { domain } = req.params;
  await uptimeService.delete(domain);
  res.status(204).send();
});
