import { redirect } from "next/navigation";
import { validateRequest } from "../db";

export async function getMyUserId() {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }
  return user.id;
}
