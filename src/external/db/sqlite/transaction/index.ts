import { Database } from "@db/types/database";
import { INewTransactionBody } from "@entrypoint/v1/transaction/models";
import { Prisma } from "@prisma/client";

export class TransactionDatabase {
  instance?: Database;

  constructor(instance: Database) {
    this.instance = instance;
    instance.setCollection("transaction");
  }

  async run<T>(callback: () => Promise<T>): Promise<T> {
    return await this.instance!.run(callback);
  }

  async create(data: INewTransactionBody) {
    const callback = async () => {
      return this.instance!.create<
        Prisma.TransactionCreateArgs["data"],
        Prisma.TransactionSelect
      >(data);
    };

    return await this.run(callback);
  }

  async getById(id: string) {
    const callback = async () => {
      return this.instance!.findById<
        Prisma.TransactionFindUniqueArgs,
        Prisma.TransactionSelect
      >(id);
    };

    return await this.run(callback);
  }

  async update(id: string, data: INewTransactionBody) {
    const callback = async () => {
      return this.instance!.update<
        Prisma.TransactionUpdateArgs["data"],
        Prisma.TransactionSelect
      >(id, data);
    };

    return await this.run(callback);
  }

  async delete(id: string) {
    const callback = async () => {
      return this.instance!.delete(id);
    };

    return await this.run(callback);
  }
}
