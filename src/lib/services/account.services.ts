import { eq } from "drizzle-orm"
import { db, validateRequest } from "../db"
import { account } from "../db/schema"
import { getMyUserId } from "./auth.services"

export async function getMyAccounts() {
    const userId = await getMyUserId()
    const myAccounts = await db.select().from(account).where(eq(account.userId, userId))
    return myAccounts
}