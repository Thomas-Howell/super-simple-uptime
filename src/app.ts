import "dotenv/config";

import { Server } from "@src/server.js";
import { monitorService } from "@src/services/monitor.js";

export const server = new Server();
monitorService.startMonitoring();
