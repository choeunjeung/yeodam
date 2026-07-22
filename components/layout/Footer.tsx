import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-surface-cream)]">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-[var(--color-brown-mid)]">
        <p className="text-base font-semibold text-[var(--color-brown-deep)]">
          여담
        </p>
        <p className="mt-1 max-w-md">
          여담은 이용자 간 직접 연결을 돕는 게시판형 서비스이며, 제공자를 직접
          고용하거나 서비스를 직접 제공하지 않습니다.
        </p>
        <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/guide" className="hover:text-[var(--color-brown-deep)]">
            이용방법 및 안전 안내
          </Link>
          <Link href="/faq" className="hover:text-[var(--color-brown-deep)]">
            FAQ
          </Link>
        </nav>
        <p className="mt-6 text-xs text-[var(--color-brown-mid)]/80">
          여담은 대회 출품용 프로토타입 서비스입니다.
        </p>
      </div>
    </footer>
  );
}
