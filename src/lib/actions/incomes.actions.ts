'use server'

import { z } from "zod"
import { createIncomeSchema } from "../schemas/incomes.schema"
import { db } from "../db"
import { income } from "../db/schema"
import { getMyUser } from "../services/user.services"
import { revalidatePath } from "next/cache"
import { eq, sum } from "drizzle-orm"

type CreateIncome = z.infer<typeof createIncomeSchema>
type UpdateIncome = Partial<CreateIncome>

export const createIncome = async (data: CreateIncome) => {
    const myUser = await getMyUser()

    try {
        await db.insert(income).values({
            name: data.name,
            amount: data.amount.toString(),
            createdAt: new Date(),
            accountId: myUser.defaultAccountId,
            updatedAt: new Date()
        })
        revalidatePath("/dashboard")
    } catch (error) {
        throw new Error(error as string)
    }
}

export const updateIncome = async ({
    incomeId,
    data
}: {
    incomeId: number,
    data: UpdateIncome
}) => {
    try {
        await db.update(income).set({
            name: data.name,
            amount: data.amount?.toString(),
            updatedAt: new Date()
        }).where(eq(income.id, incomeId))
        revalidatePath("/dashboard")
    } catch (error) {
        throw new Error(error as string)
    }
}

export const deleteIncome = async (incomeId: number) => {
    try {
        await db.delete(income).where(eq(income.id, incomeId))
        revalidatePath('/dashboard')
    } catch (error) {
        throw new Error(error as string)
    }
}

export const getTotalIncomes = async () => {
    const myUser = await getMyUser()
    try {
        const [total] = await db.select({
            total: sum(income.amount)
        }).from(income).where(eq(income.accountId, myUser.defaultAccountId as number))
        const totalIncome = Number(total.total)
        return totalIncome
    } catch (error) {
        throw new Error()
    }
}