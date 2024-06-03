import { db } from "@/lib/db";
import { account } from "@/lib/db/schema";
import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  const data = await db.select().from(account);
  // .where(eq(accounts.userId, auth.userId));
  return c.json({
    data,
  });
});

export default app;
