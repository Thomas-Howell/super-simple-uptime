import { alertsService } from "@src/services/alerts.js";
import {
  Get,
  Patch,
  Res,
  Route,
  SuccessResponse,
  type TsoaResponse,
  Post,
  Body,
  Tags,
  Path,
  Delete,
} from "@tsoa/runtime";
import type { AlertDto } from "./dtos/alerts.js";

@Tags("Alerts")
@Route("alerts")
export class AlertsController {
  @SuccessResponse("201", "Created")
  @Post("/")
  public async create(
    @Body()
    body: { domain: string; type: "EMAIL" | "SMS" | "WEBHOOK"; target: string },
    @Res() res: TsoaResponse<201, void>
  ): Promise<void> {
    const { domain, type, target } = body;
    await alertsService.create(domain, type, target);
    res(201);
  }

  @Get("/:domain")
  public async getByDomain(
    @Path("domain") domain: string
  ): Promise<AlertDto[] | null> {
    const alerts = await alertsService.retrieveManyByDomain(domain);
    return alerts || null;
  }

  @Get("/id/:id")
  public async getById(@Path("id") id: string): Promise<AlertDto | null> {
    const alert = await alertsService.retrieve({ id: id });
    if (alert == undefined) return null;
    return alert[0];
  }

  @Patch("/:id")
  public async update(
    @Path("id") id: string,
    @Body()
    body: {
      type?: "EMAIL" | "SMS" | "WEBHOOK";
      domain?: string;
      target: string;
    }
  ): Promise<void> {
    const { type, domain, target } = body;
    await alertsService.update({ id: id }, { type, domain }, target);
  }

  @SuccessResponse("204", "No Content")
  @Delete("/:id")
  public async delete(
    @Path("id") id: string,
    @Res() res: TsoaResponse<204, void>
  ): Promise<void> {
    await alertsService.delete(id);
    res(204);
  }
}

export const alertsController = new AlertsController();
