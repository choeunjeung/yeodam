"use client";

import { useState } from "react";
import { Loader2, Sparkles, Undo2 } from "lucide-react";
import {
  providerFormSchema,
  type ProviderFormValues,
} from "@/lib/validations/provider";
import {
  MOCK_CATEGORIES,
  SERVICE_ITEMS_BY_CATEGORY,
} from "@/lib/constants/mock-data";
import { checkSafety } from "@/lib/ai/check-safety-client";

type FormErrors = Partial<Record<keyof ProviderFormValues, string>>;

function PolishableTextarea({
  id,
  name,
  label,
  field,
  rows,
  placeholder,
  value,
  onChange,
  error,
}: {
  id: string;
  name: string;
  label: string;
  field: "experienceDescription" | "introduction";
  rows: number;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishError, setPolishError] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string | null>(null);

  async function handlePolish() {
    if (!value.trim()) {
      setPolishError("먼저 내용을 입력해 주세요.");
      return;
    }

    setIsPolishing(true);
    setPolishError(null);

    try {
      const res = await fetch("/api/ai/polish-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field, text: value }),
      });
      const data = await res.json();

      if (!res.ok) {
        setPolishError(data.error ?? "다듬는 중 오류가 발생했습니다.");
        return;
      }

      setPreviousValue(value);
      onChange(data.polished);
    } catch {
      setPolishError("네트워크 오류로 다듬지 못했습니다.");
    } finally {
      setIsPolishing(false);
    }
  }

  function handleUndo() {
    if (previousValue !== null) {
      onChange(previousValue);
      setPreviousValue(null);
    }
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--color-brown-deep)]"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-base"
      />
      <div className="mt-1.5 flex items-center gap-3">
        <button
          type="button"
          onClick={handlePolish}
          disabled={isPolishing}
          className="flex items-center gap-1 text-sm font-medium text-[var(--color-accent-terracotta)] hover:underline disabled:opacity-60"
        >
          {isPolishing ? (
            <Loader2 aria-hidden="true" size={14} className="animate-spin" />
          ) : (
            <Sparkles aria-hidden="true" size={14} />
          )}
          AI로 다듬기
        </button>
        {previousValue !== null && (
          <button
            type="button"
            onClick={handleUndo}
            className="flex items-center gap-1 text-sm text-[var(--color-brown-mid)] hover:underline"
          >
            <Undo2 aria-hidden="true" size={14} />
            되돌리기
          </button>
        )}
      </div>
      {polishError && (
        <p className="mt-1 text-sm text-[var(--color-urgent)]">
          {polishError}
        </p>
      )}
      {error && (
        <p className="mt-1 text-sm text-[var(--color-urgent)]">{error}</p>
      )}
    </div>
  );
}

export default function ProviderForm() {
  const [categorySlug, setCategorySlug] = useState("");
  const [serviceItems, setServiceItems] = useState<string[]>([]);
  const [experienceDescription, setExperienceDescription] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [safetyWarning, setSafetyWarning] = useState<string | null>(null);

  const availableItems = SERVICE_ITEMS_BY_CATEGORY[categorySlug] ?? [];

  function toggleServiceItem(item: string) {
    setServiceItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const raw = {
      headline: String(form.get("headline") ?? ""),
      categorySlug,
      serviceItems,
      experienceYears: Number(form.get("experienceYears") ?? 0),
      experienceDescription,
      introduction,
      contactMethod: form.get("contactMethod") as "PHONE" | "KAKAO",
      contactValue: String(form.get("contactValue") ?? ""),
    };

    const result = providerFormSchema.safeParse(raw);
    if (!result.success) {
      const nextErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ProviderFormValues;
        nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSafetyWarning(null);
    setIsChecking(true);
    const safety = await checkSafety(
      `${result.data.experienceDescription}\n${result.data.introduction}`
    );
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
          프로필이 저장되었습니다.
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
          htmlFor="headline"
          className="block text-sm font-medium text-[var(--color-brown-deep)]"
        >
          프로필 제목
        </label>
        <input
          id="headline"
          name="headline"
          type="text"
          className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
          placeholder="예: 부모님 병원 동행 10년 경험으로 편안하게 함께해 드려요"
        />
        {errors.headline && (
          <p className="mt-1 text-sm text-[var(--color-urgent)]">
            {errors.headline}
          </p>
        )}
      </div>

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
          onChange={(e) => {
            setCategorySlug(e.target.value);
            setServiceItems([]);
          }}
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
          <p className="block text-sm font-medium text-[var(--color-brown-deep)]">
            세부 서비스 (1개 이상 선택)
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {availableItems.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => toggleServiceItem(item)}
                className={`min-h-9 rounded-full border px-3 py-1.5 text-sm ${
                  serviceItems.includes(item)
                    ? "border-[var(--color-accent-terracotta)] bg-[var(--color-accent-terracotta)]/10 text-[var(--color-accent-terracotta)]"
                    : "border-[var(--color-border)] text-[var(--color-brown-mid)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          {errors.serviceItems && (
            <p className="mt-1 text-sm text-[var(--color-urgent)]">
              {errors.serviceItems}
            </p>
          )}
        </div>
      )}

      <div>
        <label
          htmlFor="experienceYears"
          className="block text-sm font-medium text-[var(--color-brown-deep)]"
        >
          경험 연수
        </label>
        <input
          id="experienceYears"
          name="experienceYears"
          type="number"
          min={0}
          className="mt-1 min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-base"
        />
        {errors.experienceYears && (
          <p className="mt-1 text-sm text-[var(--color-urgent)]">
            {errors.experienceYears}
          </p>
        )}
      </div>

      <PolishableTextarea
        id="experienceDescription"
        name="experienceDescription"
        label="경험 설명"
        field="experienceDescription"
        rows={3}
        placeholder="어떤 경험을 쌓아오셨는지 구체적으로 알려주세요."
        value={experienceDescription}
        onChange={setExperienceDescription}
        error={errors.experienceDescription}
      />

      <PolishableTextarea
        id="introduction"
        name="introduction"
        label="자기소개"
        field="introduction"
        rows={3}
        value={introduction}
        onChange={setIntroduction}
        error={errors.introduction}
      />

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
        {isChecking ? "안전 검수 중..." : "저장하기"}
      </button>
    </form>
  );
}
