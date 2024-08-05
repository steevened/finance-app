import { getMyExpenses } from "./actions/expenses.actions";
import { getMyIncomes } from "./actions/incomes.actions";

export type Income = Awaited<ReturnType<typeof getMyIncomes>>[number];

export type Expense = Awaited<ReturnType<typeof getMyExpenses>>[number];
