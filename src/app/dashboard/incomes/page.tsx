import { getMyIncomes } from "@/lib/services/incomes.services";
import AddIncomeDialog from "./add-income-dialog";
import { Separator } from "@/components/ui/separator";
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

export default async function Page() {
  const myIncomes = await getMyIncomes();
  return (
    <div className="grid gap-6">
      <div className="flex justify-between">
        <h2>Incomes</h2>
        <AddIncomeDialog />
      </div>
      <Separator className="bg-foreground/10" />
      <Table>
        <TableCaption>A list of your recent incomes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Amount</TableHead>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
