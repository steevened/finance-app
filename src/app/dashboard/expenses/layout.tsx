import { Separator } from "@/components/ui/separator";
import ExpenseDialog from "./expense-dialog";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-3">
      <div className="flex justify-between items-center">
        <h3>Expenses</h3>
        <ExpenseDialog origin="create" />
      </div>
      <Separator />
      <div>{children}</div>
    </div>
  );
}
