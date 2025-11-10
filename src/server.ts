import express from "express";
import { RegisterRoutes } from "@src/routes.js";

export class Server {
  constructor() {
    const server = express();
    server.use(express.json());

    RegisterRoutes(server);

    server.listen(Number(process.env["PORT"]) || 3003, () =>
      console.log(`Server started on port ${process.env["PORT"] || 3003}`)
    );
  }
}
