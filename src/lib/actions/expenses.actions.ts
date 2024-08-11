"use server";

import { getMyUser } from "@/lib/services/user.services";
import { db } from "@/lib/db";
import { expense, income } from "@/lib/db/schema";
import { and, desc, eq, gt, gte, lt, sum } from "drizzle-orm";
import { z } from "zod";

import { createExpenseSchema } from "@/lib/schemas/expenses.schema";
import { revalidatePath } from "next/cache";
import { getMyDefaultAccount } from "./account.actions";
import { extendsDateRange } from "../utils";

type CreateExpense = z.infer<typeof createExpenseSchema>;
type UpdateExpense = Partial<CreateExpense>;

export const getMyExpenses = async (searchParams?: {
  from?: string;
  to?: string;
}) => {
  const myDefaultAccount = await getMyDefaultAccount();

  const { from, to } = extendsDateRange({
    from: searchParams?.from as string,
    to: searchParams?.to as string,
  });

  return await db
    .select({
      id: expense.id,
      name: expense.name,
      amount: expense.amount,
      createdAt: expense.createdAt,
      due: expense.due,
    })
    .from(expense)
    .where(
      and(
        eq(expense.accountId, myDefaultAccount.id),
        from ? gt(expense.due, new Date(from)) : undefined,
        to ? lt(expense.due, new Date(to)) : undefined
      )
    )
    .orderBy(desc(expense.createdAt));
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

export const getTotalExpenses = async (searchParams?: {
  from?: string;
  to?: string;
}) => {
  const { from, to } = extendsDateRange({
    from: searchParams?.from as string,
    to: searchParams?.to as string,
  });

  const myDefaultAccount = await getMyDefaultAccount();
  const [expenses] = await db
    .select({
      total: sum(expense.amount),
    })
    .from(expense)
    .where(
      and(
        eq(expense.accountId, myDefaultAccount.id),
        from ? gt(expense.due, new Date(from)) : undefined,
        to ? lt(expense.due, new Date(to)) : undefined
      )
    );
  const totalExpenses = Number(expenses.total);
  return totalExpenses;
  // } catch (error) {
  //   throw new Error();
  // }
};
