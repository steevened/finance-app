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

export default function AddIncomeDialog() {
  return (
    <Dialog>
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
          add income form
        </div>
      </DialogContent>
    </Dialog>
  );
}
