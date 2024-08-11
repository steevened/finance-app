import { getTotalIncomes } from "@/lib/actions/incomes.actions";
import { formatCurrency } from "@/lib/utils";

export default async function IncomesCardData(searchParams?: {
  from?: string;
  to?: string;
}) {
  const totalIncomes = await getTotalIncomes(searchParams);
  return <h2>{formatCurrency(totalIncomes)}</h2>;
}
