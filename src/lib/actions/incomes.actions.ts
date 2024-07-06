'use server'

import { z } from "zod"
import { createIncomeSchema } from "../schemas/incomes.schema"
import { db } from "../db"
import { income } from "../db/schema"
import { getMyUser } from "../services/user.services"
import { revalidatePath } from "next/cache"

type CreateIncome = z.infer<typeof createIncomeSchema>

export const createIncome = async (data: CreateIncome) => {
    const myUser = await getMyUser()

    try {
        await db.insert(income).values({
            name: data.name,
            amount: data.amount,
            accountId: myUser.defaultAccountId as string,
            createdAt: new Date()
        })
        revalidatePath("/dashboard")
    } catch (error) {
        throw error
    }
}