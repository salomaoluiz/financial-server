import Elysia from "elysia";
import {
  EditTagBody,
  FilterTagParams,
  GetByIdParams,
  NewTagBody,
} from "./models";
import { db } from "@db";

export const tagRoute = new Elysia({ prefix: "/tag" })
  .group("/v1/tag", (app) => app)
  .use(db)
  .model({
    newTag: NewTagBody,
    editTag: EditTagBody,
    filterTag: FilterTagParams,
    getTagById: GetByIdParams,
  });

tagRoute.post(
  "/",
  async ({ body, database, set }) => {
    const instance = database.getTag();
    const result = await instance.create(body);

    set.status = 200;
    return result;
  },
  { body: "newTag" },
);

tagRoute.get(
  "/",
  async ({ query, database, set }) => {
    const instances = database.getTag();
    const result = await instances.find(query);

    if (!result) {
      set.status = 404;
      throw new Error("NOT FOUND");
    }
    set.status = 200;
    return result;
  },
  {
    query: "filterTag",
  },
);

tagRoute.get(
  "/:id",
  async ({ params, database, set }) => {
    const instances = database.getTag();
    const result = await instances.findById(params.id);

    if (!result) {
      set.status = 404;
      throw new Error("NOT FOUND");
    }
    set.status = 200;
    return result;
  },
  { params: "getTagById" },
);

tagRoute.put(
  "/:id",
  async ({ params, database, set, body }) => {
    const instances = database.getTag();
    const result = await instances.update(params.id, body);

    set.status = 200;
    return result;
  },
  { params: "getTagById", body: "editTag" },
);

tagRoute.delete(
  "/:id",
  async ({ params, database, set }) => {
    const instances = database.getTag();
    const result = await instances.delete(params.id);

    set.status = 200;
    return result;
  },
  { params: "getTagById" },
);
