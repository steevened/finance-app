import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import BalanceCard from "./balance-card";
import BalanceResumen from "./balance-resumen";
import CardLinkContainer from "./card-link-container";
import TotalExpensesCard from "./total-expenses-card";
import TotalIncomesCard from "./total-incomes-card";
import UserGreeting from "./user-greeting";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const mode = searchParams.mode;

  console.log(mode);

  return (
    <div className="grid gap-6 @container">
      <div className="flex items-center justify-between">
        <Suspense fallback={<Skeleton className="w-40 h-7" />}>
          <UserGreeting />
        </Suspense>
        <div>
          <Suspense
            fallback={
              <div className="flex flex-col gap-1 items-end">
                <Skeleton className="w-12 h-5" />
                <Skeleton className="w-24 h-8" />
              </div>
            }
          >
            <BalanceResumen />
          </Suspense>
        </div>
      </div>
      <Separator />

      {/* <RangeTabs /> */}

      <div className="flex flex-col @xl:flex-row gap-3">
        <div className="flex-1">
          <CardLinkContainer type="balance">
            <BalanceCard selected={!mode} />
          </CardLinkContainer>
        </div>
        <div className="flex-1">
          <CardLinkContainer type="spent">
            <TotalExpensesCard selected={mode === "spent"} />
          </CardLinkContainer>
        </div>
        <div className="flex-1">
          <CardLinkContainer type="received">
            <TotalIncomesCard selected={mode === "received"} />
          </CardLinkContainer>
        </div>
      </div>

      {/* <BalanceChart /> */}
    </div>
  );
}
