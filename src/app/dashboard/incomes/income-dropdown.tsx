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
import { deleteIncome } from "@/lib/actions/incomes.actions";
import { Income } from "@/lib/types";
import { useUIStore } from "@/store/ui.store";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Pen, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function IncomeDropdown({ income }: {
  income: Income;
}) {
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const onConfirmDelete = async () => {
    await deleteIncome(income.id);
    toast.success("Income has been deleted successfully!");
  };

  const {
    setIncomesDialog,
    setActiveIncome,
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
                setIncomesDialog(true);
                setActiveIncome(income);
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
              Are you sure you want to delete this income?
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
