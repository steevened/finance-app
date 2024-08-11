import { getTotalExpenses } from "@/lib/actions/expenses.actions";
import { formatCurrency } from "@/lib/utils";

export default async function ExpensesCardData(searchParams?: {
  from?: string;
  to?: string;
}) {
  const totalExpenses = await getTotalExpenses(searchParams);
  return <h2>{formatCurrency(totalExpenses)}</h2>;
}
