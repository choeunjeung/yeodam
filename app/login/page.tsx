import Link from "next/link";
import PreviewNotice from "@/components/common/PreviewNotice";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <PreviewNotice />
      <h1 className="text-2xl font-bold text-[var(--color-brown-deep)]">
        로그인
      </h1>
      <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
        로그인 후 연락처를 확인하고 직접 연결할 수 있습니다.
      </p>
      <div className="mt-6">
        <LoginForm />
      </div>
      <p className="mt-6 text-center text-sm text-[var(--color-brown-mid)]">
        아직 계정이 없으신가요?{" "}
        <Link href="/signup" className="font-semibold text-[var(--color-accent-terracotta)] hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
