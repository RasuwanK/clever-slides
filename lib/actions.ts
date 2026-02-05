"use server";

import { createClient } from "./supabase/server";
import { SignUpSchema, SignInSchema } from "./schema";
import type { SignUpFormState, SignInFormState } from "@/lib/types/actions";

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
    return {
      success: false,
      message: "Invalid input data",
      email: { value: rawFormData.email as string, error: errors.email?.[0] },
      firstName: {
        value: rawFormData.firstName as string,
        error: errors.firstName?.[0],
      },
      lastName: {
        value: rawFormData.lastName as string,
        error: errors.lastName?.[0],
      },
      password: {
        value: rawFormData.password as string,
        error: errors.password?.[0],
      },
      confirmPassword: {
        value: rawFormData.confirmPassword as string,
        error: errors.confirmPassword?.[0],
      },
    };
  }

  const supabase = await createClient();

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: validatedData.data.email,
    password: validatedData.data.password,
    options: {
      data: {
        first_name: validatedData.data.firstName,
        last_name: validatedData.data.lastName,
      }
    }
  });

  if (signUpError) {
    return {
      message: signUpError.message,
      success: false,
      email: { value: rawFormData.email as string },
      firstName: { value: rawFormData.firstName as string },
      lastName: { value: rawFormData.lastName as string },
      password: { value: rawFormData.password as string },
      confirmPassword: { value: rawFormData.confirmPassword as string },
    };
  }

  return {
    ...initialState,
    success: true,
    message:
      "Sign-up successful! Please check your email to confirm your account.",
  };
}

export async function signInAction(
  initialState: SignInFormState,
  formData: FormData
) {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedData = SignInSchema.safeParse(rawFormData);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;
    console.log("Validation error:", errors);
    return {
      ...initialState,
      email: { value: rawFormData.email as string, error: errors.email?.[0] },
      password: {
        value: rawFormData.password as string,
        error: errors.password?.[0],
      },
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: validatedData.data.email,
    password: validatedData.data.password,
  });

  if (error) {
    return {
      ...initialState,
      email: { value: rawFormData.email as string },
      password: { value: rawFormData.password as string },
      message: error.message,
      success: false,
    };
  }

  return {
    ...initialState,
    success: true,
    message: "Sign-in successful!",
  };
}
