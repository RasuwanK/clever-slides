export type Field = {
  value: string;
  error?: string;
};

export type SignUpFormState = {
  success: boolean;
  message?: string;
  email: Field;
  firstName: Field;
  lastName: Field;
  password: Field;
  confirmPassword: Field;
};

export type SignInFormState = {
  success: boolean;
  message?: string;
  email: Field;
  password: Field;
};

export type PromptFormState = {
  message: Field;
};
