import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { Suspense } from "react";
import IncomesCardData from "./incomes-card-data";

export default function TotalIncomesCard({
  selected,
}: {
  selected?: boolean;
}) {
  return (
    <Card
      className={cn(
        "duration-200 transition-colors",
        selected ? "bg-accent" : "bg-card",
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>
            <ArrowUp className="size-5" />
          </span>
          Received
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-28 h-8 bg-primary/10" />}>
          <IncomesCardData />
          {/* <Skeleton className="w-28 h-8 bg-primary/10" /> */}
        </Suspense>
      </CardContent>
    </Card>
  );
}
