import { getMyUser } from "@/lib/services/user.services";
import AccountsPopover from "./accounts-popover";
import { getMyAAccounts } from "@/lib/services/account.services";

export default async function AccountsPopoverProvider() {
  const user = await getMyUser();
  const myAccounts = await getMyAAccounts();

  return (
    <div className="truncate p-0.5">
      <AccountsPopover
        user={user}
        myAccounts={myAccounts}
      />
    </div>
  );
}
