import { dateParamsCache, searchParamsCache } from "@/lib/server";
import IncomesTable from "./incomes-table";
import { Suspense } from "react";
import DateRangeServer from "./date-range-server";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page({
  searchParams,
}: {
  searchParams: {
    from?: string;
    to?: string;
  };
}) {
  const { from, to } = dateParamsCache.parse(searchParams);
  return (
    <>
      <Suspense fallback={<Skeleton className="h-9 w-40" />}>
        <DateRangeServer />
      </Suspense>
      <IncomesTable
        searchParams={{
          from: from ?? "",
          to: to ?? "",
        }}
      />
    </>
  );
}
