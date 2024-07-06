import { Separator } from "@/components/ui/separator";
import ExpenseDialog from "./expense-dialog";
import ExpensesTable from "./expenses-table";

export default async function Page() {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between">
        <h2>Expenses</h2>
        <ExpenseDialog origin="create" />
      </div>
      <Separator />

      <ExpensesTable />
    </div>
  );
}
