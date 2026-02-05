import { persist } from "zustand/middleware";
import { create } from "zustand";

export type FormData = { prompt: string; width: number; height: number };
export type FormErrors = {
  prompt?: string;
  width?: string;
  height?: string;
};

export type PromptFormState = {
  formState: FormData;
  errors: FormErrors | null;
  setField: (field: keyof FormData, value: string | number) => void;
  setError: (field: keyof FormData, error: string | null) => void;
};

export const usePromptFormStore = create<PromptFormState>()(
  persist(
    (set) => ({
      formState: {
        prompt: "",
        width: 1024,
        height: 720,
      },
      setField: (field, value) => {
        set((state) => ({
          ...state,
          formState: {
            ...state.formState,
            [field]: value,
          },
        }));
      },
      setError: (field, error) =>
        set((state) => ({
          ...state,
          errors: {
            ...state.errors,
            [field]: error,
          },
        })),
      errors: null,
    }),
    {
      name: "prompt-form-state",
      partialize: (state) => ({
        promptFormState: state.formState,
      }),
    },
  ),
);
