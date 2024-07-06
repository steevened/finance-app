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
import AddIncomeForm from "./add-income-form";

export default function IncomeDialog() {
  const {
    isIncomesDialogOpen,
    setIncomesDialog,
    activeIncome,
    setActiveIncome,
  } = useUIStore();

  const onCloseDialog = (open: boolean) => {
    setIncomesDialog(open);
    setActiveIncome(undefined);
  };
  return (
    <Dialog
      open={isIncomesDialogOpen}
      onOpenChange={onCloseDialog}
    >
      <DialogTrigger asChild>
        <Button>
          {activeIncome ? "Update Income" : "Add Income"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Income
          </DialogTitle>
          <DialogDescription>
            {activeIncome
              ? "Click the button below to update the income."
              : " Fill in the form below to add a new income."}
          </DialogDescription>
        </DialogHeader>
        <div>
          <AddIncomeForm
            onCancel={() => setIncomesDialog(false)}
            oncompleted={() => setIncomesDialog(false)}
            initialIncome={activeIncome}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
