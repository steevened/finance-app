"use server";

import { and, desc, eq } from "drizzle-orm";
import { db } from "../db";
import { account, user } from "../db/schema";
import { revalidatePath } from "next/cache";
import { getMyUserId } from "../services/auth.services";
import { getMyUser } from "../services/user.services";
import { redirect } from "next/navigation";

export async function createAccount(
  prevState: {
    message: string;
    ok: boolean;
  },
  formData: FormData
) {
  const name = formData.get("account-name") as string;
  if (name.length < 3)
    return {
      message: "Name must be greater than 3 characters",
      ok: false,
    };
  const userId = await getMyUserId();

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

  revalidatePath("/dashboard");
  return {
    message: "Account created!",
    ok: true,
  };
}

export async function setDefaultAccount(accountId: number) {
  const userId = await getMyUserId();
  const defaultAccount = await getMyDefaultAccount();

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

  await db
    .update(account)
    .set({
      isDefault: true,
    })
    .where(eq(account.id, accountToChange.id));

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function getMyAccounts() {
  // try {
  const userId = await getMyUserId();
  const myAccounts = await db
    .select()
    .from(account)
    .where(eq(account.userId, userId))
    .orderBy(desc(account.createdAt));
  return myAccounts;
  // } catch (error) {
  //   throw error;
  // }
}

export async function getMyDefaultAccount() {
  const userId = await getMyUserId();

  const [defaultAccount] = await db
    .select()
    .from(account)
    .where(and(eq(account.userId, userId), eq(account.isDefault, true)));
  return defaultAccount;
}

export async function upsertAccount() {
  // try {
  const accounts = await getMyAccounts();
  if (accounts && accounts.length) return accounts[0];

  const user = await getMyUser();

  const [upserted] = await db
    .insert(account)
    .values({
      name: user.username,
      userId: user.id,
      isDefault: true,
      createdAt: new Date(),
    })
    .returning({
      id: account.id,
    });
  return upserted;
  // } catch (error) {
  //   console.log(error);
  //   throw new Error("Error upserting account");
  // }
}
