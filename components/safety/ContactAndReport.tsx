"use client";

import { useRef, useState } from "react";
import { maskContact } from "@/lib/utils/mask-contact";

const REPORT_REASONS = [
  "허위 정보",
  "부적절한 요청",
  "금전 사기 의심",
  "성희롱 또는 불쾌한 표현",
  "불법 서비스",
  "개인정보 침해",
  "기타",
];

export default function ContactAndReport({
  contactMethod,
  contactValue,
}: {
  contactMethod: string;
  contactValue: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openReportDialog() {
    setReportSubmitted(false);
    dialogRef.current?.showModal();
  }

  function handleReportSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setReportSubmitted(true);
  }

  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-5">
      <div className="rounded-[var(--radius-card)] bg-[var(--color-beige-light)]/60 p-4 text-sm text-[var(--color-brown-mid)]">
        여담은 이용자 간 직접 연결을 돕는 게시판형 서비스입니다. 첫 만남은
        공개된 장소에서 진행하고, 선입금이나 과도한 개인정보 요구에 주의해
        주세요.
      </div>

      <div>
        <p className="text-xs text-[var(--color-brown-mid)]">
          {contactMethod}
        </p>
        <p className="text-lg font-semibold text-[var(--color-brown-deep)]">
          {revealed ? contactValue : maskContact(contactValue)}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-[var(--color-accent-terracotta)] px-4 text-sm font-semibold text-white hover:opacity-90"
        >
          {revealed ? "연락처 다시 가리기" : "연락처 전체 확인"}
        </button>
        <button
          type="button"
          onClick={openReportDialog}
          className="flex min-h-12 items-center justify-center rounded-full border border-[var(--color-border)] px-4 text-sm font-semibold text-[var(--color-brown-deep)] hover:bg-[var(--color-beige-light)]"
        >
          신고하기
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="report-dialog-title"
        className="w-[min(28rem,90vw)] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-0 backdrop:bg-black/40"
      >
        <form onSubmit={handleReportSubmit} className="p-6">
          <h2
            id="report-dialog-title"
            className="text-lg font-bold text-[var(--color-brown-deep)]"
          >
            신고하기
          </h2>

          {reportSubmitted ? (
            <div className="mt-4">
              <p className="text-sm text-[var(--color-brown-deep)]">
                신고가 접수되었습니다.
              </p>
              <p className="mt-1 text-xs text-[var(--color-brown-mid)]">
                (미리보기 화면이라 실제로 저장되지는 않습니다.)
              </p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="mt-5 min-h-11 w-full rounded-full bg-[var(--color-accent-terracotta)] text-sm font-semibold text-white"
              >
                닫기
              </button>
            </div>
          ) : (
            <>
              <label
                htmlFor="report-reason"
                className="mt-4 block text-sm font-medium text-[var(--color-brown-deep)]"
              >
                신고 사유
              </label>
              <select
                id="report-reason"
                name="reason"
                required
                className="mt-1 min-h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm"
              >
                {REPORT_REASONS.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>

              <label
                htmlFor="report-description"
                className="mt-4 block text-sm font-medium text-[var(--color-brown-deep)]"
              >
                상세 내용
              </label>
              <textarea
                id="report-description"
                name="description"
                rows={4}
                className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm"
                placeholder="상황을 자세히 알려주세요."
              />

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => dialogRef.current?.close()}
                  className="min-h-11 flex-1 rounded-full border border-[var(--color-border)] text-sm font-semibold text-[var(--color-brown-deep)]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="min-h-11 flex-1 rounded-full bg-[var(--color-accent-terracotta)] text-sm font-semibold text-white"
                >
                  제출
                </button>
              </div>
            </>
          )}
        </form>
      </dialog>
    </div>
  );
}
