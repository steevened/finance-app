import { Separator } from "@/components/ui/separator";
import { validateRequest } from "@/lib/db";
import AccountsPopoverProvider from "./accounts-popover-provider";
import AuthAlert from "./auth-alert";
import Header from "./header";
import UserMenuProvider from "./user-menu-provider";
export default async function Layout(
  { children }: { children: React.ReactNode },
) {
  const { user } = await validateRequest();
  return (
    <div>
      <div className="sticky top-0 z-40 lg:hidden bg-background">
        <Header />
      </div>

      <AuthAlert open={!user} />
      <div className="grid grid-cols-12 min-h-screen">
        <aside className="p-3 sticky top-0 hidden lg:block lg:col-span-3 xl:col-span-2">
          <div className="flex flex-col justify-between h-full">
            <div className="grid gap-3 w-full">
              <AccountsPopoverProvider />
              <Separator />
            </div>
            <UserMenuProvider size="lg" />
          </div>
        </aside>
        <div className="p-6 lg:col-span-9 xl:col-span-10 col-span-12 bg-muted/50 m-3 lg:ml-0 border rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
