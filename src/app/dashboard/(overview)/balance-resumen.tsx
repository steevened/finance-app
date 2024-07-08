import { getBalance } from "@/lib/actions/balance.actions";
import { formatCurrency } from "@/lib/utils";

export default async function BalanceResumen() {
  const balance = await getBalance();
  return (
    <div className="text-end">
      <small>
        Today
      </small>
      <h2>{formatCurrency(balance)}</h2>
    </div>
  );
}
