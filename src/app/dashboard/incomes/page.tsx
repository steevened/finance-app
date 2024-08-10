import { dateParamsCache, searchParamsCache } from "@/lib/server";
import IncomesTable from "./incomes-table";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DateRangeServer from "../components/date-range-server";

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
