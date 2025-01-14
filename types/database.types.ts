export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      category_translations: {
        Row: {
          category_id: string | null
          description: string | null
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          meta_description: string | null
          meta_title: string | null
          name: string
        }
        Insert: {
          category_id?: string | null
          description?: string | null
          id?: string
          language: Database["public"]["Enums"]["supported_language"]
          meta_description?: string | null
          meta_title?: string | null
          name: string
        }
        Update: {
          category_id?: string | null
          description?: string | null
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          meta_description?: string | null
          meta_title?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_translations_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      neighborhood_translations: {
        Row: {
          description: string | null
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          meta_description: string | null
          meta_title: string | null
          name: string
          neighborhood_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          language: Database["public"]["Enums"]["supported_language"]
          meta_description?: string | null
          meta_title?: string | null
          name: string
          neighborhood_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          neighborhood_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "neighborhood_translations_neighborhood_id_fkey"
            columns: ["neighborhood_id"]
            isOneToOne: false
            referencedRelation: "neighborhoods"
            referencedColumns: ["id"]
          },
        ]
      }
      neighborhoods: {
        Row: {
          created_at: string
          id: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      restaurant_categories: {
        Row: {
          category_id: string
          restaurant_id: string
        }
        Insert: {
          category_id: string
          restaurant_id: string
        }
        Update: {
          category_id?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_categories_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_translations: {
        Row: {
          address: string
          description: string | null
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          meta_description: string | null
          meta_title: string | null
          name: string
          restaurant_id: string | null
          schema_markup: Json | null
        }
        Insert: {
          address: string
          description?: string | null
          id?: string
          language: Database["public"]["Enums"]["supported_language"]
          meta_description?: string | null
          meta_title?: string | null
          name: string
          restaurant_id?: string | null
          schema_markup?: Json | null
        }
        Update: {
          address?: string
          description?: string | null
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          restaurant_id?: string | null
          schema_markup?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_translations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_type_translations: {
        Row: {
          description: string | null
          id: string
          language: string
          meta_description: string | null
          meta_title: string | null
          name: string
          type_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          language: string
          meta_description?: string | null
          meta_title?: string | null
          name: string
          type_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          language?: string
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_type_translations_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "restaurant_types"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_types: {
        Row: {
          created_at: string | null
          id: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      restaurant_types_junction: {
        Row: {
          restaurant_id: string
          type_id: string
        }
        Insert: {
          restaurant_id: string
          type_id: string
        }
        Update: {
          restaurant_id?: string
          type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_types_junction_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_types_junction_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "restaurant_types"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          accessibility_score: number | null
          airtable_id: string | null
          ambience_score: number | null
          created_at: string
          custom_score: number | null
          features: string[] | null
          food_score: number | null
          id: string
          image_url: string | null
          instagram_url: string | null
          last_updated: string | null
          latitude: number | null
          local_tips: string | null
          longitude: number | null
          menu_url: string | null
          neighborhood_id: string | null
          opening_hours: Json | null
          peak_hours: Json | null
          phone_number: string | null
          place_id: string | null
          postal_code: string | null
          price_range: string
          quiet_hours: Json | null
          rating: number | null
          recommended_group_size: string | null
          reservation_url: string | null
          restaurant_type: Database["public"]["Enums"]["restaurant_type"]
          review_count: number | null
          score_summary: string | null
          service_score: number | null
          signature_dishes: Json | null
          slug: string
          smart_visit: string | null
          status: string | null
          tagline: string | null
          updated_at: string
          value_score: number | null
          website_url: string | null
        }
        Insert: {
          accessibility_score?: number | null
          airtable_id?: string | null
          ambience_score?: number | null
          created_at?: string
          custom_score?: number | null
          features?: string[] | null
          food_score?: number | null
          id?: string
          image_url?: string | null
          instagram_url?: string | null
          last_updated?: string | null
          latitude?: number | null
          local_tips?: string | null
          longitude?: number | null
          menu_url?: string | null
          neighborhood_id?: string | null
          opening_hours?: Json | null
          peak_hours?: Json | null
          phone_number?: string | null
          place_id?: string | null
          postal_code?: string | null
          price_range: string
          quiet_hours?: Json | null
          rating?: number | null
          recommended_group_size?: string | null
          reservation_url?: string | null
          restaurant_type?: Database["public"]["Enums"]["restaurant_type"]
          review_count?: number | null
          score_summary?: string | null
          service_score?: number | null
          signature_dishes?: Json | null
          slug: string
          smart_visit?: string | null
          status?: string | null
          tagline?: string | null
          updated_at?: string
          value_score?: number | null
          website_url?: string | null
        }
        Update: {
          accessibility_score?: number | null
          airtable_id?: string | null
          ambience_score?: number | null
          created_at?: string
          custom_score?: number | null
          features?: string[] | null
          food_score?: number | null
          id?: string
          image_url?: string | null
          instagram_url?: string | null
          last_updated?: string | null
          latitude?: number | null
          local_tips?: string | null
          longitude?: number | null
          menu_url?: string | null
          neighborhood_id?: string | null
          opening_hours?: Json | null
          peak_hours?: Json | null
          phone_number?: string | null
          place_id?: string | null
          postal_code?: string | null
          price_range?: string
          quiet_hours?: Json | null
          rating?: number | null
          recommended_group_size?: string | null
          reservation_url?: string | null
          restaurant_type?: Database["public"]["Enums"]["restaurant_type"]
          review_count?: number | null
          score_summary?: string | null
          service_score?: number | null
          signature_dishes?: Json | null
          slug?: string
          smart_visit?: string | null
          status?: string | null
          tagline?: string | null
          updated_at?: string
          value_score?: number | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_neighborhood_id_fkey"
            columns: ["neighborhood_id"]
            isOneToOne: false
            referencedRelation: "neighborhoods"
            referencedColumns: ["id"]
          },
        ]
      }
      secrets: {
        Row: {
          name: string
          value: string
        }
        Insert: {
          name: string
          value: string
        }
        Update: {
          name?: string
          value?: string
        }
        Relationships: []
      }
      sitemap_urls: {
        Row: {
          change_frequency: string | null
          created_at: string | null
          id: string
          language: string
          last_modified: string | null
          priority: number | null
          updated_at: string | null
          url: string
        }
        Insert: {
          change_frequency?: string | null
          created_at?: string | null
          id?: string
          language: string
          last_modified?: string | null
          priority?: number | null
          updated_at?: string | null
          url: string
        }
        Update: {
          change_frequency?: string | null
          created_at?: string | null
          id?: string
          language?: string
          last_modified?: string | null
          priority?: number | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          user_id?: string | null
        }
        Relationships: []
      }
      wrappers_fdw_stats: {
        Row: {
          bytes_in: number | null
          bytes_out: number | null
          create_times: number | null
          created_at: string
          fdw_name: string
          metadata: Json | null
          rows_in: number | null
          rows_out: number | null
          updated_at: string
        }
        Insert: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Update: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name?: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      airtable_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      airtable_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      airtable_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      auth0_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      auth0_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      auth0_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      big_query_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      big_query_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      big_query_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      click_house_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      click_house_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      click_house_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      cognito_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      cognito_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      cognito_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      firebase_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      firebase_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      firebase_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      get_secret: {
        Args: {
          secret_name: string
        }
        Returns: string
      }
      hello_world_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      hello_world_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      hello_world_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      logflare_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      logflare_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      logflare_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      mssql_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      mssql_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      mssql_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      postgres_fdw_disconnect: {
        Args: {
          "": string
        }
        Returns: boolean
      }
      postgres_fdw_disconnect_all: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      postgres_fdw_get_connections: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      postgres_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      redis_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      redis_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      redis_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      s3_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      s3_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      s3_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      stripe_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      stripe_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      stripe_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      wasm_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      wasm_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      wasm_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
    }
    Enums: {
      restaurant_type:
        | "fine_dining"
        | "casual_dining"
        | "fast_food"
        | "cafe"
        | "bistro"
        | "food_truck"
        | "street_food"
        | "casual_fine_dining"
      supported_language: "en" | "es"
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
