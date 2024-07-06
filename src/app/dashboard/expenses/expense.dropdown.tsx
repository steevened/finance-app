"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteExpense } from "@/lib/actions/expenses.actions";
import { Expense } from "@/lib/types";
import { useUIStore } from "@/store/ui.store";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Pen, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ExpenseDropdown({ expense }: {
  expense: Expense;
}) {
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const onConfirmDelete = async () => {
    await deleteExpense(expense.id);
    toast.success("Expense has been deleted successfully!");
  };

  const {
    setExpensesDialog,
    setActiveExpense,
  } = useUIStore();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => {
                setExpensesDialog(true);
                setActiveExpense(expense);
              }}
            >
              <span className="flex items-center justify-between w-full">
                Edit
                <Pen className="size-4" />
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setConfirmDeleteOpen(true)}
            >
              <span className="flex items-center justify-between w-full">
                Delete
                <Trash className="size-4" />
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isConfirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this expense?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
