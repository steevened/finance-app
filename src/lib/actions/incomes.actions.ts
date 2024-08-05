"use server";

import { and, desc, eq, sum } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "../db";
import { income } from "../db/schema";
import { createIncomeSchema } from "../schemas/incomes.schema";
import { getMyDefaultAccount } from "./account.actions";

type CreateIncome = z.infer<typeof createIncomeSchema>;
type UpdateIncome = Partial<CreateIncome>;

export const getMyIncomes = async () => {
  // try {
  const myDefaultAccount = await getMyDefaultAccount();

  return await db
    .select({
      id: income.id,
      name: income.name,
      amount: income.amount,
      createdAt: income.createdAt,
      due: income.due,
    })
    .from(income)
    .where(eq(income.accountId, myDefaultAccount.id))
    .orderBy(desc(income.createdAt));
  // } catch (error) {
  //   throw error;
  // }
};

export const createIncome = async (data: CreateIncome) => {
  const myDefaultAccount = await getMyDefaultAccount();

  try {
    await db.insert(income).values({
      name: data.name,
      amount: data.amount.toString(),
      createdAt: new Date(),
      accountId: myDefaultAccount.id,
      updatedAt: new Date(),
      due: data.due ?? new Date(),
    });
    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateIncome = async ({
  incomeId,
  data,
}: {
  incomeId: number;
  data: UpdateIncome;
}) => {
  const myDefaultAccount = await getMyDefaultAccount();
  try {
    await db
      .update(income)
      .set({
        name: data.name,
        amount: data.amount?.toString(),
        updatedAt: new Date(),
        due: data.due,
      })
      .where(
        and(eq(income.accountId, myDefaultAccount.id), eq(income.id, incomeId))
      );
    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteIncome = async (incomeId: number) => {
  try {
    const myDefaultAccount = await getMyDefaultAccount();
    await db
      .delete(income)
      .where(
        and(eq(income.accountId, myDefaultAccount.id), eq(income.id, incomeId))
      );
    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getTotalIncomes = async () => {
  const myDefaultAccount = await getMyDefaultAccount();
  // try {
  const [total] = await db
    .select({
      total: sum(income.amount),
    })
    .from(income)
    .where(eq(income.accountId, myDefaultAccount.id));
  const totalIncome = Number(total.total);
  return totalIncome;
  // } catch (error) {
  //   throw new Error();
  // }
};
