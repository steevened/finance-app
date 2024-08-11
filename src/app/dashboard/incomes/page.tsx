import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import DateRangeServer from "../components/date-range-server";
import IncomesTable from "./incomes-table";

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
      <Suspense fallback={<Skeleton className="h-9 w-40" />}>
        <DateRangeServer />
      </Suspense>
      <IncomesTable
        searchParams={{
          from: from ?? "",
          to: to ?? "",
        }}
      />
    </div>
  );
}
