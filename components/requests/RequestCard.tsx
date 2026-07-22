import Link from "next/link";
import Badge from "@/components/common/Badge";
import type { MockRequest } from "@/lib/constants/mock-data";
import { MOCK_CATEGORIES } from "@/lib/constants/mock-data";

export default function RequestCard({ request }: { request: MockRequest }) {
  const category = MOCK_CATEGORIES.find((c) => c.slug === request.categorySlug);

  return (
    <Link
      href={`/requests/${request.id}`}
      className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-5 shadow-sm transition hover:border-[var(--color-accent-terracotta)]"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={request.status === "OPEN" ? "open" : "closed"}>
          {request.status === "OPEN" ? "모집중" : "마감"}
        </Badge>
        {request.isUrgent && <Badge variant="urgent">긴급</Badge>}
        <span className="text-xs text-[var(--color-brown-mid)]">
          {category?.name}
          {request.serviceItem ? ` · ${request.serviceItem}` : ""}
        </span>
      </div>

      <p className="font-semibold text-[var(--color-brown-deep)]">
        {request.title}
      </p>

      <p className="text-sm text-[var(--color-brown-mid)]">
        희망일 {request.desiredDate} · {request.desiredTime}
      </p>

      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--color-accent-terracotta)]">
          {request.budgetText}
        </span>
        <span className="text-xs text-[var(--color-brown-mid)]">
          {request.createdAt} 작성
        </span>
      </div>
    </Link>
  );
}
