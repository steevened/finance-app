"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getMyUser } from "@/lib/services/user.services";
import {
  CaretRightIcon,
  CaretSortIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import AddAccountModal from "./add-account-modal";
import {
  getMyAccounts,
  setDefaultAccount,
} from "@/lib/actions/account.actions";
import { useCallback, useState } from "react";

export default function AccountsPopover({
  user,
  myAccounts,
}: {
  user: Awaited<ReturnType<typeof getMyUser>>;
  myAccounts: Awaited<ReturnType<typeof getMyAccounts>>;
}) {
  const [isAddAcccountModalOpen, setIsAddAccountModalOpen] = useState(false);

  const defaultAccount = useCallback(() => {
    return myAccounts.find((a) => a.isDefault);
  }, [myAccounts]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className="py-6 w-full text-foreground flex justify-between"
          >
            <div className="flex items-center w-full gap-1">
              <Avatar>
                <AvatarFallback className="uppercase">
                  {defaultAccount
                    ? defaultAccount()?.name.slice(0, 2)
                    : user.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-shrink-0">
                <CaretRightIcon className="w-5 h-5" />
              </div>

              <span className="truncate max-w-full">
                {defaultAccount ? defaultAccount()?.name : user.username}
              </span>
            </div>
            <CaretSortIcon className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="start">
          <DropdownMenuLabel>Accounts ({myAccounts.length})</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {myAccounts.map((account) => (
              <DropdownMenuItem
                key={account.id}
                className="justify-between cursor-pointer"
                onClick={async () => await setDefaultAccount(account.id)}
              >
                <span>{account.name}</span>
                {account.id === defaultAccount()?.id ? <CheckIcon /> : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsAddAccountModalOpen(true)}
          >
            Add Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddAccountModal
        open={isAddAcccountModalOpen}
        onOpenChange={setIsAddAccountModalOpen}
      />
    </>
  );
}
