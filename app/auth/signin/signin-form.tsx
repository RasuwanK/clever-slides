"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useActionState } from "react";
import { signInAction } from "@/lib/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signInAction, {
    email: { value: "", error: undefined },
    password: { value: "", error: undefined },
    success: false,
    message: "",
  });
  return (
    <form action={formAction}>
      <FieldSet>
        <FieldLegend className="font-bold mb-6">Sign in to your account</FieldLegend>
        <FieldDescription className="text-foreground h-2 mb-4">
          {state.message}
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="sample@gmail.com"
              defaultValue={state.email.value}
              required
            />
            <FieldDescription>{state.email.error}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              defaultValue={state.password.value}
              required
            />
            <FieldDescription>{state.password.error}</FieldDescription>
          </Field>
          <Button type="submit" disabled={pending}>
            {pending ? <Spinner /> : "Sign in"}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
