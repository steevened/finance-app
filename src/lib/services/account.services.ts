import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { account } from "../db/schema";
import { getMyUserId } from "./auth.services";

export async function getMyAccounts() {
  try {
    const userId = await getMyUserId();
    const myAccounts = await db
      .select()
      .from(account)
      .where(eq(account.userId, userId));
    return myAccounts;
  } catch (error) {
    throw error;
  }
}

export async function getMyDefaultAccount() {
  try {
    const userId = await getMyUserId();

    const [defaultAccount] = await db
      .select()
      .from(account)
      .where(and(eq(account.userId, userId), eq(account.isDefault, true)));
    return defaultAccount;
  } catch (error) {
    throw error;
  }
}
