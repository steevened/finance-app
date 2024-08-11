import { type ClassValue, clsx } from "clsx";
import { addDays, parse, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function extendsDateRange(params?: { from: string; to: string }) {
  const from = params?.from
    ? subDays(parse(params.from, "MM/dd/yyyy", new Date()), 1)
    : undefined;
  const to = params?.to
    ? addDays(parse(params.to, "MM/dd/yyyy", new Date()), 1)
    : undefined;

  return { from, to };
}
