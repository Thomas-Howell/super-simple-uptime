import "dotenv/config";

import { Config } from "@src/config.js";
import { Server } from "@src/server.js";
import { monitorService } from "@src/services/monitor.js";

export const config = new Config();
export const server = new Server();
monitorService.startMonitoring();
