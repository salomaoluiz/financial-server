import Elysia from "elysia";
import { EditCategoryBody, GetByIdParams, NewCategoryBody } from "./models";
import { db } from "@db";

export const categoryRoute = new Elysia({ prefix: "/category" })
  .group("/v1/category", (app) => app)
  .use(db)
  .model({
    newCategory: NewCategoryBody,
    editCategory: EditCategoryBody,
    getById: GetByIdParams,
  });

categoryRoute.post(
  "/",
  async ({ body, database, set }) => {
    const instance = database.getCategory();
    const result = await instance.create(body);

    set.status = 200;
    return result;
  },
  { body: "newCategory" },
);

categoryRoute.get(
  "/:id",
  async ({ params, database, set }) => {
    const instances = database.getCategory();
    const result = await instances.getById(params.id);

    if (!result) {
      set.status = 404;
      throw new Error("NOT FOUND");
    }
    set.status = 200;
    return result;
  },
  { params: "getById" },
);

categoryRoute.put(
  "/:id",
  async ({ params, database, set, body }) => {
    const instances = database.getCategory();
    const result = await instances.update(params.id, body);

    set.status = 200;
    return result;
  },
  { params: "getById", body: "editCategory" },
);

categoryRoute.delete(
  "/:id",
  async ({ params, database, set }) => {
    const instances = database.getCategory();
    const result = await instances.delete(params.id);

    set.status = 200;
    return result;
  },
  { params: "getById" },
);
