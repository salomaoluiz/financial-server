import { IFilterTagParams, INewTagBody } from "@entrypoint/v1/tag/models";
import { PrismaDatabase } from "@db/mongodb/config/prisma-database.ts";

export class TagDatabase implements PrismaDatabase {
  instance?: PrismaDatabase;

  constructor(instance: PrismaDatabase) {
    this.instance = instance;
  }

  async run(callback: () => Promise<any>) {
    return this.instance?.run(callback);
  }
  async create(data: INewTagBody) {
    const callback = async () => {
      return this.instance?.db?.tag.create({
        data: {
          name: data.name,
        },
      });
    };

    return await this.run(callback);
  }

  async findById(id: string) {
    const callback = async () => {
      return this.instance?.db?.tag.findUnique({ where: { id } });
    };

    return await this.run(callback);
  }

  async find(filter: IFilterTagParams) {
    const callback = async () => {
      return this.instance?.db?.tag.findMany({
        where: { ...filter },
        include: { transaction: true },
      });
    };

    return await this.run(callback);
  }

  async update(id: string, data: Partial<INewTagBody>) {
    const callback = async () => {
      return this.instance?.db?.tag.update({ where: { id }, data });
    };

    return await this.run(callback);
  }

  async delete(id: string) {
    const callback = async () => {
      return this.instance?.db?.tag.delete({ where: { id } });
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
