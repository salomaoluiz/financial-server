import { Database } from "@db/types/database";
import { PrismaClient } from "@prisma/client";
import {
  CreateArgs,
  DeleteArgs,
  FindUniqueArgs,
  PrismaModel,
  Repository,
  UpdateArgs,
} from "@db/sqlite/config/types";

export class PrismaDatabase extends Database {
  static instance?: PrismaDatabase;
  db?: PrismaClient;
  declare collection?: PrismaModel;

  constructor(database: PrismaClient) {
    super();
    this.db = database;
  }
  static getInstance(database: PrismaClient) {
    if (!Database.instance && database) {
      Database.instance = new PrismaDatabase(database);
    }

    return Database.instance!;
  }

  async connect(): Promise<void> {
    this.db?.$connect();
  }

  async disconnect(): Promise<void> {
    this.db?.$disconnect();
  }

  async create<D extends CreateArgs<unknown>, R>(data: D): Promise<R> {
    const delegate = this.db![this.collection!] as unknown as Repository<D, R>;

    return delegate.create({ data });
  }

  async findById<D extends FindUniqueArgs<{ where: { id: number } }>, R>(
    id: string,
  ): Promise<R> {
    const delegate = this.db![this.collection!] as unknown as Repository<D, R>;

    return delegate.findUnique({ where: { id: parseInt(id) } });
  }

  async update<D extends UpdateArgs<{ where: { id: number } }, unknown>, R>(
    id: string,
    data: D,
  ): Promise<R> {
    const delegate = this.db![this.collection!] as unknown as Repository<D, R>;

    return delegate.update({ where: { id: parseInt(id) }, data });
  }

  async delete<D extends DeleteArgs<{ where: { id: number } }>, R>(
    id: string,
  ): Promise<R> {
    const delegate = this.db![this.collection!] as unknown as Repository<D, R>;

    return delegate.delete({ where: { id: parseInt(id) } });
  }

  async run<R>(callback: () => Promise<R>): Promise<R> {
    return super.run(callback);
  }
}
