import { Database } from "@db/types/database";
import { INewCategoryBody } from "@entrypoint/v1/category/models";
import { Prisma } from "@prisma/client";

export class CategoryDatabase {
  instance?: Database;

  constructor(instance: Database) {
    this.instance = instance;
    instance.setCollection("category");
  }

  async run<T>(callback: () => Promise<T>): Promise<T> {
    return await this.instance!.run(callback);
  }

  async create(data: INewCategoryBody) {
    const callback = async () => {
      return this.instance!.create<
        Prisma.CategoryCreateArgs["data"],
        Prisma.CategorySelect
      >(data);
    };

    return await this.run(callback);
  }

  async getById(id: string) {
    const callback = async () => {
      return this.instance!.findById<
        Prisma.CategoryFindUniqueArgs,
        Prisma.CategorySelect
      >(id);
    };

    return await this.run(callback);
  }

  async update(id: string, data: Partial<INewCategoryBody>) {
    const callback = async () => {
      return this.instance!.update<
        Prisma.CategoryUpdateArgs["data"],
        Prisma.CategorySelect
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
