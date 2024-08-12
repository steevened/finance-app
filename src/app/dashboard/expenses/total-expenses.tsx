import { getTotalExpenses } from "@/lib/actions/expenses.actions";
import { formatCurrency } from "@/lib/utils";

export default async function TotalExpenses({
  searchParams,
}: {
  searchParams: {
    from?: string;
    to?: string;
  };
}) {
  const total = await getTotalExpenses(searchParams);
  return (
    <div className="text-end leading-3">
      <small className="text-muted-foreground">Total</small>
      <h5>{formatCurrency(total)}</h5>
    </div>
  );
}
