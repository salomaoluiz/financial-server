import Elysia from "elysia";
import {
  FilterTransactionParams,
  GetByIdParams,
  NewTransactionBody,
} from "@entrypoint/v1/transaction/models";
import { db } from "@db";

export const singleTransaction = new Elysia({ prefix: "/transaction" })
  .group("/v1/transaction", (app) => app)
  .use(db)
  .model({
    newTransaction: NewTransactionBody,
    filterTransactionParams: FilterTransactionParams,
    getById: GetByIdParams,
  });

singleTransaction.post(
  "/",
  async ({ body, database, set }) => {
    const instance = database.getTransaction();
    const result = await instance.create(body);

    set.status = 200;
    return result;
  },
  { body: "newTransaction" },
);

singleTransaction.get(
  "/",
  async ({ query, database, set }) => {
    const instances = database.getTransaction();
    const result = await instances.find(query);

    if (!result) {
      set.status = 404;
      throw new Error("NOT FOUND");
    }
    set.status = 200;
    return result;
  },
  {
    query: "filterTransactionParams",
  },
);

singleTransaction.get(
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

singleTransaction.put(
  "/:id",
  async ({ params, database, set, body }) => {
    const instances = database.getTransaction();
    const result = await instances.update(params.id, body);

    set.status = 200;
    return result;
  },
  { params: "getById", body: "newTransaction" },
);

singleTransaction.delete(
  "/:id",
  async ({ params, database, set }) => {
    const instances = database.getTransaction();
    const result = await instances.delete(params.id);

    set.status = 200;
    return result;
  },
  { params: "getById" },
);
