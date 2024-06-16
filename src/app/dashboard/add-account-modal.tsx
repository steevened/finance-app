import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAccount } from "@/lib/actions/account.actions";

export default function AddAccountModal() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full justify-start px-2" variant={"ghost"}>
          Add Account
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              Create a new account
            </DrawerTitle>
            <DrawerDescription>
              Press the button below to continue.
            </DrawerDescription>
          </DrawerHeader>
          <div>
            <form action={createAccount}>
              <div className="grid w-full items-center gap-1.5 px-4">
                <Label htmlFor="account-name">Account name</Label>
                <Input id="account-name" name="account-name" />
              </div>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
