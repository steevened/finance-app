import { decimal, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";


export const account = pgTable("accounts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

export const user = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  github_id: text("github_id").unique(),
  defaultAccountId: integer("default_account_id"),
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

export const expense = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: decimal("amount"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: "date"
  }),
  accountId: integer("account_id").references(() => account.id),
});

export const income = pgTable("incomes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: decimal("amount"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: "date"
  }),
  accountId: integer("account_id").references(() => account.id),
});

export const selectAccountSchema = createSelectSchema(account);
export const insertAccountSchema = createInsertSchema(account);

export const selectUserSchema = createSelectSchema(user);
export const insertUserSchema = createInsertSchema(user);

export const selectIncomeSchema = createSelectSchema(income);
export const insertIncomeSchema = createInsertSchema(income);

export const selectExpenseSchema = createSelectSchema(expense);
export const insertExpenseSchema = createInsertSchema(expense)
