import { getMyUser } from "@/lib/services/user.services";
import AccountsPopover from "./accounts-popover";
import { getMyAccounts } from "@/lib/actions/account.actions";

export default async function AccountsPopoverProvider() {
  const user = await getMyUser();
  const myAccounts = await getMyAccounts();

  return (
    <div className="truncate p-0.5">
      <AccountsPopover user={user} myAccounts={myAccounts} />
    </div>
  );
}
