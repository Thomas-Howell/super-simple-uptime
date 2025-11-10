import { Get, Route, SuccessResponse, Tags, Path, Delete } from "@tsoa/runtime";

import { uptimeService } from "@src/services/uptime.js";

@Tags("Uptime")
@Route("uptime")
export class UptimeControler {
  @Get("/:domain/raw")
  public async getRawUptime(@Path("domain") domain: string): Promise<any[]> {
    return uptimeService.retrieve(domain);
  }

  @Get("/:domain")
  public async getUptime(@Path("domain") domain: string) {
    return uptimeService.retrieveUptime(domain);
  }

  @Delete("/:domain")
  @SuccessResponse("204", "No Content")
  public async deleteUptime(@Path("domain") domain: string): Promise<void> {
    await uptimeService.delete(domain);
  }
}
