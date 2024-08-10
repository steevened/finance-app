import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyExpenses } from "@/lib/actions/expenses.actions";
import { formatCurrency } from "@/lib/utils";
import ExpenseDropdown from "./expense.dropdown";

export default async function ExpensesTable() {
  const myExpenses = await getMyExpenses();
  return (
    <div className="border rounded-lg">
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
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
          {myExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.name}</TableCell>
              <TableCell>{expense.createdAt.toDateString()}</TableCell>
              <TableCell>
                {expense?.due?.toDateString() || new Date().toDateString()}
              </TableCell>

              <TableCell className="text-right">
                {formatCurrency(Number(expense.amount))}
              </TableCell>
              <TableCell className="text-right">
                <ExpenseDropdown expense={expense} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
