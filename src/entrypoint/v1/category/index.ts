import Elysia from "elysia";
import {
  EditCategoryBody,
  FilterCategoryParams,
  GetByIdParams,
  IFilterCategoryParams,
  INewCategoryBody,
  NewCategoryBody,
} from "./models";
import { db } from "@db";

export const categoryRoute = new Elysia({ prefix: "/category" })
  .group("/v1/category", (app) => app)
  .use(db)
  .model({
    newCategory: NewCategoryBody,
    editCategory: EditCategoryBody,
    filterCategory: FilterCategoryParams,
    categoryById: GetByIdParams,
  });

categoryRoute.post(
  "/",
  async ({ body, database, set }) => {
    const instance = database.getCategory();
    const result = await instance.create(body as INewCategoryBody);

    set.status = 200;
    return result;
  },
  { body: "newCategory" },
);

categoryRoute.get(
  "/",
  async ({ query, database, set }) => {
    const instances = database.getCategory();
    const result = await instances.find(query as IFilterCategoryParams);

    if (!result) {
      set.status = 404;
      throw new Error("NOT FOUND");
    }
    set.status = 200;
    return result;
  },
  {
    query: "filterCategory",
  },
);

categoryRoute.get(
  "/:id",
  async ({ params, database, set }) => {
    const instances = database.getCategory();
    const result = await instances.findById(params.id);

    if (!result) {
      set.status = 404;
      throw new Error("NOT FOUND");
    }
    set.status = 200;
    return result;
  },
  { params: "categoryById" },
);

categoryRoute.put(
  "/:id",
  async ({ params, database, set, body }) => {
    const instances = database.getCategory();
    const result = await instances.update(params.id, body);

    set.status = 200;
    return result;
  },
  { params: "categoryById", body: "editCategory" },
);

categoryRoute.delete(
  "/:id",
  async ({ params, database, set }) => {
    const instances = database.getCategory();
    const result = await instances.delete(params.id);

    set.status = 200;
    return result;
  },
  { params: "categoryById" },
);
