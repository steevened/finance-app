import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getBalance } from "@/lib/actions/balance.actions";
import { cn } from "@/lib/utils";
import { Scale } from "lucide-react";
import { Suspense } from "react";
import BalanceData from "./balance-data";

export default function BalanceCard({
  mode,
}: {
  mode?: string;
}) {
  return (
    <Card
      className={cn(
        "duration-200 transition-colors",
        !mode ? "bg-muted" : "bg-card",
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>
            <Scale className="size-5" />
          </span>
          Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-28 h-8 bg-primary/10" />}>
          <BalanceData />
        </Suspense>
      </CardContent>
    </Card>
  );
}
