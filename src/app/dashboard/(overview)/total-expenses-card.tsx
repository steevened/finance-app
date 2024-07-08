import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { Suspense } from "react";
import ExpensesCardData from "./expenses-card-data";

export default function TotalExpensesCard({
  mode,
}: {
  mode?: string;
}) {
  return (
    <Card
      className={cn(
        "duration-200 transition-colors",
        mode && mode === "spent" ? "bg-muted" : "bg-card",
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>
            <ArrowDown className="size-5" />
          </span>
          Spent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div className="w-28 h-8 bg-primary/10" />}>
          <ExpensesCardData />
        </Suspense>
      </CardContent>
    </Card>
  );
}
