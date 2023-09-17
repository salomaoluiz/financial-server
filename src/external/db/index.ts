import Elysia from "elysia";
import { getDatabase } from "@db/sqlite";

export const db = new Elysia({ name: "db" }).decorate("database", getDatabase());
