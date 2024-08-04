"use server";

import { getMyUser } from "@/lib/services/user.services";
import { db } from "@/lib/db";
import { expense } from "@/lib/db/schema";
import { and, desc, eq, sum } from "drizzle-orm";
import { z } from "zod";

import { createExpenseSchema } from "@/lib/schemas/expenses.schema";
import { revalidatePath } from "next/cache";
import { getMyDefaultAccount } from "../services/account.services";

type CreateExpense = z.infer<typeof createExpenseSchema>;
type UpdateExpense = Partial<CreateExpense>;

export const getMyExpenses = async () => {
  try {
    const myDefaultAccount = await getMyDefaultAccount();

    return await db
      .select({
        id: expense.id,
        name: expense.name,
        amount: expense.amount,
        createdAt: expense.createdAt,
        due: expense.due,
      })
      .from(expense)
      .where(eq(expense.accountId, myDefaultAccount.id))
      .orderBy(desc(expense.createdAt));
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createExpense = async (data: CreateExpense) => {
  try {
    const myDefaultAccount = await getMyDefaultAccount();
    await db.insert(expense).values({
      name: data.name,
      amount: data.amount.toString(),
      accountId: myDefaultAccount.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      due: data.due ?? new Date(),
    });
    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateExpense = async ({
  expenseId,
  data,
}: {
  expenseId: number;
  data: UpdateExpense;
}) => {
  const myDefaultAccount = await getMyDefaultAccount();
  try {
    await db
      .update(expense)
      .set({
        name: data.name,
        amount: data.amount?.toString(),
        updatedAt: new Date(),
        due: data.due,
      })
      .where(
        and(
          eq(expense.accountId, myDefaultAccount.id),
          eq(expense.id, expenseId)
        )
      );
    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteExpense = async (expenseId: number) => {
  try {
    const myDefaultAccount = await getMyDefaultAccount();
    await db
      .delete(expense)
      .where(
        and(
          eq(expense.accountId, myDefaultAccount.id),
          eq(expense.id, expenseId)
        )
      );
    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getTotalExpenses = async () => {
  try {
    const myDefaultAccount = await getMyDefaultAccount();
    const [expenses] = await db
      .select({
        total: sum(expense.amount),
      })
      .from(expense)
      .where(eq(expense.accountId, myDefaultAccount.id));
    const totalExpenses = Number(expenses.total);
    return totalExpenses;
  } catch (error) {
    throw new Error();
  }
};
