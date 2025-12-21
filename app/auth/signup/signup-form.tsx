"use client";

import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useActionState } from "react";
import { signUpAction } from "@/lib/actions";

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUpAction, {
    email: { value: "", error: undefined },
    firstName: { value: "", error: undefined },
    lastName: { value: "", error: undefined },
    password: { value: "", error: undefined },
    confirmPassword: { value: "", error: undefined },
    success: false,
  });

  return (
    <form action={formAction}>
      <FieldSet>
        <FieldLegend className="font-bold mb-6">
          Create your account
        </FieldLegend>
        <FieldDescription className="text-primary h-2 mb-4">
          {state.success
            ? "Account created successfully! Please check your email to verify your account."
            : "Provide details for your account"}
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="sample@gmail.com"
              defaultValue={state.email.value}
              required
            />
            <FieldDescription>{state.email.error}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>First name</FieldLabel>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="John"
              defaultValue={state.firstName.value}
              required
            />
            <FieldDescription>{state.firstName.error}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Last name</FieldLabel>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Doe"
              defaultValue={state.lastName.value}
              required
            />
            <FieldDescription>{state.lastName.error}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <FieldDescription>{state.password.error}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Confirm password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
            />
            <FieldDescription>{state.confirmPassword.error}</FieldDescription>
          </Field>
        </FieldGroup>
        <Button type="submit" disabled={pending}>
          {pending && <Spinner className="text-white w-5 h-5" />} Create account
        </Button>
      </FieldSet>
    </form>
  );
}
