import { getTotalExpenses } from "@/lib/actions/expenses.actions";
import { formatCurrency } from "@/lib/utils";

export default async function ExpensesCardData() {
  const totalExpenses = await getTotalExpenses();
  return <h2>{formatCurrency(totalExpenses)}</h2>;
}
