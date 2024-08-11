"use server";

import { getTotalExpenses } from "./expenses.actions";
import { getTotalIncomes } from "./incomes.actions";

export async function getBalance(searchParams?: {
  from?: string;
  to?: string;
}) {
  const totalIncomes = await getTotalIncomes(searchParams);

  const totalExpenses = await getTotalExpenses(searchParams);

  return totalIncomes - totalExpenses;
}
