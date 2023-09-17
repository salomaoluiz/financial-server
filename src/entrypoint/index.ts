import Elysia from "elysia";
import { v1Routes } from "./v1";

export const app = new Elysia().use(v1Routes);
