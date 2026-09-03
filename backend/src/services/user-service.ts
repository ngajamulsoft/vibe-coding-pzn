import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

/**
 * Creates a new user record.
 * The password is hashed with bcrypt (saltRounds = 10) before storing.
 * Returns the inserted user ID on success.
 */
export async function createUser({ name, email, password }: CreateUserInput): Promise<number> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const result = await db
      .insert(users)
      .values({ name, email, password: hashedPassword })
      .returning({ id: users.id });
    // Drizzle returns an array of rows; take first
    return Number(result[0].id);
  } catch (err: any) {
    // If duplicate email (unique constraint) error, rethrow with clear message
    if (err?.code === "ER_DUP_ENTRY" || err?.message?.includes("Duplicate entry")) {
      throw new Error("Email already registered");
    }
    throw err;
  }
}
