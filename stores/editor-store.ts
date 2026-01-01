import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Content } from "@/lib/utils";

interface EditorState {
  slides: Content | null;
  isDirty: boolean;
  lastSavedAt: number | null;

  setSlides: (slides: Content) => void;
  updateSlides: (updater: (prev: Content) => Content) => void;
  markSaved: () => void;
  reset: () => void;
}

// Whole editor wide state management with local saving
export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      slides: null,
      isDirty: false,
      lastSavedAt: null,

      setSlides: (slides) =>
        set({ slides, isDirty: false }),

      updateSlides: (updater) =>
        set((state) => ({
          slides: state.slides ? updater(state.slides) : state.slides,
          isDirty: true,
        })),

      markSaved: () =>
        set({
          isDirty: false,
          lastSavedAt: Date.now(),
        }),

      reset: () =>
        set({
          slides: null,
          isDirty: false,
          lastSavedAt: null,
        }),
    }),
    {
      name: "editor-draft", // 👈 localStorage key
      partialize: (state) => ({
        slides: state.slides,
      }),
    }
  )
);

