"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions/auth.actions";
import { getMyUser } from "@/lib/services/user.services";
import { cn } from "@/lib/utils";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Monitor, MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function UserMenu({
  size = "sm",
  user,
}: {
  size?: "sm" | "lg";
  user: Awaited<ReturnType<typeof getMyUser>>;
}) {
  const { setTheme, theme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={size === "sm" ? "icon" : "lg"}
          variant={"ghost"}
          className={cn(size === "lg" ? "justify-between gap-2 py-6" : "")}
        >
          <Avatar className={cn(size === "sm" ? "w-6 h-6" : "")}>
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          {size === "lg"
            ? (
              <div className="flex items-center w-full justify-between">
                <div>
                  <p>
                    {user.username}
                  </p>
                </div>
                <DotsVerticalIcon />
              </div>
            )
            : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user.username}
        </DropdownMenuLabel>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Theme: {theme}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <MoonIcon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              Account settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={logout}>
            <button className="w-full text-start">
              Sign out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
