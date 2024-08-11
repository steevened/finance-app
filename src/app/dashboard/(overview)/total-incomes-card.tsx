import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { Suspense } from "react";
import IncomesCardData from "./incomes-card-data";

export default function TotalIncomesCard(searchParams?: {
  from?: string;
  to?: string;
}) {
  return (
    <Card className={cn("duration-200 transition-colors bg-background")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-green-500">
            <ArrowUp className="size-5" />
          </span>
          Received
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-28 h-8 bg-primary/10" />}>
          <IncomesCardData {...searchParams} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
