import ExpenseDialog from "./expense-dialog";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between">
        <h2>Expenses</h2>
        <ExpenseDialog origin="create" />
      </div>
      <div className="h-[1px] bg-border" />
      <div>
        {children}
      </div>
    </div>
  );
}
