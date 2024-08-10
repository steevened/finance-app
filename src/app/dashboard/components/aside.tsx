import { Separator } from "@/components/ui/separator";
import AccountsPopoverProvider from "./accounts-popover-provider";
import NavMenu from "./nav-menu";
import UserMenuProvider from "./user-menu-provider";

export default function Aside() {
  return (
    <aside className="p-3 h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="grid gap-1.5 w-full">
          <AccountsPopoverProvider />
          <Separator />
          <NavMenu />
        </div>
        <UserMenuProvider size="lg" />
      </div>
    </aside>
  );
}
