import "dotenv/config";
import express from "express";

import { monitorController } from "@src/controllers/monitor.js";
import { uptimeController } from "@src/controllers/uptime.js";

import { monitorService } from "@src/services/monitor.js";

export const server = express();
server.use(express.json());

server.use("/monitors", monitorController);
server.use("/uptime", uptimeController);

server.listen(Number(process.env["PORT"]) || 3003, () =>
  console.log(`Server started on port ${process.env["PORT"] || 3003}`)
);

monitorService.checkAll().catch((error) => {
  console.error("Error during initial checkAll:", error);
});
setInterval(
  () => {
    monitorService.checkAll().catch((error) => {
      console.error("Error during periodic checkAll:", error);
    });
  },
  Number(process.env["UPTIME_INTERVAL_MINUTES"]) * 60 * 1000
);
