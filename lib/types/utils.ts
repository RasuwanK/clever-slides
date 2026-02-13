import { Database } from "@/lib/types/database.types";

export type PresentationRow =
  Database["public"]["Tables"]["Presentation"]["Row"];
export type PresentationInsert =
  Database["public"]["Tables"]["Presentation"]["Insert"];
export type PresentationUpdate =
  Database["public"]["Tables"]["Presentation"]["Update"];

export type DocumentInsert =
  Database["public"]["Tables"]["Documents"]["Insert"];

export type PresentationDraft = Pick<
  Database["public"]["Tables"]["Presentation"]["Row"],
  "id" | "created_at"
>;

export type ChatInsert = Database["public"]["Tables"]["Chat"]["Insert"];
export type MessageInsert = Database["public"]["Tables"]["Messages"]["Insert"];

export interface User {
  id?: string;
  name?: string;
  email?: string;
  avatar_url?: string;
}

export type GeneratedContent = {
  title: string;
  theme: {
    accentColor: string;
    background: "light" | "dark";
  };
  slides: [
    {
      id: string;
      layout:
        | "title_center"
        | "title_left_bullets_right"
        | "title_top_bullets_bottom"
        | "two_column";
      title: string;
      content?: {
        position: "top" | "left" | "right" | "bottom";
        bullets: ["string"];
      }[];
    },
  ];
};
