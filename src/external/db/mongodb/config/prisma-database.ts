import { PrismaClient } from "@prisma/client";

export class PrismaDatabase {
  static instance?: PrismaDatabase;
  db?: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db
  }

  static getInstance(database: PrismaClient) {
    if (!this.instance && database) {
      this.instance = new PrismaDatabase(database);
    }

    return this.instance!;
  }

  async connect(): Promise<void> {
    this.db?.$connect();
  }

  async disconnect(): Promise<void> {
    this.db?.$disconnect();
  }

  async create(data: any): Promise<any> {
    throw new Error("Should implements in children class");
  }

  async findById(id: string): Promise<any> {
    throw new Error("Should implements in children class");
  }

  async find(filter: any): Promise<any> {
    throw new Error("Should implements in children class");
  }
  async update(id: string, data: any): Promise<any> {
    throw new Error("Should implements in children class");
  }
  async delete(id: string): Promise<any> {
    throw new Error("Should implements in children class");
  }

  async run<R>(callback: () => Promise<R>): Promise<R> {
    if (this.db) {
      await this.connect();
      const result = await callback();
      await this.disconnect();

      return result;
    }

    throw new Error("DB is not initialized");
  }
}
