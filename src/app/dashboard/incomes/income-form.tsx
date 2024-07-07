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
import { createIncome, updateIncome } from "@/lib/actions/incomes.actions";
import { createIncomeSchema } from "@/lib/schemas/incomes.schema";
import { Income } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function IncomeForm({
  onCancel,
  oncompleted,
  initialIncome,
}: {
  onCancel: () => void;
  oncompleted: () => void;
  initialIncome?: Income;
}) {
  type FormValues = z.infer<typeof createIncomeSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(createIncomeSchema),
    defaultValues: {
      name: initialIncome?.name ?? "",
      amount: initialIncome?.amount ?? undefined,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      if (initialIncome) {
        await updateIncome({
          incomeId: initialIncome.id,
          data,
        });
        toast.success("Income updated successfully!");
      } else {
        await createIncome(data);
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
                  placeholder="Enter income name"
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
                  {
                    // type="number"
                    ...field
                  }
                  placeholder="Enter income amount"
                  // value={field.value ?? ""}
                  // onChange={(e) => {
                  //   const value = e.target.value;
                  //   if (value === "") {
                  //     field.onChange(undefined);
                  //   } else {
                  //     field.onChange(parseFloat(value));
                  //   }
                  // }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button
            isLoading={form.formState.isSubmitting}
            loadingText={initialIncome ? "Updating income" : "Adding income"}
            disabled={form.formState.isSubmitting ||
              (initialIncome && !form.formState.isDirty)}
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
