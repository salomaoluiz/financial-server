import Elysia from "elysia";
import {
  EditTransactionBody,
  FilterTransactionParams,
  GetByIdParams,
  INewTransactionBody,
  NewTransactionBody,
} from "@entrypoint/v1/transaction/models";
import { db } from "@db";

export const singleTransaction = new Elysia({ prefix: "/transaction" })
  .group("/v1/transaction", (app) => app)
  .use(db)
  .model({
    newTransaction: NewTransactionBody,
    editTransaction: EditTransactionBody,
    filterTransactionParams: FilterTransactionParams,
    transactionById: GetByIdParams,
  });

singleTransaction.post(
  "/",
  async ({ body, database, set }) => {
    const instance = database.getTransaction();
    const result = await instance.create(body as INewTransactionBody);

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
  "/:transactionId",
  async ({ params, database, set }) => {
    const instances = database.getTransaction();
    const result = await instances.findById(params.transactionId);

    if (!result) {
      set.status = 404;
      throw new Error("NOT FOUND");
    }
    set.status = 200;
    return result;
  },
  { params: "transactionById" },
);

singleTransaction.put(
  "/:transactionId",
  async ({ params, database, set, body }) => {
    const instances = database.getTransaction();
    const result = await instances.update(
      params.transactionId,
      body as INewTransactionBody,
    );

    set.status = 200;
    return result;
  },
  { params: "transactionById", body: "editTransaction" },
);

singleTransaction.delete(
  "/:transactionId",
  async ({ params, database, set }) => {
    const instances = database.getTransaction();
    const result = await instances.delete(params.transactionId);

    set.status = 200;
    return result;
  },
  { params: "transactionById" },
);
