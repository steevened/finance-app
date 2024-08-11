import { getBalance } from "@/lib/actions/balance.actions";
import { formatCurrency } from "@/lib/utils";

export default async function BalanceData(searchParams?: {
  from?: string;
  to?: string;
}) {
  const balance = await getBalance(searchParams);
  return <h2>{formatCurrency(balance)}</h2>;
}
