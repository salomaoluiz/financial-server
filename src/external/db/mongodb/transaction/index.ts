import {
  IFilterTransactionParams,
  INewSubTransactionBody,
  INewTransactionBody,
} from "@entrypoint/v1/transaction/models";

import { PrismaDatabase } from "@db/mongodb/config/prisma-database.ts";
import { handleFindFilter } from "@db/mongodb/transaction/filter.ts";
import { subTransaction } from "@entrypoint/v1/transaction/sub-transaction.ts";

export class TransactionDatabase implements PrismaDatabase {
  instance?: PrismaDatabase;

  constructor(instance: PrismaDatabase) {
    this.instance = instance;
  }

  async run(callback: () => Promise<any>) {
    return this.instance?.run(callback);
  }

  async create(data: INewTransactionBody | INewSubTransactionBody) {
    const callback = async () => {
      const hasSubTransaction = "subTransaction" in data;
      return this.instance?.db?.transaction.create({
        data: {
          ...(hasSubTransaction && {
            subTransaction: data.subTransaction.map((subTransaction) => ({
              id: subTransaction.id!,
              description: subTransaction.description,
              value: subTransaction.value,
              categoryId: subTransaction.categoryId,
              tags: data.tags,
            })),
          }),
          ...(data.tags && {
            tags: data.tags,
          }),
          description: data.description,
          date: data.date,
          value: data.value,
          categoryId: data.categoryId,
          partnerName: data.partnerName,
        },
      });
    };

    return await this.run(callback);
  }

  async findById(id: string) {
    const callback = async () => {
      return this.instance?.db?.transaction.findUnique({
        where: { id },
      });
    };

    return await this.run(callback);
  }

  async find(filter: Partial<IFilterTransactionParams>) {
    const callback = async () => {
      return this.instance?.db?.transaction.findMany({
        where: { ...handleFindFilter(filter) },
      });
    };

    return await this.run(callback);
  }

  async update(id: string, data: INewTransactionBody | INewSubTransactionBody) {
    const callback = async () => {
      const hasSubTransaction = "subTransaction" in data;

      return this.instance?.db?.transaction.update({
        where: { id },
        data: {
          ...(hasSubTransaction && {
            subTransaction: data.subTransaction.map((subTransaction) => ({
              id: subTransaction.id!,
              description: subTransaction.description,
              value: subTransaction.value,
              categoryId: subTransaction.categoryId,
            })),
          }),
          description: data.description,
          value: data.value,
          categoryId: data.categoryId,
          date: data.date,
          partnerName: data.partnerName,
        },
      });
    };

    return await this.run(callback);
  }

  async delete(id: string) {
    const callback = async () => {
      return this.instance?.db?.transaction.delete({ where: { id } });
    };

    return await this.run(callback);
  }

  async connect() {
    throw new Error("Should uses by PrismaDatabase class");
  }

  async disconnect() {
    throw new Error("Should uses by PrismaDatabase class");
  }
}
