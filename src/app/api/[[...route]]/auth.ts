import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { insertUserSchema, user } from "@/lib/db/schema";
import { db, lucia } from "@/lib/db";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcrypt";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { HTTPException } from "hono/http-exception";

const app = new Hono().post(
  "/sign-up",
  zValidator(
    "json",
    insertUserSchema.omit({
      id: true,
    })
  ),
  async (c) => {
    const { username, email, passwordHash } = c.req.valid("json");

    const existingUser = await db
      .select()
      .from(user)
      .where(or(eq(user.email, email), eq(user.username, username)))
      .limit(1);

    if (existingUser.length > 0) {
      throw new HTTPException(401, {
        message: "User already exists",
      });
      // return c.json(
      //   {
      //     error: "User already exists",
      //   },
      //   401
      // );
    }

    const hash = await bcrypt.hash(passwordHash, 10);

    const userId = generateIdFromEntropySize(10);

    const [data] = await db
      .insert(user)
      .values({
        id: userId,
        username,
        email,
        passwordHash: hash,
      })
      .returning({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return c.json({
      data,
    });
  }
);

export default app;
