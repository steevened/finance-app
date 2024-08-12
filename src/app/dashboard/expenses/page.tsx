import { Suspense } from "react";
import ExpensesTable from "./expenses-table";
import { Skeleton } from "@/components/ui/skeleton";
import DateRangeServer from "../components/date-range-server";
import TotalExpenses from "./total-expenses";

export default async function Page({
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
          <TotalExpenses searchParams={searchParams} />
        </Suspense>
      </div>
      <ExpensesTable
        searchParams={{
          from: from ?? "",
          to: to ?? "",
        }}
      />
    </div>
  );
}
