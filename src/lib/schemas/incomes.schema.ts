import { insertIncomeSchema } from "../db/schema";

export const createIncomeSchema = insertIncomeSchema
    .pick({
        name: true,
        amount: true,
    })
    .refine((data) => {
        if (!data.name) {
            return false;
        }
        return true;
    }, {
        message: "Name is required",
        path: ["name"],
    }).refine((data) => {
        if (data.name && data.name.length < 3 || data.name.length > 40) {
            return false;
        }
        return true;
    }, {
        message: "Name must be between 3 and 40 characters",
        path: ["name"],
    })
    .refine((data) => {
        if (!data.amount) {
            return false;
        }
        return true;
    }, {
        message: "Amount is required",
        path: ["amount"],
    })
    .refine((data) => {
        if (data.amount && data.amount <= 0) {
            return false;
        }
        return true;
    }, {
        message: "Amount must be greater than 0",
        path: ["amount"],
    });