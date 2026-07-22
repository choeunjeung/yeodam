import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { getCurrentProfile } from "@/lib/supabase/get-current-profile";
import { signOutAction } from "@/lib/actions/auth";

const NAV_LINKS = [
  { href: "/providers", label: "제공자 찾기" },
  { href: "/requests", label: "요청 게시판" },
  { href: "/guide", label: "이용방법" },
];

export default async function Header() {
  const profile = await getCurrentProfile();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface-cream)]/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-[var(--color-accent-terracotta)]"
        >
          <Image
            src="/logo-icon.png"
            alt="여담 로고"
            width={272}
            height={187}
            priority
            className="size-10 shrink-0 rounded-full object-cover"
          />
          여담
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--color-brown-mid)] md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[var(--color-brown-deep)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {profile ? (
            <>
              <Link
                href="/mypage"
                className="flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-[var(--color-brown-deep)] hover:bg-[var(--color-beige-light)]"
              >
                마이페이지
              </Link>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-[var(--color-brown-mid)] hover:bg-[var(--color-beige-light)]"
                >
                  로그아웃
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-[var(--color-brown-deep)] hover:bg-[var(--color-beige-light)]"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="flex min-h-11 items-center rounded-full bg-[var(--color-accent-terracotta)] px-4 text-sm font-medium text-white hover:opacity-90"
              >
                회원가입
              </Link>
            </>
          )}
        </div>

        <details className="md:hidden [&_summary::-webkit-details-marker]:hidden">
          <summary
            aria-label="메뉴 열기"
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full hover:bg-[var(--color-beige-light)]"
          >
            <Menu aria-hidden="true" size={22} />
          </summary>
          <div className="absolute left-0 right-0 top-full z-50 border-b border-[var(--color-border)] bg-[var(--color-surface-cream)] px-4 py-4 shadow-md">
            <nav className="flex flex-col gap-1 text-sm font-medium text-[var(--color-brown-mid)]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-11 items-center"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-1 border-[var(--color-border)]" />
              {profile ? (
                <>
                  <Link href="/mypage" className="flex min-h-11 items-center">
                    마이페이지
                  </Link>
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      className="flex min-h-11 w-full items-center text-left"
                    >
                      로그아웃
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex min-h-11 items-center">
                    로그인
                  </Link>
                  <Link href="/signup" className="flex min-h-11 items-center">
                    회원가입
                  </Link>
                </>
              )}
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
