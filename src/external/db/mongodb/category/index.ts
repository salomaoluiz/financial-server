import {
  IFilterCategoryParams,
  INewCategoryBody,
} from "@entrypoint/v1/category/models";
import { PrismaDatabase } from "@db/mongodb/config/prisma-database.ts";

export class CategoryDatabase implements PrismaDatabase {
  instance?: PrismaDatabase;

  constructor(instance: PrismaDatabase) {
    this.instance = instance;
  }

  async run(callback: () => Promise<any>) {
    return this.instance?.run(callback);
  }
  async create(data: INewCategoryBody) {
    const callback = async () => {
      return this.instance?.db?.category.create({
        data: {
          type: data.type,
          description: data.description,
        },
      });
    };

    return await this.run(callback);
  }

  async findById(id: string) {
    const callback = async () => {
      return this.instance?.db?.category.findUnique({ where: { id } });
    };

    return await this.run(callback);
  }

  async find(filter: IFilterCategoryParams) {
    const callback = async () => {
      return this.instance?.db?.category.findMany({ where: { ...filter } });
    };

    return await this.run(callback);
  }

  async update(id: string, data: Partial<INewCategoryBody>) {
    const callback = async () => {
      return this.instance?.db?.category.update({ where: { id }, data });
    };

    return await this.run(callback);
  }

  async delete(id: string) {
    const callback = async () => {
      return this.instance?.db?.category.delete({ where: { id } });
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
