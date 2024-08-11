import { getBalance } from "@/lib/actions/balance.actions";
import { formatCurrency } from "@/lib/utils";

export default async function BalanceResumen(searchParams?: {
  from?: string;
  to?: string;
}) {
  const balance = await getBalance(searchParams);
  return (
    <div>
      <small>Today</small>
      <h2>{formatCurrency(balance)}</h2>
    </div>
  );
}
