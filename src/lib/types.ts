import { getMyIncomes } from "./services/incomes.services";

export type Income = Awaited<ReturnType<typeof getMyIncomes>>[number]