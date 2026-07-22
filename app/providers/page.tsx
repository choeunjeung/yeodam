import Link from "next/link";
import PreviewNotice from "@/components/common/PreviewNotice";
import ProviderCard from "@/components/providers/ProviderCard";
import EmptyState from "@/components/common/EmptyState";
import { MOCK_CATEGORIES, MOCK_PROVIDERS } from "@/lib/constants/mock-data";

export default async function ProvidersPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const keyword = q?.trim().toLowerCase() ?? "";

  const providers = MOCK_PROVIDERS.filter((p) => p.status === "ACTIVE")
    .filter((p) => !category || p.categorySlug === category)
    .filter(
      (p) =>
        !keyword ||
        p.headline.toLowerCase().includes(keyword) ||
        p.nickname.toLowerCase().includes(keyword) ||
        p.introduction.toLowerCase().includes(keyword) ||
        p.experienceDescription.toLowerCase().includes(keyword)
    );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PreviewNotice />

      <h1 className="text-2xl font-bold text-[var(--color-brown-deep)]">
        제공자 찾기
      </h1>
      <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
        생활 속 경험을 나누는 제공자들을 카테고리별로 찾아보세요.
      </p>

      <form method="get" className="mt-6 flex gap-2">
        {category && <input type="hidden" name="category" value={category} />}
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="제목, 소개로 검색"
          aria-label="제공자 검색"
          className="min-h-11 flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-cream)] px-4 text-sm text-[var(--color-brown-deep)] placeholder:text-[var(--color-brown-mid)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-terracotta)]"
        />
        <button
          type="submit"
          className="min-h-11 rounded-full bg-[var(--color-accent-terracotta)] px-5 text-sm font-semibold text-white hover:opacity-90"
        >
          검색
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/providers"
          className={`min-h-9 rounded-full border px-4 py-1.5 text-sm ${
            !category
              ? "border-[var(--color-accent-terracotta)] bg-[var(--color-accent-terracotta)]/10 text-[var(--color-accent-terracotta)]"
              : "border-[var(--color-border)] text-[var(--color-brown-mid)]"
          }`}
        >
          전체
        </Link>
        {MOCK_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/providers?category=${c.slug}`}
            className={`min-h-9 rounded-full border px-4 py-1.5 text-sm ${
              category === c.slug
                ? "border-[var(--color-accent-terracotta)] bg-[var(--color-accent-terracotta)]/10 text-[var(--color-accent-terracotta)]"
                : "border-[var(--color-border)] text-[var(--color-brown-mid)]"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <p className="mt-6 text-sm text-[var(--color-brown-mid)]">
        검색 결과 {providers.length}건
      </p>

      {providers.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="조건에 맞는 결과를 찾지 못했습니다."
            description="다른 카테고리나 검색어를 이용해 보세요."
          />
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      )}
    </div>
  );
}
