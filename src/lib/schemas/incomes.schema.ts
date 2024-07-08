import { z } from "zod";
import { insertIncomeSchema } from "../db/schema";

export const createIncomeSchema = insertIncomeSchema
    .pick({
        name: true,
        amount: true,
    })
    .extend({
        name: z.string({
            required_error: "This field is required",
            invalid_type_error: "This field must be a string",
        }).min(2, "Name must be at least 2 characters long").max(
            40,
            "Name must be at most 40 characters long",
        ),
        amount: z.coerce.number({
            required_error: "This field is required",
            invalid_type_error: "This field must be a number",
        }).positive("Amount must be greater than 0").gte(
            1,
            "Amount must be at least 1",
        ),

    });



// .parse({
//     name: z.string().min(20),
//     amount: z.coerce.number().positive().min(1000)
// })

// .refine((data) => {
//     if (!data.name) {
//         return false;
//     }
//     return true;
// }, {
//     message: "Name is required",
//     path: ["name"],
// }).refine((data) => {
//     if (data.name && data.name.length < 3 || data.name.length > 40) {
//         return false;
//     }
//     return true;
// }, {
//     message: "Name must be between 3 and 40 characters",
//     path: ["name"],
// })
// .refine((data) => {
//     if (!data.amount) {
//         return false;
//     }
//     return true;
// }, {
//     message: "Amount is required",
//     path: ["amount"],
// })
// .refine((data) => {
//     if (data.amount && data.amount <= 0) {
//         return false;
//     }
//     return true;
// }, {
//     message: "Amount must be greater than 0",
//     path: ["amount"],
// });
