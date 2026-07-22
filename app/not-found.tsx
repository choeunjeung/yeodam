import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold text-[var(--color-accent-terracotta)]">
        404
      </p>
      <h1 className="mt-2 text-xl font-bold text-[var(--color-brown-deep)]">
        페이지를 찾을 수 없습니다.
      </h1>
      <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
        주소가 잘못되었거나, 페이지가 삭제되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent-terracotta)] px-6 text-sm font-semibold text-white hover:opacity-90"
      >
        메인으로 돌아가기
      </Link>
    </div>
  );
}
