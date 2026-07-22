import { SAFETY_LIMITS } from "@/lib/constants/safety";

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-[var(--color-brown-deep)]">
        이용방법 및 안전 안내
      </h1>

      <section className="mt-8">
        <h2 className="font-semibold text-[var(--color-brown-deep)]">
          서비스 소개
        </h2>
        <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
          여담은 생활 속에서 쌓아온 경험을 필요한 이웃과 연결하는 게시판형
          서비스입니다. 여담은 제공자를 직접 고용하거나 서비스를 제공하지
          않으며, 이용자와 제공자가 서로를 발견하고 직접 연락할 수 있도록
          돕는 역할만 합니다.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-brown-deep)]">
            제공자 이용 방법
          </h2>
          <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
            회원가입 → 제공자 프로필 등록 → 목록에 노출 → 연락받고 직접 연결
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-brown-deep)]">
            이용자 이용 방법
          </h2>
          <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
            카테고리 선택 → 제공자 목록 확인 → 로그인 후 연락처 확인 → 직접
            연락
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold text-[var(--color-brown-deep)]">
          3단계 이용법
        </h2>
        <ol className="mt-3 grid gap-3 sm:grid-cols-3">
          {["경험 등록", "요청 확인", "연락하기"].map((step, i) => (
            <li
              key={step}
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-4 text-center text-sm font-medium text-[var(--color-brown-deep)]"
            >
              {i + 1}. {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold text-[var(--color-brown-deep)]">
          연락 전 확인 사항 · 첫 만남 안전 수칙
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--color-brown-mid)]">
          <li>첫 만남은 반드시 공개된 장소에서 진행해 주세요.</li>
          <li>선입금이나 과도한 개인정보 요구에 주의해 주세요.</li>
          <li>서비스 내용과 사례비를 미리 명확히 확인해 주세요.</li>
          <li>불편하거나 위험하다고 느껴지면 즉시 신고해 주세요.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold text-[var(--color-brown-deep)]">
          금지 서비스 안내
        </h2>
        <div className="mt-3 space-y-4">
          {SAFETY_LIMITS.map((item) => (
            <div
              key={item.category}
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-4"
            >
              <p className="font-medium text-[var(--color-brown-deep)]">
                {item.category}
              </p>
              {item.possible.length > 0 && (
                <p className="mt-1 text-sm text-[var(--color-success)]">
                  가능: {item.possible.join(", ")}
                </p>
              )}
              <p className="mt-1 text-sm text-[var(--color-urgent)]">
                불가능: {item.impossible.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-beige-light)]/60 p-5">
        <h2 className="font-semibold text-[var(--color-brown-deep)]">
          플랫폼의 역할 · 본인인증 안내
        </h2>
        <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
          여담은 이용자와 제공자를 연결하는 게시판형 플랫폼이며, 서비스를
          직접 제공하거나 거래를 중개하지 않습니다. 현재는 본인인증을
          제공하지 않으니, 연락 및 만남 시 스스로 안전을 확인해 주세요.
        </p>
      </section>
    </div>
  );
}
