import ExpensesTable from "./expenses-table";

export default async function Page() {
  return (
    <div className="grid gap-6">
      <ExpensesTable />
    </div>
  );
}
