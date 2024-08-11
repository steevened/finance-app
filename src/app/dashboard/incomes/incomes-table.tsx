import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyIncomes } from "@/lib/actions/incomes.actions";
import { formatCurrency } from "@/lib/utils";
import IncomeDropdown from "./income-dropdown";

export default async function IncomesTable({
  searchParams,
}: {
  searchParams: {
    from?: string;
    to?: string;
  };
}) {
  const myIncomes = await getMyIncomes(searchParams);
  return (
    <div className="border rounded-lg">
      <Table>
        {/* <TableCaption>A list of your recent incomes.</TableCaption> */}
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
    </div>
  );
}
