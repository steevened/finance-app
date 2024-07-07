import { Separator } from "@radix-ui/react-separator";
import IncomeDialog from "./income-dialog";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between">
        <h2>Incomes</h2>
        <IncomeDialog origin="create" />
      </div>
      <div className="h-[1px] bg-border" />
      <div>
        {children}
      </div>
    </div>
  );
}
