import { Elysia } from "elysia";
import { userRoutes } from "./users";

export const routes = new Elysia({ prefix: "/api" })
  .use(userRoutes);
