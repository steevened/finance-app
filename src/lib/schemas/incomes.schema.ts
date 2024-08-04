import { z } from "zod";
import { insertIncomeSchema } from "../db/schema";

export const createIncomeSchema = insertIncomeSchema
  .pick({
    name: true,
    amount: true,
    due: true,
  })
  .extend({
    name: z
      .string({
        required_error: "This field is required",
        invalid_type_error: "This field must be a string",
      })
      .min(2, "Name must be at least 2 characters long")
      .max(40, "Name must be at most 40 characters long"),
    amount: z.coerce
      .number({
        required_error: "This field is required",
        invalid_type_error: "This field must be a number",
      })
      .positive("Amount must be greater than 0")
      .gte(1, "Amount must be at least 1"),
    due: z
      .date({
        required_error: "This field is required",
        invalid_type_error: "This field must be a date",
      })
      .optional()
      .default(new Date()),
  });
