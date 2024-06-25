import AccountsPopoverProvider from "./accounts-popover-provider";
import MobileAsideSheet from "./mobile-aside-sheet";
import UserMenu from "./user-menu";
import UserMenuProvider from "./user-menu-provider";

export default async function Header() {
  return (
    <div className=" flex h-16 shrink-0 items-center justify-between  px-2 shadow-sm sm:gap-x-6 sm:px-4  ">
      <AccountsPopoverProvider />
      <div className="flex gap-2">
        <UserMenuProvider />
        <MobileAsideSheet />
      </div>
    </div>
  );
}
