// Phase 2에서 Supabase categories 테이블(is_featured=true)이 준비되면
// lib/queries/categories.ts의 getFeaturedCategories()로 대체됩니다.
// 그 전까지 메인 화면이 비어 보이지 않도록 사용하는 임시 폴백 데이터입니다.
export const FEATURED_CATEGORIES_FALLBACK = [
  { name: "병원·외출 동행", slug: "hospital-outing" },
  { name: "반려동물 돌봄", slug: "pet-care" },
  { name: "집안일 도움", slug: "housework" },
  { name: "디지털 생활 도움", slug: "digital-help" },
  { name: "아이 생활지원", slug: "kids-support" },
] as const;
