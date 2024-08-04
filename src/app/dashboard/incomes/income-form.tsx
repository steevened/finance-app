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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createIncome, updateIncome } from "@/lib/actions/incomes.actions";
import { createIncomeSchema } from "@/lib/schemas/incomes.schema";
import { Income } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";

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
      amount: Number(initialIncome?.amount) || undefined,
      due: initialIncome?.due as Date,
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
                <Input placeholder="Enter income name" {...field} />
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
                <Input {...field} placeholder="Enter income amount" />
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
            loadingText={initialIncome ? "Updating income" : "Adding income"}
            disabled={
              form.formState.isSubmitting ||
              (initialIncome && !form.formState.isDirty)
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
