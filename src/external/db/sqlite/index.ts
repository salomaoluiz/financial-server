import { PrismaClient } from "@prisma/client";
import { TransactionDatabase } from "@db/sqlite/transaction";
import { PrismaDatabase } from "@db/sqlite/config/prisma-database";

export const getDatabase = () => {
  const database = new PrismaClient({
    datasources: { db: { url: Bun.env?.SQLITE_PATH } },
  });

  const instance = PrismaDatabase.getInstance(database);

  const getTransaction = () => new TransactionDatabase(instance);

  return {
    getTransaction,
  };
};
