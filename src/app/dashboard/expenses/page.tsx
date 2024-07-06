import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getMyExpenses } from "@/lib/actions/expenses.actions";
import ExpenseDialog from "./expense-dialog";

export default async function Page() {
  const myExpenses = await getMyExpenses();
  return (
    <div className="grid gap-6">
      <div className="flex justify-between">
        <h2>Expenses</h2>
        <ExpenseDialog />
      </div>
      <Separator />

      {JSON.stringify(myExpenses)}
    </div>
  );
}
