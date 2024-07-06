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
import AddIncomeForm from "./add-income-form";
import { useState } from "react";

export default function AddIncomeDialog() {
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  return (
    <Dialog
      open={isAddIncomeModalOpen}
      onOpenChange={setIsAddIncomeModalOpen}
    >
      <DialogTrigger asChild>
        <Button>
          Add Income
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Income
          </DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new income.
          </DialogDescription>
        </DialogHeader>
        <div>
          <AddIncomeForm
            onCancel={() => setIsAddIncomeModalOpen(false)}
            oncompleted={() => setIsAddIncomeModalOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
