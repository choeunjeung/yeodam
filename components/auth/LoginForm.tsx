"use client";

import { useState } from "react";
import { loginFormSchema, type LoginFormValues } from "@/lib/validations/auth";

type FormErrors = Partial<Record<keyof LoginFormValues, string>> & {
  form?: string;
};

export default function LoginForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const raw = {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    };

    const result = loginFormSchema.safeParse(raw);
    if (!result.success) {
      const nextErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof LoginFormValues;
        nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-8 text-center">
        <p className="text-lg font-semibold text-[var(--color-brown-deep)]">
          입력하신 내용이 확인되었습니다.
        </p>
        <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
          (미리보기 화면이라 실제 로그인은 아직 처리되지 않습니다. 실제
          로그인은 Supabase 연결 이후 동작합니다.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-brown-deep)]">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
        />
        {errors.email && <p className="mt-1 text-sm text-[var(--color-urgent)]">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[var(--color-brown-deep)]">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
        />
        {errors.password && <p className="mt-1 text-sm text-[var(--color-urgent)]">{errors.password}</p>}
      </div>

      <p className="text-xs text-[var(--color-brown-mid)]">
        비밀번호 찾기 기능은 현재 제공되지 않습니다.
      </p>

      <button
        type="submit"
        className="min-h-12 w-full rounded-full bg-[var(--color-accent-terracotta)] text-base font-semibold text-white hover:opacity-90"
      >
        로그인
      </button>
    </form>
  );
}
