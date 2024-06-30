import { Button } from "@/components/ui/button";
import AddIncomeDialog from "./add-income-dialog";

export default function Page() {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between">
        <h2>Incomes</h2>
        <AddIncomeDialog />
      </div>
    </div>
  );
}
