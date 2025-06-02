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
      active_sessions: {
        Row: {
          created_at: string | null
          device_info: Json | null
          expires_at: string | null
          id: string
          ip_address: unknown | null
          is_active: boolean | null
          last_activity: string | null
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          expires_at?: string | null
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          expires_at?: string | null
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          session_token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      advanced_bookings: {
        Row: {
          adults: number
          ai_recommended: boolean | null
          booking_reference: string
          booking_status: string | null
          children: number | null
          created_at: string
          currency: string | null
          departure_date: string
          destination_id: string | null
          flight_preferences: Json | null
          id: string
          infants: number | null
          mood_based_selection: boolean | null
          package_id: string | null
          payment_status: string | null
          return_date: string
          room_preferences: Json | null
          special_requests: string | null
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          adults?: number
          ai_recommended?: boolean | null
          booking_reference?: string
          booking_status?: string | null
          children?: number | null
          created_at?: string
          currency?: string | null
          departure_date: string
          destination_id?: string | null
          flight_preferences?: Json | null
          id?: string
          infants?: number | null
          mood_based_selection?: boolean | null
          package_id?: string | null
          payment_status?: string | null
          return_date: string
          room_preferences?: Json | null
          special_requests?: string | null
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          adults?: number
          ai_recommended?: boolean | null
          booking_reference?: string
          booking_status?: string | null
          children?: number | null
          created_at?: string
          currency?: string | null
          departure_date?: string
          destination_id?: string | null
          flight_preferences?: Json | null
          id?: string
          infants?: number | null
          mood_based_selection?: boolean | null
          package_id?: string | null
          payment_status?: string | null
          return_date?: string
          room_preferences?: Json | null
          special_requests?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "advanced_bookings_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "advanced_bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_conversations: {
        Row: {
          conversation_data: Json
          created_at: string
          id: string
          mood_analysis: Json | null
          recommended_destinations: string[] | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          conversation_data: Json
          created_at?: string
          id?: string
          mood_analysis?: Json | null
          recommended_destinations?: string[] | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          conversation_data?: Json
          created_at?: string
          id?: string
          mood_analysis?: Json | null
          recommended_destinations?: string[] | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          created_at: string | null
          departure_date: string
          destination: string
          email: string
          hotel_preference: string | null
          id: string
          name: string
          passengers: number
          phone: string
          return_date: string
          special_requests: string | null
          status: string | null
          total_price: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          departure_date: string
          destination: string
          email: string
          hotel_preference?: string | null
          id?: string
          name: string
          passengers?: number
          phone: string
          return_date: string
          special_requests?: string | null
          status?: string | null
          total_price?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          departure_date?: string
          destination?: string
          email?: string
          hotel_preference?: string | null
          id?: string
          name?: string
          passengers?: number
          phone?: string
          return_date?: string
          special_requests?: string | null
          status?: string | null
          total_price?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: []
      }
      destinations: {
        Row: {
          activity_types: string[] | null
          average_temperature: number | null
          best_season: string | null
          climate_type: string | null
          coordinates: unknown | null
          country: string
          country_ar: string
          created_at: string
          currency: string | null
          description: string
          description_ar: string
          id: string
          image_urls: string[] | null
          mood_tags: string[] | null
          name: string
          name_ar: string
          popularity_score: number | null
          price_level: number | null
          safety_rating: number | null
          updated_at: string
          video_url: string | null
          visa_required: boolean | null
        }
        Insert: {
          activity_types?: string[] | null
          average_temperature?: number | null
          best_season?: string | null
          climate_type?: string | null
          coordinates?: unknown | null
          country: string
          country_ar: string
          created_at?: string
          currency?: string | null
          description: string
          description_ar: string
          id?: string
          image_urls?: string[] | null
          mood_tags?: string[] | null
          name: string
          name_ar: string
          popularity_score?: number | null
          price_level?: number | null
          safety_rating?: number | null
          updated_at?: string
          video_url?: string | null
          visa_required?: boolean | null
        }
        Update: {
          activity_types?: string[] | null
          average_temperature?: number | null
          best_season?: string | null
          climate_type?: string | null
          coordinates?: unknown | null
          country?: string
          country_ar?: string
          created_at?: string
          currency?: string | null
          description?: string
          description_ar?: string
          id?: string
          image_urls?: string[] | null
          mood_tags?: string[] | null
          name?: string
          name_ar?: string
          popularity_score?: number | null
          price_level?: number | null
          safety_rating?: number | null
          updated_at?: string
          video_url?: string | null
          visa_required?: boolean | null
        }
        Relationships: []
      }
      flights: {
        Row: {
          aircraft_type: string | null
          airline: string
          arrival_airport: string
          arrival_city: string
          arrival_time: string | null
          available_seats: number | null
          booking_url: string | null
          class_type: string | null
          created_at: string | null
          currency: string | null
          departure_airport: string
          departure_city: string
          departure_date: string
          departure_time: string | null
          duration_minutes: number | null
          flight_number: string | null
          id: string
          is_direct: boolean | null
          price: number
          return_date: string | null
          stops: number | null
          updated_at: string | null
        }
        Insert: {
          aircraft_type?: string | null
          airline: string
          arrival_airport: string
          arrival_city: string
          arrival_time?: string | null
          available_seats?: number | null
          booking_url?: string | null
          class_type?: string | null
          created_at?: string | null
          currency?: string | null
          departure_airport: string
          departure_city: string
          departure_date: string
          departure_time?: string | null
          duration_minutes?: number | null
          flight_number?: string | null
          id?: string
          is_direct?: boolean | null
          price: number
          return_date?: string | null
          stops?: number | null
          updated_at?: string | null
        }
        Update: {
          aircraft_type?: string | null
          airline?: string
          arrival_airport?: string
          arrival_city?: string
          arrival_time?: string | null
          available_seats?: number | null
          booking_url?: string | null
          class_type?: string | null
          created_at?: string | null
          currency?: string | null
          departure_airport?: string
          departure_city?: string
          departure_date?: string
          departure_time?: string | null
          duration_minutes?: number | null
          flight_number?: string | null
          id?: string
          is_direct?: boolean | null
          price?: number
          return_date?: string | null
          stops?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          category: string
          created_at: string | null
          destination: string
          id: string
          image_url: string
          is_featured: boolean | null
          title: string
          title_ar: string
        }
        Insert: {
          category: string
          created_at?: string | null
          destination: string
          id?: string
          image_url: string
          is_featured?: boolean | null
          title: string
          title_ar: string
        }
        Update: {
          category?: string
          created_at?: string | null
          destination?: string
          id?: string
          image_url?: string
          is_featured?: boolean | null
          title?: string
          title_ar?: string
        }
        Relationships: []
      }
      hotels: {
        Row: {
          address: string | null
          amenities: string[] | null
          booking_url: string | null
          check_in_date: string
          check_out_date: string
          city: string
          country: string
          created_at: string | null
          currency: string | null
          description: string | null
          free_parking: boolean | null
          free_wifi: boolean | null
          guest_rating: number | null
          gym: boolean | null
          id: string
          image_urls: string[] | null
          latitude: number | null
          longitude: number | null
          name: string
          pool: boolean | null
          price_per_night: number
          restaurant: boolean | null
          room_type: string | null
          spa: boolean | null
          star_rating: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          booking_url?: string | null
          check_in_date: string
          check_out_date: string
          city: string
          country: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          free_parking?: boolean | null
          free_wifi?: boolean | null
          guest_rating?: number | null
          gym?: boolean | null
          id?: string
          image_urls?: string[] | null
          latitude?: number | null
          longitude?: number | null
          name: string
          pool?: boolean | null
          price_per_night: number
          restaurant?: boolean | null
          room_type?: string | null
          spa?: boolean | null
          star_rating?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          booking_url?: string | null
          check_in_date?: string
          check_out_date?: string
          city?: string
          country?: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          free_parking?: boolean | null
          free_wifi?: boolean | null
          guest_rating?: number | null
          gym?: boolean | null
          id?: string
          image_urls?: string[] | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          pool?: boolean | null
          price_per_night?: number
          restaurant?: boolean | null
          room_type?: string | null
          spa?: boolean | null
          star_rating?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          message: string
          message_ar: string
          read_status: boolean | null
          title: string
          title_ar: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          message: string
          message_ar: string
          read_status?: boolean | null
          title: string
          title_ar: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          message?: string
          message_ar?: string
          read_status?: boolean | null
          title?: string
          title_ar?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          created_at: string | null
          description: string
          description_ar: string
          destination: string
          duration_days: number
          highlights: Json | null
          highlights_ar: Json | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_featured: boolean | null
          price: number
          title: string
          title_ar: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          description_ar: string
          destination: string
          duration_days: number
          highlights?: Json | null
          highlights_ar?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          price: number
          title: string
          title_ar: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          description_ar?: string
          destination?: string
          duration_days?: number
          highlights?: Json | null
          highlights_ar?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          price?: number
          title?: string
          title_ar?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          currency: string | null
          id: string
          payment_date: string | null
          payment_method: string
          payment_status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          currency?: string | null
          id?: string
          payment_date?: string | null
          payment_method: string
          payment_status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          currency?: string | null
          id?: string
          payment_date?: string | null
          payment_method?: string
          payment_status?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "advanced_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      price_history: {
        Row: {
          change_percentage: number | null
          currency: string | null
          entity_id: string
          entity_type: string
          id: string
          new_price: number
          old_price: number | null
          recorded_at: string | null
        }
        Insert: {
          change_percentage?: number | null
          currency?: string | null
          entity_id: string
          entity_type: string
          id?: string
          new_price: number
          old_price?: number | null
          recorded_at?: string | null
        }
        Update: {
          change_percentage?: number | null
          currency?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          new_price?: number
          old_price?: number | null
          recorded_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string
          created_at: string
          destination_id: string
          helpful_votes: number | null
          id: string
          rating: number
          review_images: string[] | null
          review_text: string | null
          user_id: string
          verified_booking: boolean | null
        }
        Insert: {
          booking_id: string
          created_at?: string
          destination_id: string
          helpful_votes?: number | null
          id?: string
          rating: number
          review_images?: string[] | null
          review_text?: string | null
          user_id: string
          verified_booking?: boolean | null
        }
        Update: {
          booking_id?: string
          created_at?: string
          destination_id?: string
          helpful_votes?: number | null
          id?: string
          rating?: number
          review_images?: string[] | null
          review_text?: string | null
          user_id?: string
          verified_booking?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "advanced_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          created_at: string | null
          granted_by: string | null
          id: string
          permission: Database["public"]["Enums"]["permission_type"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          created_at?: string | null
          granted_by?: string | null
          id?: string
          permission: Database["public"]["Enums"]["permission_type"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          created_at?: string | null
          granted_by?: string | null
          id?: string
          permission?: Database["public"]["Enums"]["permission_type"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          action: string
          created_at: string | null
          failure_reason: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          resource: string | null
          success: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource?: string | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource?: string | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string
          description_ar: string
          icon: string
          id: string
          is_active: boolean | null
          price_from: number | null
          title: string
          title_ar: string
        }
        Insert: {
          created_at?: string | null
          description: string
          description_ar: string
          icon: string
          id?: string
          is_active?: boolean | null
          price_from?: number | null
          title: string
          title_ar: string
        }
        Update: {
          created_at?: string | null
          description?: string
          description_ar?: string
          icon?: string
          id?: string
          is_active?: boolean | null
          price_from?: number | null
          title?: string
          title_ar?: string
        }
        Relationships: []
      }
      user_2fa_settings: {
        Row: {
          backup_codes: string[] | null
          created_at: string | null
          id: string
          is_enabled: boolean | null
          method: string
          phone_number: string | null
          secret_key: string | null
          updated_at: string | null
          user_id: string
          verified_at: string | null
        }
        Insert: {
          backup_codes?: string[] | null
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          method: string
          phone_number?: string | null
          secret_key?: string | null
          updated_at?: string | null
          user_id: string
          verified_at?: string | null
        }
        Update: {
          backup_codes?: string[] | null
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          method?: string
          phone_number?: string | null
          secret_key?: string | null
          updated_at?: string | null
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string
          date_of_birth: string | null
          first_name: string | null
          id: string
          last_name: string | null
          mood_preferences: Json | null
          nationality: string | null
          phone: string | null
          preferred_language: string | null
          travel_preferences: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          mood_preferences?: Json | null
          nationality?: string | null
          phone?: string | null
          preferred_language?: string | null
          travel_preferences?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          mood_preferences?: Json | null
          nationality?: string | null
          phone?: string | null
          preferred_language?: string | null
          travel_preferences?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_booking_reference: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_permission: {
        Args: {
          _user_id: string
          _permission: Database["public"]["Enums"]["permission_type"]
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "moderator" | "support" | "user"
      permission_type:
        | "users_view"
        | "users_create"
        | "users_edit"
        | "users_delete"
        | "bookings_view"
        | "bookings_create"
        | "bookings_edit"
        | "bookings_delete"
        | "messages_view"
        | "messages_reply"
        | "messages_archive"
        | "settings_view"
        | "settings_edit"
        | "analytics_view"
        | "system_logs_view"
        | "admin_panel_access"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin", "moderator", "support", "user"],
      permission_type: [
        "users_view",
        "users_create",
        "users_edit",
        "users_delete",
        "bookings_view",
        "bookings_create",
        "bookings_edit",
        "bookings_delete",
        "messages_view",
        "messages_reply",
        "messages_archive",
        "settings_view",
        "settings_edit",
        "analytics_view",
        "system_logs_view",
        "admin_panel_access",
      ],
    },
  },
} as const
