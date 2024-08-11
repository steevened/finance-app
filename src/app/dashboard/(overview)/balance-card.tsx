import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Scale } from "lucide-react";
import { Suspense } from "react";
import BalanceData from "./balance-data";

export default function BalanceCard(searchParams?: {
  from?: string;
  to?: string;
}) {
  return (
    <Card className={cn("duration-200 transition-colors bg-background")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-sky-500">
            <Scale className="size-5" />
          </span>
          Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-28 h-8 bg-primary/10" />}>
          <BalanceData {...searchParams} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
