"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  return (
    <form>
      <FieldSet>
        <FieldLegend className="font-bold mb-6">Sign in to your account</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="sample@gmail.com"
              required
            />
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </Field>
          <Button>Sign in</Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
