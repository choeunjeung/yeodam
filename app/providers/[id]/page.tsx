import { notFound } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/common/Badge";
import PreviewNotice from "@/components/common/PreviewNotice";
import ContactAndReport from "@/components/safety/ContactAndReport";
import { MOCK_CATEGORIES, MOCK_PROVIDERS } from "@/lib/constants/mock-data";

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = MOCK_PROVIDERS.find((p) => p.id === id);

  if (!provider) notFound();

  const category = MOCK_CATEGORIES.find((c) => c.slug === provider.categorySlug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PreviewNotice />

      <Link
        href="/providers"
        className="text-sm text-[var(--color-brown-mid)] hover:underline"
      >
        ← 제공자 목록으로
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-[var(--color-brown-mid)]">
              {provider.nickname} · {category?.name}
            </p>
            <Badge variant={provider.status === "ACTIVE" ? "active" : "paused"}>
              {provider.status === "ACTIVE" ? "모집중" : "휴식중"}
            </Badge>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-[var(--color-brown-deep)]">
            {provider.headline}
          </h1>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {provider.serviceItems.map((item) => (
          <span
            key={item}
            className="rounded-full bg-[var(--color-beige-light)] px-3 py-1 text-xs text-[var(--color-brown-mid)]"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="sm:col-span-2 space-y-6">
          <section>
            <h2 className="font-semibold text-[var(--color-brown-deep)]">
              경험 설명
            </h2>
            <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
              경험 {provider.experienceYears}년 · {provider.experienceDescription}
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-[var(--color-brown-deep)]">
              자기소개
            </h2>
            <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
              {provider.introduction}
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-[var(--color-brown-deep)]">
              활동 가능 시간
            </h2>
            <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
              {provider.availableDays.join(", ")}요일 · {provider.availableTimeText}
            </p>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-4">
              <p className="text-sm font-semibold text-[var(--color-success)]">
                가능한 서비스
              </p>
              <p className="mt-1 text-sm text-[var(--color-brown-mid)]">
                {provider.availableServices}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-4">
              <p className="text-sm font-semibold text-[var(--color-urgent)]">
                불가능한 서비스
              </p>
              <p className="mt-1 text-sm text-[var(--color-brown-mid)]">
                {provider.unavailableServices}
              </p>
            </div>
          </section>
        </div>

        <div className="sm:col-span-1">
          <ContactAndReport
            contactMethod={provider.contactMethod}
            contactValue={provider.contactValue}
          />
          <p className="mt-2 text-xs text-[var(--color-brown-mid)]">
            연락 가능 시간: {provider.contactAvailableTime}
          </p>
        </div>
      </div>
    </div>
  );
}
