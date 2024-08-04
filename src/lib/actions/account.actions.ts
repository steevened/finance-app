"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { account, user } from "../db/schema";
import { revalidatePath } from "next/cache";
import { getMyUserId } from "../services/auth.services";

export async function createAccount(formData: FormData) {
  const name = formData.get("account-name") as string;
  const userId = await getMyUserId();

  try {
    const [newAccount] = await db
      .insert(account)
      .values({
        name,
        userId,
        createdAt: new Date(),
        isDefault: true,
      })
      .returning({
        id: account.id,
      });

    await setDefaultAccount(newAccount.id);
  } catch (error) {
    throw error;
  }

  revalidatePath("/dashboard");
}

export async function setDefaultAccount(accountId: number) {
  try {
    const userId = await getMyUserId();

    const [defaultAccount] = await db
      .select({
        id: account.id,
      })
      .from(account)
      .where(and(eq(account.userId, userId), eq(account.isDefault, true)));

    if (defaultAccount.id === accountId) return;

    const [accountToChange] = await db
      .select({
        id: account.id,
      })
      .from(account)
      .where(and(eq(account.userId, userId), eq(account.id, accountId)));

    const [changedToNotDefault] = await db
      .update(account)
      .set({
        isDefault: false,
      })
      .where(and(eq(account.id, defaultAccount.id)))
      .returning({
        id: account.id,
      });

    try {
      await db
        .update(account)
        .set({
          isDefault: true,
        })
        .where(eq(account.id, accountToChange.id));
    } catch (error) {
      await db
        .update(account)
        .set({
          isDefault: true,
        })
        .where(eq(account.id, changedToNotDefault.id));
    }
  } catch (error) {
    throw error;
  }

  revalidatePath("/dashboard");
}
