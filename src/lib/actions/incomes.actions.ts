"use server";

import { and, desc, eq, gt, lt, sum } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "../db";
import { income } from "../db/schema";
import { createIncomeSchema } from "../schemas/incomes.schema";
import { extendsDateRange } from "../utils";
import { getMyDefaultAccount } from "./account.actions";

type CreateIncome = z.infer<typeof createIncomeSchema>;
type UpdateIncome = Partial<CreateIncome>;

export const getMyIncomes = async (params?: { from?: string; to?: string }) => {
  const myDefaultAccount = await getMyDefaultAccount();

  const { from, to } = extendsDateRange({
    from: params?.from as string,
    to: params?.to as string,
  });

  return await db
    .select({
      id: income.id,
      name: income.name,
      amount: income.amount,
      createdAt: income.createdAt,
      due: income.due,
    })
    .from(income)
    .where(
      and(
        eq(income.accountId, myDefaultAccount.id),
        from ? gt(income.due, new Date(from)) : undefined,
        to ? lt(income.due, new Date(to)) : undefined
      )
    )
    .orderBy(desc(income.createdAt));
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

export const getTotalIncomes = async (searchParams?: {
  from?: string;
  to?: string;
}) => {
  const { from, to } = extendsDateRange({
    from: searchParams?.from as string,
    to: searchParams?.to as string,
  });

  const myDefaultAccount = await getMyDefaultAccount();
  const [total] = await db
    .select({
      total: sum(income.amount),
    })
    .from(income)
    .where(
      and(
        eq(income.accountId, myDefaultAccount.id),
        from ? gt(income.due, new Date(from)) : undefined,
        to ? lt(income.due, new Date(to)) : undefined
      )
    );
  const totalIncome = Number(total.total);
  return totalIncome;
};
