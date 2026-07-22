import Link from "next/link";
import PreviewNotice from "@/components/common/PreviewNotice";
import RequestCard from "@/components/requests/RequestCard";
import EmptyState from "@/components/common/EmptyState";
import { MOCK_CATEGORIES, MOCK_REQUESTS } from "@/lib/constants/mock-data";

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; status?: string; q?: string }>;
}) {
  const { category, status, q } = await searchParams;
  const keyword = q?.trim().toLowerCase() ?? "";

  const requests = MOCK_REQUESTS.filter((r) => !category || r.categorySlug === category)
    .filter((r) => !status || r.status === status)
    .filter(
      (r) =>
        !keyword ||
        r.title.toLowerCase().includes(keyword) ||
        r.content.toLowerCase().includes(keyword)
    )
    .sort((a, b) => {
      if (a.status !== b.status) return a.status === "OPEN" ? -1 : 1;
      if (a.isUrgent !== b.isUrgent) return a.isUrgent ? -1 : 1;
      return b.createdAt.localeCompare(a.createdAt);
    });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PreviewNotice />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-brown-deep)]">
            요청 게시판
          </h1>
          <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
            필요한 도움을 요청하거나, 다른 분들의 요청을 확인해보세요.
          </p>
        </div>
        <Link
          href="/requests/new"
          className="flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent-terracotta)] px-5 text-sm font-semibold text-white hover:opacity-90"
        >
          요청글 작성하기
        </Link>
      </div>

      <form method="get" className="mt-6 flex gap-2">
        {category && <input type="hidden" name="category" value={category} />}
        {status && <input type="hidden" name="status" value={status} />}
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="제목, 내용으로 검색"
          aria-label="요청글 검색"
          className="min-h-11 flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-cream)] px-4 text-sm text-[var(--color-brown-deep)] placeholder:text-[var(--color-brown-mid)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-terracotta)]"
        />
        <button
          type="submit"
          className="min-h-11 rounded-full bg-[var(--color-accent-terracotta)] px-5 text-sm font-semibold text-white hover:opacity-90"
        >
          검색
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link
          href="/requests"
          className={`min-h-9 rounded-full border px-4 py-1.5 text-sm ${
            !status
              ? "border-[var(--color-accent-terracotta)] bg-[var(--color-accent-terracotta)]/10 text-[var(--color-accent-terracotta)]"
              : "border-[var(--color-border)] text-[var(--color-brown-mid)]"
          }`}
        >
          전체
        </Link>
        <Link
          href="/requests?status=OPEN"
          className={`min-h-9 rounded-full border px-4 py-1.5 text-sm ${
            status === "OPEN"
              ? "border-[var(--color-accent-terracotta)] bg-[var(--color-accent-terracotta)]/10 text-[var(--color-accent-terracotta)]"
              : "border-[var(--color-border)] text-[var(--color-brown-mid)]"
          }`}
        >
          모집중
        </Link>
        <Link
          href="/requests?status=CLOSED"
          className={`min-h-9 rounded-full border px-4 py-1.5 text-sm ${
            status === "CLOSED"
              ? "border-[var(--color-accent-terracotta)] bg-[var(--color-accent-terracotta)]/10 text-[var(--color-accent-terracotta)]"
              : "border-[var(--color-border)] text-[var(--color-brown-mid)]"
          }`}
        >
          마감
        </Link>
        <span className="mx-1 h-5 w-px bg-[var(--color-border)]" />
        {MOCK_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/requests?category=${c.slug}`}
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
        검색 결과 {requests.length}건
      </p>

      {requests.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="아직 등록된 요청이 없습니다."
            description="필요한 도움을 직접 요청해 보세요."
          />
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
}
