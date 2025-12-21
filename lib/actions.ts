"use server";

import { success, z } from "zod";
import { createClient } from "./supabase/server";

type Field = {
  value: string;
  error?: string;
};

export type SignUpFormState = {
  success: boolean;
  email: Field;
  firstName: Field;
  lastName: Field;
  password: Field;
  confirmPassword: Field;
};

const SignUpSchema = z.object({
  email: z.email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Confirm Password must be at least 8 characters long"),
});

export async function signUpAction(
  initialState: SignUpFormState,
  formData: FormData
) {
  const rawFormData = {
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validatedData = SignUpSchema.safeParse(rawFormData);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;
    console.log("Validation error:", errors);
    return {
      ...initialState,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: validatedData.data.email,
    password: validatedData.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    },
  });

  if (error) {
    console.log("Supabase sign-up error:", error.message);

    return {
      ...initialState,
    };
  }

  console.log("User signed up successfully:", data.user);

  return {
      ...initialState,
      success: true,
  };
}
