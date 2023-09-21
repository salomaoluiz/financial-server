import Elysia from "elysia";
import { singleTransaction } from "@entrypoint/v1/transaction/transaction";
import { subTransaction } from "@entrypoint/v1/transaction/sub-transaction";

export const transactionRoute = new Elysia()
  .use(singleTransaction)
  .use(subTransaction);

