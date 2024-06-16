import { eq } from "drizzle-orm";
import { db, validateRequest } from "../db";
import { user } from "../db/schema";
import { redirect } from "next/navigation";
import { getMyUserId } from "./auth.services";

export async function getMyUser() {
    const userId = await getMyUserId()
    const userAuth = await db.select().from(user).where(eq(user.id, userId)).limit(0)
    if (!userAuth || userAuth.length === 0) {
        redirect('/login')
    }
    return userAuth[0]
}