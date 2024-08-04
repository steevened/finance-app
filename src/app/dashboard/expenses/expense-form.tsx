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
import { createExpense, updateExpense } from "@/lib/actions/expenses.actions";
import { createExpenseSchema } from "@/lib/schemas/expenses.schema";
import { Expense } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function ExpenseForm({
  onCancel,
  oncompleted,
  initialExpense,
  origin,
}: {
  onCancel: () => void;
  oncompleted: () => void;
  initialExpense?: Expense;
  origin: "create" | "update";
}) {
  type FormValues = z.infer<typeof createExpenseSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      name: initialExpense?.name ?? "",
      amount: Number(initialExpense?.amount) || undefined,
      due: initialExpense?.due as Date,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      if (initialExpense) {
        await updateExpense({
          expenseId: initialExpense.id,
          data,
        });
        toast.success("Expense updated successfully!");
      } else {
        await createExpense(data);
        toast.success("Expense added successfully!");
      }
      oncompleted();
    } catch (error) {
      toast.error("Failed to add expense");
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
                <Input placeholder="Enter expense name" {...field} />
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
                <Input {...field} placeholder="Enter expense amount" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="due"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button
            isLoading={form.formState.isSubmitting}
            loadingText={initialExpense ? "Updating expense" : "Adding expense"}
            disabled={
              form.formState.isSubmitting ||
              (initialExpense && !form.formState.isDirty)
            }
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
