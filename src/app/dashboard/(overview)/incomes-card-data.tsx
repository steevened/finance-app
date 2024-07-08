import { getTotalIncomes } from "@/lib/actions/incomes.actions";
import { formatCurrency } from "@/lib/utils";

export default async function IncomesCardData() {
  const totalIncomes = await getTotalIncomes();
  return <h2>{formatCurrency(totalIncomes)}</h2>;
}
