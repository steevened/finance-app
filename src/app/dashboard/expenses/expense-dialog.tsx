"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUIStore } from "@/store/ui.store";
import ExpenseForm from "./expense-form";

export default function ExpenseDialog({
  origin,
}: {
  origin: "create" | "update";
}) {
  const {
    isExpensesDialogOpen,
    setExpensesDialog,
    activeExpense,
    setActiveExpense,
  } = useUIStore();

  const onCloseDialog = (open: boolean) => {
    setExpensesDialog(open);
    setActiveExpense(undefined);
  };
  return (
    <Dialog
      open={isExpensesDialogOpen}
      onOpenChange={onCloseDialog}
    >
      <DialogTrigger asChild>
        <Button>
          {activeExpense && origin === "update"
            ? "Update expense"
            : "Add expense"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {activeExpense ? "Update expense" : "Add expense"}
          </DialogTitle>
          <DialogDescription>
            {activeExpense
              ? "Click the button below to update the expense."
              : " Fill in the form below to add a new expense."}
          </DialogDescription>
        </DialogHeader>
        <div>
          <ExpenseForm
            origin={origin}
            onCancel={() => setExpensesDialog(false)}
            oncompleted={() => setExpensesDialog(false)}
            initialExpense={activeExpense}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
