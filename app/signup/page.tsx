import Link from "next/link";
import PreviewNotice from "@/components/common/PreviewNotice";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <PreviewNotice />
      <h1 className="text-2xl font-bold text-[var(--color-brown-deep)]">
        회원가입
      </h1>
      <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
        여담과 함께 생활 속 경험을 나눠보세요.
      </p>
      <div className="mt-6">
        <SignupForm />
      </div>
      <p className="mt-6 text-center text-sm text-[var(--color-brown-mid)]">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-semibold text-[var(--color-accent-terracotta)] hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
