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
import { account, insertIncomeSchema } from "@/lib/db/schema";
import { createIncomeSchema } from "@/lib/schemas/incomes.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { createIncome } from "@/lib/actions/incomes.actions";

export default function AddIncomeForm({
  onCancel,
  oncompleted,
}: {
  onCancel: () => void;
  oncompleted: () => void;
}) {
  type FormValues = z.infer<typeof createIncomeSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(createIncomeSchema),
    defaultValues: {
      name: "",
      amount: undefined,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createIncome(data);
      toast.success("Income added successfully");
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
                  type="number"
                  {...field}
                  placeholder="Enter income amount"
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
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            Add Income
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
