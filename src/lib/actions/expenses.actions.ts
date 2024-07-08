"use server";

import { getMyUser } from "@/lib/services/user.services";
import { db } from "@/lib/db";
import { expense } from "@/lib/db/schema";
import { desc, eq, sum } from "drizzle-orm";
import { z } from "zod";

import { createExpenseSchema } from "@/lib/schemas/expenses.schema";
import { revalidatePath } from "next/cache";

type CreateExpense = z.infer<typeof createExpenseSchema>
type UpdateExpense = Partial<CreateExpense>

export const getMyExpenses = async () => {
    try {
        const myUser = await getMyUser();

        return await db.select({
            id: expense.id,
            name: expense.name,
            amount: expense.amount,
            createdAt: expense.createdAt,
        }).from(expense).where(
            eq(expense.accountId, myUser.defaultAccountId as number),
        ).orderBy(desc(expense.createdAt));
    } catch (error) {
        throw new Error(error as string);
    }
};

export const createExpense = async (data: CreateExpense) => {

    try {
        const myUser = await getMyUser()
        await db.insert(expense).values({
            name: data.name,
            amount: data.amount,
            accountId: myUser.defaultAccountId,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        revalidatePath('/dashboard')
    } catch (error) {
        throw new Error(error as string)
    }
};

export const updateExpense = async ({
    expenseId,
    data
}: {
    expenseId: number,
    data: UpdateExpense
}) => {
    try {
        await db.update(expense).set({
            name: data.name,
            amount: data.amount,
            updatedAt: new Date()
        }).where(eq(expense.id,
            expenseId
        ))
        revalidatePath("/dashboard")
    } catch (error) {
        throw new Error(error as string)
    }
};

export const deleteExpense = async (expenseId: number) => {
    try {
        await db.delete(expense).where(eq(expense.id, expenseId))
        revalidatePath('/dashboard')
    } catch (error) {
        throw new Error(error as string)

    }
};


export const getTotalExpenses = async () => {
    try {
        const myUser = await getMyUser()
        const [expenses] = await db.select({
            total: sum(expense.amount)
        }).from(expense).where(eq(expense.accountId, myUser.defaultAccountId as number))
        const totalExpenses = Number(expenses.total)
        return totalExpenses
    } catch (error) {
        throw new Error()
    }
}