import { persist } from "zustand/middleware";
import { create } from "zustand";

export type FormData = {
  prompt: {
    value: string;
    error: string[];
  };
  currentSlide: {
    value: string;
    error: string[];
  };
};

export type ChatFormState = {
  formState: FormData;
  setField: (field: keyof FormData, data: string) => void;
  setError: (field: keyof FormData, error: string) => void;
};

export const useChatFormStore = create<ChatFormState>()(
  persist(
    (set) => ({
      formState: {
        prompt: {
          value: "",
          error: [],
        },
        currentSlide: {
          value: "",
          error: [],
        },
      },
      setField: (field, value) => {
        set((state) => ({
          ...state,
          formState: {
            ...state.formState,
            [field]: {
              ...state.formState[field],
              value,
            },
          },
        }));
      },
      setError: (field, error) =>
        set((state) => ({
          ...state,
          formState: {
            ...state.formState,
            [field]: {
              ...state.formState[field],
              error: [...state.formState[field].error, error],
            },
          },
        })),
    }),
    {
      name: "chat-form-state",
      partialize: (state) => ({
        promptFormState: state.formState,
      }),
    },
  ),
);
