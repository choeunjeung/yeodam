import Link from "next/link";
import Badge from "@/components/common/Badge";
import type { MockProvider } from "@/lib/constants/mock-data";
import { MOCK_CATEGORIES } from "@/lib/constants/mock-data";

export default function ProviderCard({ provider }: { provider: MockProvider }) {
  const category = MOCK_CATEGORIES.find((c) => c.slug === provider.categorySlug);

  return (
    <Link
      href={`/providers/${provider.id}`}
      className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-5 shadow-sm transition hover:border-[var(--color-accent-terracotta)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-beige-light)] text-sm font-semibold text-[var(--color-brown-deep)]"
          >
            {provider.nickname.slice(0, 1)}
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-brown-deep)]">
              {provider.nickname}
            </p>
            <p className="text-xs text-[var(--color-brown-mid)]">
              {category?.name}
            </p>
          </div>
        </div>
        <Badge variant={provider.status === "ACTIVE" ? "active" : "paused"}>
          {provider.status === "ACTIVE" ? "모집중" : "휴식중"}
        </Badge>
      </div>

      <p className="font-semibold text-[var(--color-brown-deep)]">
        {provider.headline}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {provider.serviceItems.map((item) => (
          <span
            key={item}
            className="rounded-full bg-[var(--color-beige-light)] px-2.5 py-1 text-xs text-[var(--color-brown-mid)]"
          >
            {item}
          </span>
        ))}
      </div>

      <p className="line-clamp-2 text-sm text-[var(--color-brown-mid)]">
        {provider.introduction}
      </p>

      <p className="text-xs text-[var(--color-brown-mid)]">
        경험 {provider.experienceYears}년
      </p>
    </Link>
  );
}
