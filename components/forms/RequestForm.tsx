"use client";

import { useState } from "react";
import {
  requestFormSchema,
  type RequestFormValues,
} from "@/lib/validations/request";
import {
  MOCK_CATEGORIES,
  SERVICE_ITEMS_BY_CATEGORY,
} from "@/lib/constants/mock-data";
import { checkSafety } from "@/lib/ai/check-safety-client";

type FormErrors = Partial<Record<keyof RequestFormValues, string>>;

export default function RequestForm() {
  const [categorySlug, setCategorySlug] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [safetyWarning, setSafetyWarning] = useState<string | null>(null);

  const availableItems = SERVICE_ITEMS_BY_CATEGORY[categorySlug] ?? [];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const raw = {
      categorySlug,
      serviceItem: String(form.get("serviceItem") ?? "") || undefined,
      title: String(form.get("title") ?? ""),
      content: String(form.get("content") ?? ""),
      desiredDate: String(form.get("desiredDate") ?? ""),
      desiredTime: String(form.get("desiredTime") ?? "") || undefined,
      durationText: String(form.get("durationText") ?? "") || undefined,
      budgetText: String(form.get("budgetText") ?? "") || undefined,
      isNegotiable: form.get("isNegotiable") === "on",
      isUrgent: form.get("isUrgent") === "on",
      contactMethod: form.get("contactMethod") as "PHONE" | "KAKAO",
      contactValue: String(form.get("contactValue") ?? ""),
    };

    const result = requestFormSchema.safeParse(raw);
    if (!result.success) {
      const nextErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof RequestFormValues;
        nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSafetyWarning(null);
    setIsChecking(true);
    const safety = await checkSafety(result.data.content);
    setIsChecking(false);

    if (safety.flagged) {
      setSafetyWarning(
        safety.reason || "안전 안내에 어긋날 수 있는 내용이 포함되어 있어요."
      );
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-8 text-center">
        <p className="text-lg font-semibold text-[var(--color-brown-deep)]">
          요청글이 게시되었습니다.
        </p>
        <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
          (미리보기 화면이라 실제로는 저장되지 않았습니다. 실제 저장은
          Supabase 연결 이후 동작합니다.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label
          htmlFor="categorySlug"
          className="block text-sm font-medium text-[var(--color-brown-deep)]"
        >
          대분류 카테고리
        </label>
        <select
          id="categorySlug"
          value={categorySlug}
          onChange={(e) => setCategorySlug(e.target.value)}
          className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
        >
          <option value="">선택해 주세요</option>
          {MOCK_CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.categorySlug && (
          <p className="mt-1 text-sm text-[var(--color-urgent)]">
            {errors.categorySlug}
          </p>
        )}
      </div>

      {categorySlug && (
        <div>
          <label
            htmlFor="serviceItem"
            className="block text-sm font-medium text-[var(--color-brown-deep)]"
          >
            세부 서비스 (선택 사항)
          </label>
          <select
            id="serviceItem"
            name="serviceItem"
            className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
          >
            <option value="">선택 없음</option>
            {availableItems.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-[var(--color-brown-deep)]"
        >
          제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
          placeholder="예: 어머니 병원 동행 부탁드려요"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-[var(--color-urgent)]">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-[var(--color-brown-deep)]"
        >
          요청 내용
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-base"
          placeholder="필요한 도움을 구체적으로 알려주세요."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-[var(--color-urgent)]">
            {errors.content}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="desiredDate"
            className="block text-sm font-medium text-[var(--color-brown-deep)]"
          >
            희망 날짜
          </label>
          <input
            id="desiredDate"
            name="desiredDate"
            type="date"
            className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
          />
          {errors.desiredDate && (
            <p className="mt-1 text-sm text-[var(--color-urgent)]">
              {errors.desiredDate}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="desiredTime"
            className="block text-sm font-medium text-[var(--color-brown-deep)]"
          >
            희망 시간 (선택)
          </label>
          <input
            id="desiredTime"
            name="desiredTime"
            type="text"
            placeholder="예: 오전 9시"
            className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="durationText"
            className="block text-sm font-medium text-[var(--color-brown-deep)]"
          >
            예상 소요시간 (선택)
          </label>
          <input
            id="durationText"
            name="durationText"
            type="text"
            placeholder="예: 약 3시간"
            className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
          />
        </div>
        <div>
          <label
            htmlFor="budgetText"
            className="block text-sm font-medium text-[var(--color-brown-deep)]"
          >
            사례비 (선택)
          </label>
          <input
            id="budgetText"
            name="budgetText"
            type="text"
            placeholder="예: 5만원"
            className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
          />
        </div>
      </div>

      <div className="flex gap-6 text-sm text-[var(--color-brown-deep)]">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isNegotiable" />
          협의 가능
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isUrgent" />
          긴급 요청
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-[var(--color-brown-deep)]">
          연락 방법
        </legend>
        <div className="mt-2 flex gap-4 text-sm text-[var(--color-brown-deep)]">
          <label className="flex items-center gap-2">
            <input type="radio" name="contactMethod" value="PHONE" defaultChecked />
            전화
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="contactMethod" value="KAKAO" />
            카카오톡
          </label>
        </div>
        {errors.contactMethod && (
          <p className="mt-1 text-sm text-[var(--color-urgent)]">
            {errors.contactMethod}
          </p>
        )}
      </fieldset>

      <div>
        <label
          htmlFor="contactValue"
          className="block text-sm font-medium text-[var(--color-brown-deep)]"
        >
          연락처
        </label>
        <input
          id="contactValue"
          name="contactValue"
          type="text"
          className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
          placeholder="예: 010-1234-5678"
        />
        {errors.contactValue && (
          <p className="mt-1 text-sm text-[var(--color-urgent)]">
            {errors.contactValue}
          </p>
        )}
      </div>

      {safetyWarning && (
        <p className="rounded-[var(--radius-card)] border border-[var(--color-urgent)] bg-white p-4 text-sm text-[var(--color-urgent)]">
          {safetyWarning} 내용을 다시 확인해 주세요.
        </p>
      )}

      <button
        type="submit"
        disabled={isChecking}
        className="min-h-12 w-full rounded-full bg-[var(--color-accent-terracotta)] text-base font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {isChecking ? "안전 검수 중..." : "요청글 게시하기"}
      </button>
    </form>
  );
}
