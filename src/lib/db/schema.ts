import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const expense = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount").default(0),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  accountId: text("account_id").notNull().references(() => account.id),
});

export const income = pgTable("incomes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount").default(0),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  accountId: text("account_id").notNull().references(() => account.id),
});

export const account = pgTable("accounts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

export const user = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  github_id: text("github_id").unique(),
  defaultAccountId: text("default_account_id"),
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

export const selectIncomeSchema = createSelectSchema(income);
export const insertIncomeSchema = createInsertSchema(income);
