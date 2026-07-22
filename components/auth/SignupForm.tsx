"use client";

import { useState } from "react";
import { signupFormSchema, type SignupFormValues } from "@/lib/validations/auth";

type FormErrors = Partial<Record<keyof SignupFormValues, string>>;

export default function SignupForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const raw = {
      name: String(form.get("name") ?? ""),
      nickname: String(form.get("nickname") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      passwordConfirm: String(form.get("passwordConfirm") ?? ""),
      phone: String(form.get("phone") ?? ""),
      agreeTerms: form.get("agreeTerms") === "on",
      agreePrivacy: form.get("agreePrivacy") === "on",
      agreeSafety: form.get("agreeSafety") === "on",
    };

    const result = signupFormSchema.safeParse(raw);
    if (!result.success) {
      const nextErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof SignupFormValues;
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
          (미리보기 화면이라 실제 회원가입은 아직 처리되지 않습니다. 실제
          가입은 Supabase 연결 이후 동작합니다.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--color-brown-deep)]">
          이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
        />
        {errors.name && <p className="mt-1 text-sm text-[var(--color-urgent)]">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="nickname" className="block text-sm font-medium text-[var(--color-brown-deep)]">
          닉네임
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
        />
        {errors.nickname && <p className="mt-1 text-sm text-[var(--color-urgent)]">{errors.nickname}</p>}
      </div>

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

      <div>
        <label htmlFor="passwordConfirm" className="block text-sm font-medium text-[var(--color-brown-deep)]">
          비밀번호 확인
        </label>
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
        />
        {errors.passwordConfirm && (
          <p className="mt-1 text-sm text-[var(--color-urgent)]">{errors.passwordConfirm}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-brown-deep)]">
          연락처
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          placeholder="예: 010-1234-5678"
          className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
        />
        {errors.phone && <p className="mt-1 text-sm text-[var(--color-urgent)]">{errors.phone}</p>}
      </div>

      <div className="space-y-2 border-t border-[var(--color-border)] pt-4">
        <label className="flex items-center gap-2 text-sm text-[var(--color-brown-deep)]">
          <input type="checkbox" name="agreeTerms" />
          이용약관에 동의합니다 (필수)
        </label>
        {errors.agreeTerms && <p className="text-sm text-[var(--color-urgent)]">{errors.agreeTerms}</p>}

        <label className="flex items-center gap-2 text-sm text-[var(--color-brown-deep)]">
          <input type="checkbox" name="agreePrivacy" />
          개인정보 수집·이용에 동의합니다 (필수)
        </label>
        {errors.agreePrivacy && <p className="text-sm text-[var(--color-urgent)]">{errors.agreePrivacy}</p>}

        <label className="flex items-center gap-2 text-sm text-[var(--color-brown-deep)]">
          <input type="checkbox" name="agreeSafety" />
          서비스 안전 안내를 확인했습니다 (필수)
        </label>
        {errors.agreeSafety && <p className="text-sm text-[var(--color-urgent)]">{errors.agreeSafety}</p>}
      </div>

      <button
        type="submit"
        className="min-h-12 w-full rounded-full bg-[var(--color-accent-terracotta)] text-base font-semibold text-white hover:opacity-90"
      >
        회원가입
      </button>
    </form>
  );
}
