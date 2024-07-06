import { getMyUser } from "@/lib/services/user.services";
import AccountsPopover from "./accounts-popover";
import { getMyAccounts } from "@/lib/services/account.services";

export default async function AccountsPopoverProvider() {
  const user = await getMyUser();
  const myAccounts = await getMyAccounts();

  return (
    <div className="truncate p-0.5">
      <AccountsPopover
        user={user}
        myAccounts={myAccounts}
      />
    </div>
  );
}
