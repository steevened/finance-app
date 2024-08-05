import { upsertAccount } from "@/lib/actions/account.actions";
import { validateRequest } from "@/lib/db";

import { redirect } from "next/navigation";

async function upsertAccountAndRedirect() {
  const { user: userAuth } = await validateRequest();
  if (!userAuth) redirect("/login");
  const upserted = await upsertAccount();

  if (!upserted) redirect("/login");
  redirect("/dashboard");
}

export default async function Page() {
  await upsertAccountAndRedirect();
  return (
    <div className="h-screen flex items-center justify-center">Loading...</div>
  );
}
