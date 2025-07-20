export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          permissions: Json | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          last_login?: string | null
          permissions?: Json | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          permissions?: Json | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          budget_range: string | null
          created_at: string | null
          email: string
          event_date: string | null
          event_type: string | null
          id: string
          is_read: boolean | null
          message: string | null
          name: string
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          budget_range?: string | null
          created_at?: string | null
          email: string
          event_date?: string | null
          event_type?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          name: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          budget_range?: string | null
          created_at?: string | null
          email?: string
          event_date?: string | null
          event_type?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      images: {
        Row: {
          alt_text: string | null
          category: string
          created_at: string | null
          display_order: number | null
          featured: boolean | null
          filename: string
          id: string
          is_active: boolean | null
          tags: string[] | null
          updated_at: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          category: string
          created_at?: string | null
          display_order?: number | null
          featured?: boolean | null
          filename: string
          id?: string
          is_active?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          category?: string
          created_at?: string | null
          display_order?: number | null
          featured?: boolean | null
          filename?: string
          id?: string
          is_active?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      offers: {
        Row: {
          background_color: string | null
          banner_image_url: string | null
          click_count: number | null
          created_at: string | null
          description: string | null
          discount_amount: number | null
          discount_percentage: number | null
          display_order: number | null
          end_date: string | null
          id: string
          is_active: boolean | null
          offer_type: string
          start_date: string | null
          text_color: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          background_color?: string | null
          banner_image_url?: string | null
          click_count?: number | null
          created_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          offer_type: string
          start_date?: string | null
          text_color?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          background_color?: string | null
          banner_image_url?: string | null
          click_count?: number | null
          created_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          offer_type?: string
          start_date?: string | null
          text_color?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      photos: {
        Row: {
          alt_text: string | null
          category_id: string | null
          created_at: string | null
          description: string | null
          dimensions: Json | null
          display_order: number | null
          file_size: number | null
          id: string
          image_url: string
          is_active: boolean | null
          is_featured: boolean | null
          metadata: Json | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          alt_text?: string | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          display_order?: number | null
          file_size?: number | null
          id?: string
          image_url: string
          is_active?: boolean | null
          is_featured?: boolean | null
          metadata?: Json | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          alt_text?: string | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          display_order?: number | null
          file_size?: number | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          metadata?: Json | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photos_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_plans: {
        Row: {
          billing_cycle: string | null
          button_link: string | null
          button_text: string | null
          created_at: string | null
          currency: string | null
          display_order: number | null
          features: Json
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          original_price: number | null
          plan_name: string
          plan_type: string
          price: number
          updated_at: string | null
        }
        Insert: {
          billing_cycle?: string | null
          button_link?: string | null
          button_text?: string | null
          created_at?: string | null
          currency?: string | null
          display_order?: number | null
          features: Json
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          original_price?: number | null
          plan_name: string
          plan_type: string
          price: number
          updated_at?: string | null
        }
        Update: {
          billing_cycle?: string | null
          button_link?: string | null
          button_text?: string | null
          created_at?: string | null
          currency?: string | null
          display_order?: number | null
          features?: Json
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          original_price?: number | null
          plan_name?: string
          plan_type?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          site_name: string | null
          social_links: Json | null
          updated_at: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          site_name?: string | null
          social_links?: Json | null
          updated_at?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          site_name?: string | null
          social_links?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_image_url: string | null
          client_name: string
          created_at: string | null
          display_order: number | null
          event_type: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          location: string | null
          rating: number | null
          review_text: string
          updated_at: string | null
        }
        Insert: {
          client_image_url?: string | null
          client_name: string
          created_at?: string | null
          display_order?: number | null
          event_type?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          rating?: number | null
          review_text: string
          updated_at?: string | null
        }
        Update: {
          client_image_url?: string | null
          client_name?: string
          created_at?: string | null
          display_order?: number | null
          event_type?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          rating?: number | null
          review_text?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      videos: {
        Row: {
          category_id: string | null
          created_at: string | null
          custom_thumbnail_url: string | null
          description: string | null
          display_order: number | null
          duration: string | null
          home_display_section: string | null
          id: string
          is_featured: boolean | null
          is_home_featured: boolean | null
          title: string
          updated_at: string | null
          view_count: number | null
          youtube_id: string
          youtube_url: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          custom_thumbnail_url?: string | null
          description?: string | null
          display_order?: number | null
          duration?: string | null
          home_display_section?: string | null
          id?: string
          is_featured?: boolean | null
          is_home_featured?: boolean | null
          title: string
          updated_at?: string | null
          view_count?: number | null
          youtube_id: string
          youtube_url: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          custom_thumbnail_url?: string | null
          description?: string | null
          display_order?: number | null
          duration?: string | null
          home_display_section?: string | null
          id?: string
          is_featured?: boolean | null
          is_home_featured?: boolean | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
          youtube_id?: string
          youtube_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      youtube_videos: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          display_order: number | null
          duration: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          tags: string[] | null
          thumbnail_hq_url: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          view_count: number | null
          youtube_id: string
          youtube_url: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          duration?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          tags?: string[] | null
          thumbnail_hq_url?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
          youtube_id: string
          youtube_url: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          duration?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          tags?: string[] | null
          thumbnail_hq_url?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
          youtube_id?: string
          youtube_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extract_youtube_id: {
        Args: { url: string }
        Returns: string
      }
      get_all_images: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          filename: string
          category: string
          url: string
          alt_text: string
          featured: boolean
          created_at: string
        }[]
      }
      get_featured_images: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          filename: string
          category: string
          url: string
          alt_text: string
        }[]
      }
      get_images_by_category: {
        Args: { category_name: string }
        Returns: {
          id: string
          filename: string
          category: string
          url: string
          alt_text: string
          featured: boolean
          created_at: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
