import { getMyUser } from "@/lib/services/user.services";
import UserMenu from "./user-menu";
import { redirect } from "next/navigation";
import AuthAlert from "./auth-alert";

export default async function UserMenuProvider({
  size = "sm",
}: {
  size?: "sm" | "lg";
}) {
  const user = await getMyUser();

  if (!user) {
    return (
      <AuthAlert
        open
      />
    );
  }
  return <UserMenu user={user} size={size} />;
}
