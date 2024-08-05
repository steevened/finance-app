"use server";

import { getTotalExpenses } from "./expenses.actions";
import { getTotalIncomes } from "./incomes.actions";

export async function getBalance() {
  // try {
  const totalIncomes = await getTotalIncomes();

  const totalExpenses = await getTotalExpenses();

  return totalIncomes - totalExpenses;
  // } catch (error) {
  //   console.log(error);
  //   throw new Error();
  // }
}
