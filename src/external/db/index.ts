import Elysia from "elysia";
import { getDatabase } from "@db/mongodb";

export const db = new Elysia({ name: "db" }).decorate("database", getDatabase());
