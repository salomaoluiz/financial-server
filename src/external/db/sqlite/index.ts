import { PrismaClient } from "@prisma/client";
import { TransactionDatabase } from "@db/sqlite/transaction";
import { PrismaDatabase } from "@db/sqlite/config/prisma-database";
import { CategoryDatabase } from "@db/sqlite/category";

export const getDatabase = () => {
  const database = new PrismaClient({
    datasources: { db: { url: Bun.env?.DATABASE_URL } },
  });

  const instance = PrismaDatabase.getInstance(database);

  const getTransaction = () => new TransactionDatabase(instance);
  const getCategory = () => new CategoryDatabase(instance);

  return {
    getTransaction,
    getCategory,
  };
};
