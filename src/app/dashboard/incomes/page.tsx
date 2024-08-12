import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import DateRangeServer from "../components/date-range-server";
import IncomesTable from "./incomes-table";
import TotalIncomes from "./total-incomes";

export default function Page({
  searchParams,
}: {
  searchParams: {
    from?: string;
    to?: string;
  };
}) {
  const { from, to } = searchParams;
  return (
    <div className="grid gap-3">
      <div className="w-full flex justify-between">
        <Suspense fallback={<Skeleton className="h-9 w-40" />}>
          <DateRangeServer />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-8 w-40" />}>
          <TotalIncomes searchParams={searchParams} />
        </Suspense>
      </div>
      <IncomesTable
        searchParams={{
          from: from ?? "",
          to: to ?? "",
        }}
      />
    </div>
  );
}
