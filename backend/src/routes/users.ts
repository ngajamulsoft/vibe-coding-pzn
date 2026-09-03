import { Elysia, t } from "elysia";
import { db } from "../db";
import { createUser } from "../services/user-service";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const userRoutes = new Elysia({ prefix: "/users" })
  // Get all users
  .get("/", async () => {
    return await db.select().from(users);
  })
  // Get user by id
  .get(
    "/:id",
    async ({ params: { id }, set }) => {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, Number(id)));

      if (!result.length) {
        set.status = 404;
        return { message: "User not found" };
      }

      return result[0];
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  // Create new user
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const { name, email, password } = body;
        const userId = await createUser({ name, email, password });
        set.status = 201;
        return { data: "OK" };
      } catch (error: any) {
        set.status = 400;
        return { data: "Failed to create new user" };
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 1 }),
      }),
    }
  )
  // Update user
  .put(
    "/:id",
    async ({ params: { id }, body, set }) => {
      try {
        const result = await db
          .update(users)
          .set(body)
          .where(eq(users.id, Number(id)));

        if (result[0].affectedRows === 0) {
          set.status = 404;
          return { message: "User not found" };
        }

        return { message: "User updated successfully" };
      } catch (error: any) {
        set.status = 400;
        return { message: error.message || "Failed to update user" };
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: t.Object({
        name: t.Optional(t.String({ minLength: 1 })),
        email: t.Optional(t.String({ format: "email" })),
      }),
    }
  )
  // Delete user
  .delete(
    "/:id",
    async ({ params: { id }, set }) => {
      const result = await db
        .delete(users)
        .where(eq(users.id, Number(id)));

      if (result[0].affectedRows === 0) {
        set.status = 404;
        return { message: "User not found" };
      }

      return { message: "User deleted successfully" };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
