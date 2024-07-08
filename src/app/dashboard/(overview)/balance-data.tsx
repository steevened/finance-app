import { getBalance } from "@/lib/actions/balance.actions";
import { formatCurrency } from "@/lib/utils";

export default async function BalanceData() {
  const balance = await getBalance();
  return <h2>{formatCurrency(balance)}</h2>;
}
