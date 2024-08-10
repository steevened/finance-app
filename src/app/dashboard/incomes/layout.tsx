import { Separator } from "@/components/ui/separator";
import IncomeDialog from "./income-dialog";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <h3>Incomes</h3>
        <IncomeDialog origin="create" />
      </div>
      <Separator />
      <div>{children}</div>
    </div>
  );
}
