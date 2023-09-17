import { Prisma, PrismaClient } from "@prisma/client";

export type CreateArgs<Arg> = Prisma.Args<{ data: Arg }, "create">;
export type Create<Arg, Entity> = (args: CreateArgs<Arg>) => Promise<Entity>;

export type UpdateArgs<FindArg, DataArg> = Prisma.Args<
  { data: DataArg; where: FindArg },
  "update"
>;
export type Update<Args extends { data: unknown; where: unknown }, Entity> = (
  args: UpdateArgs<Args["where"], Args["data"]>,
) => Promise<Entity>;

export type DeleteArgs<Arg> = Prisma.Args<{ where: Arg }, "delete">;
export type Delete<Arg, Entity> = (args: DeleteArgs<Arg>) => Promise<Entity>;

export type FindUniqueArgs<Arg> = Prisma.Args<{ where: Arg }, "findUnique">;
export type FindUnique<Arg, Entity> = (
  args: FindUniqueArgs<Arg>,
) => Promise<Entity>;

export type FindManyArgs<Arg> = Prisma.Args<{ where: Arg }, "findMany">;
export type FindMany<Arg, Entity> = (
  args: FindManyArgs<Arg>,
) => Promise<Entity>;

export type PrismaClientMethod =
  | "$on"
  | "$connect"
  | "$disconnect"
  | "$use"
  | "$executeRaw"
  | "$executeRawUnsafe"
  | "$queryRaw"
  | "$queryRawUnsafe"
  | "$transaction"
  | "$extends"
  | symbol;

export type PrismaModel = keyof Omit<PrismaClient, PrismaClientMethod>;

export interface Repository<Args, Entity> {
  create: Create<Args, Entity>;
  findUnique: FindUnique<Args, Entity>;
  findMany: FindMany<Args, Entity>
  update: Update<Args & { data: unknown; where: unknown }, Entity>;
  delete: Delete<Args, Entity>;
}
