import { db, validateRequest } from "@/lib/db";
import { account, user } from "@/lib/db/schema";
import { getMyAccounts } from "@/lib/services/account.services";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

async function upsertAccount() {
  const { user: userAuth } = await validateRequest();

  if (!userAuth) redirect("/login");
  const accounts = await getMyAccounts();
  if (accounts.length > 0) redirect("/dashboard");

  const [createdAccount] = await db.insert(account).values({
    name: userAuth.username,
    userId: userAuth.id,
  }).returning({
    id: account.id,
    name: account.name,
    userId: account.userId,
  });

  if (!createdAccount) redirect("/login");

  await db.update(user).set({
    defaultAccountId: createdAccount.id.toString(),
  }).where(eq(
    user.id,
    createdAccount.userId,
  ));
  redirect("/dashboard");
}

export default async function Page() {
  await upsertAccount();
  return (
    <div className="h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}
