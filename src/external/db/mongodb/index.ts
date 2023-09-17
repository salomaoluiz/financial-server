import { PrismaClient } from "@prisma/client";
import { TransactionDatabase } from "@db/mongodb/transaction";
import { PrismaDatabase } from "@db/mongodb/config/prisma-database";
import { CategoryDatabase } from "@db/mongodb/category";

export const getDatabase = () => {
  const database = new PrismaClient();

  const instance = PrismaDatabase.getInstance(database);

  const getTransaction = () => new TransactionDatabase(instance);
  const getCategory = () => new CategoryDatabase(instance);

  return {
    getTransaction,
    getCategory,
  };
};
