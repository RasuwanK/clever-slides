import { Database } from "@/lib/supabase/database.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Draft = Database["public"]["Tables"]["Presentation"]["Row"];

type DraftState = {
  draft: Draft | null;
};

type DraftActions = {
  setDraft: (draft: Draft) => void;
};

export const useDraftStore = create<DraftState & DraftActions>()(
  persist(
    (set, get) => ({
      draft: null,
      setDraft: (draft: Draft) => set({ draft }),
    }),
    {
      name: "draft",
      partialize: (state) => ({
        draft: state.draft,
      }),
    }
  )
);
