import Elysia from "elysia";
import { db } from "@db";
import {
  FilterTransactionParams,
  GetByIdParams,
  INewSubTransactionBody,
  NewSubTransactionBody,
  NewTransactionBody,
} from "@entrypoint/v1/transaction/models";
import { ObjectId } from "bson";
import { singleTransaction } from "@entrypoint/v1/transaction/transaction.ts";

const parseSubTransaction = (body: INewSubTransactionBody) => {
  return {
    ...body,
    value: body.subTransaction.reduce((curr, prev) => (curr += prev.value), 0),
    subTransaction: body.subTransaction.map((subTransaction) => ({
      id: new ObjectId().toString(),
      ...subTransaction,
    })),
  };
};

export const subTransaction = new Elysia({ prefix: "/sub-transaction" })
  .group("/v1/sub-transaction", (app) => app)
  .use(db)
  .model({
    newSubTransaction: NewSubTransactionBody,
  });

subTransaction.post(
  "/",
  async ({ body, database, set }) => {
    const instance = database.getTransaction();

    const result = await instance.create(parseSubTransaction(body));

    set.status = 200;
    return result;
  },
  { body: "newSubTransaction" },
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
