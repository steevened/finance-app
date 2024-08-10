import { Suspense } from "react";
import ExpensesTable from "./expenses-table";
import { Skeleton } from "@/components/ui/skeleton";
import DateRangeServer from "../components/date-range-server";

export default async function Page() {
  return (
    <div className="grid gap-3">
      <Suspense fallback={<Skeleton className="h-9 w-40" />}>
        <DateRangeServer />
      </Suspense>
      <ExpensesTable />
    </div>
  );
}
