import Elysia from "elysia";
import { GetByIdParams, NewTransactionBody } from "./models";
import { db } from "@db";

export const transactionRoute = new Elysia({ prefix: "/transaction" })
  .group("/v1/transaction", (app) => app)
  .use(db)
  .model({
    newTransaction: NewTransactionBody,
    getById: GetByIdParams,
  });

transactionRoute.post(
  "/",
  async ({ body, database, set }) => {
    const instance = database.getTransaction();
    const result = await instance.create(body);

    set.status = 200;
    return result;
  },
  { body: "newTransaction" },
);

transactionRoute.get(
  "/:id",
  async ({ params, database, set }) => {
    const instances = database.getTransaction();
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

transactionRoute.put(
  "/:id",
  async ({ params, database, set, body }) => {
    const instances = database.getTransaction();
    const result = await instances.update(params.id, body);

    set.status = 200;
    return result;
  },
  { params: "getById", body: "newTransaction" },
);

transactionRoute.delete(
  "/:id",
  async ({ params, database, set }) => {
    const instances = database.getTransaction();
    const result = await instances.delete(params.id);

    set.status = 200;
    return result;
  },
  { params: "getById" },
);
