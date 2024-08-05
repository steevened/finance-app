import { redirect } from "next/navigation";
import { validateRequest } from "../db";

export async function getMyUserId() {
  // try {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }
  return user.id;
  // } catch (error) {
  //   throw error;
  // }
}
