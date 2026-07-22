import { notFound } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/common/Badge";
import PreviewNotice from "@/components/common/PreviewNotice";
import ContactAndReport from "@/components/safety/ContactAndReport";
import ProviderCard from "@/components/providers/ProviderCard";
import { MOCK_CATEGORIES, MOCK_REQUESTS } from "@/lib/constants/mock-data";
import { getMatchingProviders } from "@/lib/ai/match-providers";

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = MOCK_REQUESTS.find((r) => r.id === id);

  if (!request) notFound();

  const category = MOCK_CATEGORIES.find((c) => c.slug === request.categorySlug);
  const matches =
    request.status === "OPEN"
      ? await getMatchingProviders(request.content, request.categorySlug)
      : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PreviewNotice />

      <Link
        href="/requests"
        className="text-sm text-[var(--color-brown-mid)] hover:underline"
      >
        ← 요청 게시판으로
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge variant={request.status === "OPEN" ? "open" : "closed"}>
          {request.status === "OPEN" ? "모집중" : "마감"}
        </Badge>
        {request.isUrgent && <Badge variant="urgent">긴급</Badge>}
        <span className="text-sm text-[var(--color-brown-mid)]">
          {category?.name}
          {request.serviceItem ? ` · ${request.serviceItem}` : ""}
        </span>
      </div>

      <h1 className="mt-2 text-2xl font-bold text-[var(--color-brown-deep)]">
        {request.title}
      </h1>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <div className="sm:col-span-2 space-y-6">
          <section>
            <h2 className="font-semibold text-[var(--color-brown-deep)]">
              요청 내용
            </h2>
            <p className="mt-2 whitespace-pre-line text-sm text-[var(--color-brown-mid)]">
              {request.content}
            </p>
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-brown-mid)]">희망 날짜</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-brown-deep)]">
                {request.desiredDate}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-brown-mid)]">희망 시간</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-brown-deep)]">
                {request.desiredTime}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-brown-mid)]">예상 소요시간</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-brown-deep)]">
                {request.durationText}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-brown-mid)]">사례비</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-brown-deep)]">
                {request.budgetText}
                {request.isNegotiable ? " (협의 가능)" : ""}
              </p>
            </div>
          </section>

          <p className="text-xs text-[var(--color-brown-mid)]">
            {request.createdAt} 작성
          </p>
        </div>

        <div className="sm:col-span-1">
          {request.status === "CLOSED" ? (
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-beige-light)]/60 p-5 text-sm text-[var(--color-brown-mid)]">
              이 요청은 마감되었습니다.
            </div>
          ) : (
            <>
              <ContactAndReport
                contactMethod={request.contactMethod}
                contactValue={request.contactValue}
              />
            </>
          )}
        </div>
      </div>

      {matches.length > 0 && (
        <section className="mt-10">
          <h2 className="font-semibold text-[var(--color-brown-deep)]">
            이 요청과 어울리는 제공자
          </h2>
          <p className="mt-1 text-sm text-[var(--color-brown-mid)]">
            요청 내용을 바탕으로 AI가 찾아본 제공자예요.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {matches.map(({ provider }) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
