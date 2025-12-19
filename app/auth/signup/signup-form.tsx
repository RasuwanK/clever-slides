import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  Field,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignUpForm() {
  return (
    <form>
      <FieldSet>
        <FieldLegend className="font-bold mb-6">
          Create your account
        </FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="sample@gmail.com"
              required
            />
          </Field>
          <Field>
            <FieldLabel>First name</FieldLabel>
            <Input
              id="first-name"
              type="text"
              name="fist-name"
              placeholder="John"
              required
            />
          </Field>
          <Field>
            <FieldLabel>Last name</FieldLabel>
            <Input
              id="last-name"
              type="text"
              name="last-name"
              placeholder="Doe"
              required
            />
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
          </Field>
          <Field>
            <FieldLabel>Confirm password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              name="confirm-password"
              placeholder="Confirm password"
              required
            />
          </Field>
        </FieldGroup>
        <Button>Create account</Button>
      </FieldSet>
    </form>
  );
}
