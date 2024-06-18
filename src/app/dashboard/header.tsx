import { getMyUser } from "@/lib/services/user.services";
import AccountsPopover from "./accounts-popover";
import { getMyAAccounts } from "@/lib/services/account.services";
import UserMenu from "./user-menu";

export default async function Header() {
  const user = await getMyUser();
  const myAccounts = await getMyAAccounts();
  return (
    <div className=" flex h-16 shrink-0 items-center justify-between border-b px-2 shadow-sm sm:gap-x-6 sm:px-4 lg:hidden ">
      <AccountsPopover
        user={user}
        myAccounts={myAccounts}
      />
      <div className="flex gap-2">
        <UserMenu />
      </div>
    </div>
  );
}
