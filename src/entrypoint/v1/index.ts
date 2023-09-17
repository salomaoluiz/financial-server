import Elysia from "elysia";
import { transactionRoute } from "./transaction";
import { categoryRoute } from "./category";

export const v1Routes = new Elysia({ prefix: "/v1" })
  .group("/v1", (app) => app)
  .get("/", () => "Using v1")
  .use(transactionRoute)
  .use(categoryRoute);
