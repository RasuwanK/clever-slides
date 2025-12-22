import { z } from "zod";

export const SlideSchema = z.object({
  layout: z.string(),
  title: z.string(),
  bullets: z.array(z.string()),
});

export const PresentationSchema = z.object({
  theme: z.object({
    accentColor: z.string(),
    background: z.enum(["light", "dark"]),
  }),
  slides: z.array(SlideSchema),
});

export const SignUpSchema = z
  .object({
    email: z.email("Invalid email address"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export const SignInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});
