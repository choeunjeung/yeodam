import { createClient } from "@/lib/supabase/server";
import { FEATURED_CATEGORIES_FALLBACK } from "@/lib/constants/categories";
import type { Category } from "@/types";

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// 메인 화면에 노출할 대표 카테고리 5개.
// Supabase가 아직 설정되지 않았거나 시드 데이터가 없으면 폴백 목록을 사용합니다.
export async function getFeaturedCategories(): Promise<
  Pick<Category, "name" | "slug" | "icon">[]
> {
  if (!isSupabaseConfigured()) {
    return FEATURED_CATEGORIES_FALLBACK.map((c) => ({ ...c, icon: null }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("name, slug, icon")
    .eq("is_featured", true)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    return FEATURED_CATEGORIES_FALLBACK.map((c) => ({ ...c, icon: null }));
  }

  return data;
}

export async function getAllCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data;
}
