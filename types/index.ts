import type { Database } from "./database";

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type ServiceItem = Database["public"]["Tables"]["service_items"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProviderProfile =
  Database["public"]["Tables"]["provider_profiles"]["Row"];
export type RequestPost =
  Database["public"]["Tables"]["request_posts"]["Row"];
export type Report = Database["public"]["Tables"]["reports"]["Row"];

// 카테고리 + 하위 세부 항목을 함께 담는 UI용 타입
export interface CategoryWithItems extends Category {
  service_items: ServiceItem[];
}

// 제공자 목록 카드에 필요한 정보만 담은 타입 (연락처 필드는 절대 포함하지 않음)
export interface ProviderCard {
  id: string;
  headline: string;
  nickname: string;
  avatar_url: string | null;
  category: Pick<Category, "id" | "name" | "slug">;
  service_items: Pick<ServiceItem, "id" | "name">[];
  experience_years: number | null;
  introduction: string;
  status: ProviderProfile["status"];
}

// 요청글 목록 카드에 필요한 정보 (연락처 필드 제외)
export interface RequestCard {
  id: string;
  title: string;
  category: Pick<Category, "id" | "name" | "slug">;
  service_item: Pick<ServiceItem, "id" | "name"> | null;
  desired_date: string;
  desired_time: string | null;
  budget_text: string | null;
  is_urgent: boolean;
  status: RequestPost["status"];
  created_at: string;
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
