import { getTotalIncomes } from "@/lib/actions/incomes.actions";
import { formatCurrency } from "@/lib/utils";

export default async function TotalIncomes({
  searchParams,
}: {
  searchParams: {
    from?: string;
    to?: string;
  };
}) {
  const total = await getTotalIncomes(searchParams);
  return (
    <div className="text-end leading-3">
      <small className="text-muted-foreground">Total</small>
      <h5>{formatCurrency(total)}</h5>
    </div>
  );
}
