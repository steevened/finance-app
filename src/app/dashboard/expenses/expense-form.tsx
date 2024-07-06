"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createExpense } from "@/lib/actions/expenses.actions";
import { updateIncome } from "@/lib/actions/incomes.actions";
import { createExpenseSchema } from "@/lib/schemas/expenses.schema";
import { Expense } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ExpenseForm({
  onCancel,
  oncompleted,
  initialExpense,
}: {
  onCancel: () => void;
  oncompleted: () => void;
  initialExpense?: Expense;
}) {
  type FormValues = z.infer<typeof createExpenseSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      name: initialExpense?.name ?? "",
      amount: initialExpense?.amount ?? undefined,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      if (initialExpense) {
        await updateIncome({
          incomeId: initialExpense.id,
          data,
        });
        toast.success("Income updated successfully!");
      } else {
        await createExpense(data);
        toast.success("Income added successfully!");
      }
      oncompleted();
    } catch (error) {
      toast.error("Failed to add income");
    }
  });

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter expense name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Enter expense amount"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      field.onChange(undefined);
                    } else {
                      field.onChange(parseFloat(value));
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button
            isLoading={form.formState.isSubmitting}
            loadingText={initialExpense ? "Updating expense" : "Adding expense"}
            disabled={form.formState.isSubmitting ||
              (initialExpense && !form.formState.isDirty)}
            type="submit"
          >
            Continue
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type="button"
            onClick={onCancel}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
