import { Separator } from "@/components/ui/separator";
import IncomeDialog from "./income-dialog";
import IncomesTable from "./incomes-table";

export default async function Page() {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between">
        <h2>Incomes</h2>
        <IncomeDialog />
      </div>
      <Separator className="bg-foreground/10" />
      <IncomesTable />
    </div>
  );
}
