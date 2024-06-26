"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon } from "@radix-ui/react-icons";
import { HandCoins, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname();
  return (
    <div className="w-full h-full">
      <Button
        asChild
        className={cn(
          "w-full justify-start gap-2",
          pathname === "/dashboard" ? "text-primary hover:text-primary/90" : "",
        )}
        variant={"ghost"}
      >
        <Link href={"/dashboard"}>
          <HomeIcon className="w-4 h-4" />
          Overview
        </Link>
      </Button>

      <Button
        asChild
        className={cn(
          "w-full justify-start gap-2",
          pathname === "/dashboard/incomes"
            ? "text-primary hover:text-primary/90"
            : "",
        )}
        variant={"ghost"}
      >
        <Link href={"/dashboard/incomes"}>
          <Wallet className="w-4 h-4" />
          Incomes
        </Link>
      </Button>
      <Button
        asChild
        className={cn(
          "w-full justify-start gap-2",
          pathname === "/dashboard/expenses"
            ? "text-primary hover:text-primary/90"
            : "",
        )}
        variant={"ghost"}
      >
        <Link href={"/dashboard/expenses"}>
          <HandCoins className="w-4 h-4" />
          Expenses
        </Link>
      </Button>
    </div>
  );
}
