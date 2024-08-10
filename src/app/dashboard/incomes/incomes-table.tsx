import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import IncomeDropdown from "./income-dropdown";
import { getMyIncomes } from "@/lib/actions/incomes.actions";
// import { dateParamsCache, searchParamsCache } from "@/lib/server";
import { createSearchParamsCache, parseAsString } from "nuqs/server"; // Note: import from 'nuqs/server' to avoid the "use client" directive

const dateParamsCache = createSearchParamsCache({
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
});

export default async function IncomesTable({
  searchParams,
}: {
  searchParams: {
    from?: string;
    to?: string;
  };
}) {
  console.log("rerrunning server");
  const parsedParams = dateParamsCache.parse(searchParams);
  const myIncomes = await getMyIncomes(parsedParams);
  return (
    <Table>
      <TableCaption>A list of your recent incomes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Due</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {myIncomes.map((income) => (
          <TableRow key={income.id}>
            <TableCell className="font-medium">{income.name}</TableCell>
            <TableCell>{income.createdAt.toDateString()}</TableCell>
            <TableCell>
              {income?.due?.toDateString() || new Date().toDateString()}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(income.amount ? parseInt(income.amount) : 0)}
            </TableCell>
            <TableCell className="text-right">
              <IncomeDropdown income={income} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
