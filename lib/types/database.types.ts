export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      Account: {
        Row: {
          address: string | null
          country: string | null
          created_at: string
          date_of_birth: string | null
          first_name: string
          id: string
          institution: string | null
          is_deleted: boolean
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          first_name: string
          id: string
          institution?: string | null
          is_deleted?: boolean
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          first_name?: string
          id?: string
          institution?: string | null
          is_deleted?: boolean
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      Chat: {
        Row: {
          belongs_to: string | null
          created_at: string
          id: string
          main_prompt: string
        }
        Insert: {
          belongs_to?: string | null
          created_at?: string
          id: string
          main_prompt: string
        }
        Update: {
          belongs_to?: string | null
          created_at?: string
          id?: string
          main_prompt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Chat_belongs_to_fkey"
            columns: ["belongs_to"]
            isOneToOne: false
            referencedRelation: "Presentation"
            referencedColumns: ["id"]
          },
        ]
      }
      Documents: {
        Row: {
          belongs_to: string
          created_at: string
          id: string
          json_content: Json | null
          version: number
        }
        Insert: {
          belongs_to?: string
          created_at?: string
          id?: string
          json_content?: Json | null
          version?: number
        }
        Update: {
          belongs_to?: string
          created_at?: string
          id?: string
          json_content?: Json | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "Documents_belongs_to_fkey"
            columns: ["belongs_to"]
            isOneToOne: false
            referencedRelation: "Presentation"
            referencedColumns: ["id"]
          },
        ]
      }
      Messages: {
        Row: {
          chat: string
          created_at: string
          id: string
          message: Json | null
          replying_to: string | null
          role: string | null
          sent_by: string
        }
        Insert: {
          chat: string
          created_at?: string
          id: string
          message?: Json | null
          replying_to?: string | null
          role?: string | null
          sent_by?: string
        }
        Update: {
          chat?: string
          created_at?: string
          id?: string
          message?: Json | null
          replying_to?: string | null
          role?: string | null
          sent_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "Messages_chat_fkey"
            columns: ["chat"]
            isOneToOne: false
            referencedRelation: "Chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Messages_replying_to_fkey"
            columns: ["replying_to"]
            isOneToOne: false
            referencedRelation: "Chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Messages_sent_by_fkey"
            columns: ["sent_by"]
            isOneToOne: false
            referencedRelation: "Account"
            referencedColumns: ["id"]
          },
        ]
      }
      Presentation: {
        Row: {
          chat: string | null
          created_at: string
          created_by: string | null
          id: string
          is_deleted: boolean
          status: Database["public"]["Enums"]["status"]
          updated_at: string | null
        }
        Insert: {
          chat?: string | null
          created_at?: string
          created_by?: string | null
          id: string
          is_deleted?: boolean
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string | null
        }
        Update: {
          chat?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_deleted?: boolean
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Presentation_chat_fkey"
            columns: ["chat"]
            isOneToOne: false
            referencedRelation: "Presentation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Presentation_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "Account"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      status: "published" | "draft" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      status: ["published", "draft", "archived"],
    },
  },
} as const
