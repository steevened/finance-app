import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const account = pgTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

export const user = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("usernams").notNull(),
  email: text("username").notNull(),
  passwordHash: text("password_hash").notNull(),
});

export const session = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const selectAccountSchema = createSelectSchema(account);
export const insertAccountSchema = createInsertSchema(account);

export const selectUserSchema = createSelectSchema(user);
export const insertUserSchema = createInsertSchema(user);
