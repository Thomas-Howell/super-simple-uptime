import express from "express";
import type { Request, Response } from "express";
import { monitorService } from "./services/monitorService";
import { monitorController } from "./controllers/monitorController";
import { uptimeController } from "./controllers/uptimeController";

export const server = express();

// parse JSON bodies for create/update endpoints
server.use(express.json());

// Single-check endpoint
server.get("/check/:domain", async (req: Request, res: Response) => {
  const { domain } = req.params;
  const result = await monitorService.checkOnline(domain);
  res.json(result);
});

server.get("/", async (req: Request, res: Response) => {
  res.send(await monitorService.checkAll());
});

server.use("/monitors", monitorController);
server.use("/uptime", uptimeController);

server.listen(3003, () => console.log("Server started on port 3003"));

monitorService.checkAll().catch((error) => {
  console.error("Error during initial checkAll:", error);
});
setInterval(
  () => {
    monitorService.checkAll().catch((error) => {
      console.error("Error during periodic checkAll:", error);
    });
  },
  15 * 60 * 1000
); // 15 minutes
