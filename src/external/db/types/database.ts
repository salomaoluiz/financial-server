export class Database<T = unknown> {
  static instance?: Database;
  db?: unknown;
  collection?: T;

  static getInstance(_: unknown) {
    throw new Error("Should implements in children class");
  }

  setCollection(collection: T) {
    this.collection = collection;
  }

  async connect() {
    throw new Error("Should implements in children class");
  }

  async disconnect() {
    throw new Error("Should implements in children class");
  }

  async create<D, R>(data: D): Promise<R> {
    throw new Error("Should implements in children class");
  }

  async findById<D, R>(id: string | number): Promise<R> {
    throw new Error("Should implements in children class");
  }

  async update<D, R>(id: string, data: D): Promise<R> {
    throw new Error("Should implements in children class");
  }
  async delete<R>(id: string): Promise<R> {
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
