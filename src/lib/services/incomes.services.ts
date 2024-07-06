import { eq } from "drizzle-orm";
import { db } from "../db";
import { income } from "../db/schema";
import { getMyUser } from "./user.services";

export const getMyIncomes = async () => {
    try {
        const myUser = await getMyUser()
        return await db.select({
            id: income.id,
            name: income.name,
            amount: income.amount,
            createdAt: income.createdAt,
        }).from(income).where(eq(income.accountId, myUser.defaultAccountId as string))

    } catch (error) {
        throw error
    }
}