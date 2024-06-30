"use client";

import { Form } from "@/components/ui/form";
import { account, insertIncomeSchema } from "@/lib/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AddIncomeForm() {
  const schema = insertIncomeSchema
    .pick({
      name: true,
      amount: true,
    })
    .refine((data) => {
      if (data.name === "") {
        return false;
      }
    }, {
      message: "Name is required",
      path: ["name"],
    }).refine((data) => {
      if (data.name && data.name.length < 3 || data.name.length > 40) {
        return false;
      }
    }, {
      message: "Name must be between 3 and 40 characters",
      path: ["name"],
    })
    .refine((data) => {
      if (data.amount && data.amount <= 0) {
        return false;
      }
    }, {
      message: "Amount must be greater than 0",
      path: ["amount"],
    });
  type FormValues = z.infer<typeof schema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}></form>
    </Form>
  );
}
