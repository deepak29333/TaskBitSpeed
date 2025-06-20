import "reflect-metadata";
import {AppDataSource} from "./database/dataSource";

import {ContactController} from "./controller/ContactController";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";


(async () => {
  try {
    const connection = await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    const router = new Router();
    const app = new Koa();

    app.use(bodyParser());

    const contactController = new ContactController(connection);

    router.get("/health", function (ctx) {
      ctx.status = 200;
      ctx.body = "Server is healthy";
    });
    router.post("/identify", (ctx) => contactController.getContacts(ctx));

    app.use(router.routes()).use(router.allowedMethods());

    app.listen(4000, () => {
      console.log(`Server is running on http://localhost:${4000}`);
    });

  } catch (err) {
    console.error("Error during Data Source initialization:", err);
  }
})();