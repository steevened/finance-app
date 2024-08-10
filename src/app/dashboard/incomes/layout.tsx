import { Separator } from "@/components/ui/separator";
import { DateRangePicker } from "../components/date-range-picker";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DateRangeServer from "./date-range-server";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h3>Incomes</h3>
        {/* <Suspense fallback={<Skeleton className="h-9 w-40" />}>
          <DateRangeServer />
        </Suspense> */}
        {/* <IncomeDialog origin="create" /> */}
      </div>
      <Separator />
      <div>{children}</div>
    </div>
  );
}
