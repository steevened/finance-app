import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyIncomes } from "@/lib/services/incomes.services";
import { formatCurrency } from "@/lib/utils";

import IncomeDropdown from "./income-dropdown";

export default async function IncomesTable() {
  const myIncomes = await getMyIncomes();
  return (
    <Table>
      <TableCaption>A list of your recent incomes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {myIncomes.map((income) => (
          <TableRow key={income.id}>
            <TableCell className="font-medium">{income.name}</TableCell>
            <TableCell>{income.createdAt.toDateString()}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(income.amount || 0)}
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
