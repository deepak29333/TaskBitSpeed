export class BaseController {
  okResponse(ctx: any, data: any) {
    ctx.status = 200;
    ctx.body = data;
  }

  errorResponse(ctx: any, error: any, statusCode: number = 500) {
    ctx.status = statusCode;
    ctx.body = {
      error: error.message || "Internal Server Error",
    };
  }
}