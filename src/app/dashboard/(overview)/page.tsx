import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import BalanceCard from "./balance-card";
import BalanceResumen from "./balance-resumen";
import TotalExpensesCard from "./total-expenses-card";
import TotalIncomesCard from "./total-incomes-card";

export default function Home({
  searchParams,
}: {
  searchParams: {
    from?: string;
    to?: string;
  };
}) {
  return (
    <div className="grid gap-3 @container">
      {/* <div className="flex items-center justify-between">
        <div>
          <Suspense
            fallback={
              <div className="flex flex-col gap-1">
                <Skeleton className="w-12 h-5" />
                <Skeleton className="w-24 h-8" />
              </div>
            }
          >
            <BalanceResumen {...searchParams} />
          </Suspense>
        </div>
      </div>
      <Separator /> */}

      <div className="flex flex-col @xl:flex-row gap-3">
        <div className="flex-1">
          <BalanceCard {...searchParams} />
        </div>
        <div className="flex-1">
          <TotalExpensesCard {...searchParams} />
        </div>
        <div className="flex-1">
          <TotalIncomesCard {...searchParams} />
        </div>
      </div>
    </div>
  );
}
