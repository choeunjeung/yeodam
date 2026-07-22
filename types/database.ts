// Supabase 스키마와 1:1로 대응하는 타입 정의입니다.
// supabase/migrations/*.sql 을 수정하면 이 파일도 함께 갱신해 주세요.

export type ProviderStatus = "ACTIVE" | "PAUSED";
export type RequestStatus = "OPEN" | "CLOSED";
export type ReportTargetType = "provider" | "request";
export type ReportStatus = "PENDING" | "REVIEWED";
export type UserRole = "user" | "admin";
export type ContactMethod = "PHONE" | "KAKAO";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          nickname: string;
          phone: string;
          avatar_url: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          nickname: string;
          phone: string;
          avatar_url?: string | null;
          role?: UserRole;
        };
        Update: Partial<{
          name: string;
          nickname: string;
          phone: string;
          avatar_url: string | null;
        }>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string | null;
          description: string | null;
          sort_order: number;
          is_featured: boolean;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon?: string | null;
          description?: string | null;
          sort_order?: number;
          is_featured?: boolean;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
      service_items: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          slug: string;
          sort_order: number;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          slug: string;
          sort_order?: number;
          is_active?: boolean;
        };
        Update: Partial<
          Database["public"]["Tables"]["service_items"]["Insert"]
        >;
      };
      provider_profiles: {
        Row: {
          id: string;
          user_id: string;
          headline: string;
          category_id: string;
          experience_years: number | null;
          experience_description: string;
          introduction: string;
          available_days: string[] | null;
          available_time_text: string | null;
          available_services: string | null;
          unavailable_services: string | null;
          contact_method: ContactMethod;
          contact_value: string;
          contact_available_time: string | null;
          status: ProviderStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          headline: string;
          category_id: string;
          experience_years?: number | null;
          experience_description: string;
          introduction: string;
          available_days?: string[] | null;
          available_time_text?: string | null;
          available_services?: string | null;
          unavailable_services?: string | null;
          contact_method: ContactMethod;
          contact_value: string;
          contact_available_time?: string | null;
          status?: ProviderStatus;
        };
        Update: Partial<
          Database["public"]["Tables"]["provider_profiles"]["Insert"]
        >;
      };
      provider_service_items: {
        Row: {
          provider_profile_id: string;
          service_item_id: string;
        };
        Insert: {
          provider_profile_id: string;
          service_item_id: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["provider_service_items"]["Insert"]
        >;
      };
      request_posts: {
        Row: {
          id: string;
          user_id: string;
          category_id: string;
          service_item_id: string | null;
          title: string;
          content: string;
          desired_date: string;
          desired_time: string | null;
          duration_text: string | null;
          budget_text: string | null;
          is_negotiable: boolean;
          is_urgent: boolean;
          contact_method: ContactMethod;
          contact_value: string;
          status: RequestStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id: string;
          service_item_id?: string | null;
          title: string;
          content: string;
          desired_date: string;
          desired_time?: string | null;
          duration_text?: string | null;
          budget_text?: string | null;
          is_negotiable?: boolean;
          is_urgent?: boolean;
          contact_method: ContactMethod;
          contact_value: string;
          status?: RequestStatus;
        };
        Update: Partial<
          Database["public"]["Tables"]["request_posts"]["Insert"]
        >;
      };
      reports: {
        Row: {
          id: string;
          reporter_user_id: string;
          target_type: ReportTargetType;
          target_id: string;
          reason: string;
          description: string | null;
          status: ReportStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          reporter_user_id: string;
          target_type: ReportTargetType;
          target_id: string;
          reason: string;
          description?: string | null;
          status?: ReportStatus;
        };
        Update: Partial<Database["public"]["Tables"]["reports"]["Insert"]>;
      };
    };
  };
}
