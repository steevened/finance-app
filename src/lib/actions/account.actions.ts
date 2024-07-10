"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { account, user } from "../db/schema";
import { revalidatePath } from "next/cache";
import { getMyUserId } from "../services/auth.services";

export async function createAccount(formData: FormData) {
  const name = formData.get("account-name") as string;
  const userId = await getMyUserId();
  const [accountCreated] = await db.insert(account).values({
    name,
    userId,
  }).returning({
    id: account.id,
    name: account.name,
    userId: account.userId,
  });

  await setDefaultAccount(accountCreated.id);
  revalidatePath("/dashboard");
}

export async function setDefaultAccount(accountId: number) {
  const userId = await getMyUserId();
  await db.update(user).set({
    defaultAccountId: accountId,
  }).where(eq(user.id, userId));
  revalidatePath("/dashboard");
}
