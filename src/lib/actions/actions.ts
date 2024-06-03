"use server";

import { z } from "zod";
import { insertUserSchema } from "../db/schema";
import { client } from "@/lib/client";

const userSchema = insertUserSchema.omit({
  id: true,
});

export const signIn = async (data: z.infer<typeof userSchema>) => {
  try {
    const response = await client.api.auth["sign-up"].$post({
      json: data,
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw new Error(error as string);
  }
};
