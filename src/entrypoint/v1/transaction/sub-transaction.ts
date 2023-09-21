import Elysia from "elysia";
import { db } from "@db";
import {
  EditSubTransactionBody,
  GetByIdParams,
  INewSubTransactionBody,
  NewSubTransactionBody,
} from "@entrypoint/v1/transaction/models";
import { ObjectId } from "bson";

const parseSubTransaction = (body: INewSubTransactionBody) => {
  return {
    ...body,
    value: body.subTransaction.reduce((curr, prev) => curr + prev.value, 0),
    subTransaction: body.subTransaction.map((subTransaction) => ({
      id: subTransaction.id || new ObjectId().toString(),
      ...subTransaction,
    })),
  };
};

export const subTransaction = new Elysia({ prefix: "/sub-transaction" })
  .group("/v1/sub-transaction", (app) => app)
  .use(db)
  .model({
    subTransactionById: GetByIdParams,
    editSubTransaction: EditSubTransactionBody,
    newSubTransaction: NewSubTransactionBody,
  });

subTransaction.post(
  "/",
  async ({ body, database, set }) => {
    const instance = database.getTransaction();

    const result = await instance.create(
      parseSubTransaction(body as INewSubTransactionBody),
    );

    set.status = 200;
    return result;
  },
  { body: "newSubTransaction" },
);

subTransaction.put(
  "/:transactionId",
  async ({ params, database, set, body }) => {
    const instances = database.getTransaction();
    console.log(params, body);
    const result = await instances.update(
      params.transactionId,
      parseSubTransaction(body as INewSubTransactionBody),
    );

    set.status = 200;
    return result;
  },
  { params: "subTransactionById", body: "editSubTransaction" },
);
