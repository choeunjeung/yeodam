import Link from "next/link";
import Badge from "@/components/common/Badge";
import PreviewNotice from "@/components/common/PreviewNotice";
import { MOCK_PROVIDERS, MOCK_REQUESTS } from "@/lib/constants/mock-data";

// 실제 로그인 연결 전까지는 예시 데이터로 화면 구성을 보여줍니다.
const EXAMPLE_PROFILE = { name: "김미경", nickname: "다정한손길", phone: "010-1234-5678" };
const myProvider = MOCK_PROVIDERS[0];
const myRequests = [MOCK_REQUESTS[0], MOCK_REQUESTS[2]];

export default function MyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PreviewNotice />

      <h1 className="text-2xl font-bold text-[var(--color-brown-deep)]">
        마이페이지
      </h1>

      <section className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-5">
        <h2 className="font-semibold text-[var(--color-brown-deep)]">
          기본 회원정보
        </h2>
        <dl className="mt-3 space-y-1 text-sm text-[var(--color-brown-mid)]">
          <div className="flex gap-2">
            <dt className="w-16 shrink-0">이름</dt>
            <dd>{EXAMPLE_PROFILE.name}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 shrink-0">닉네임</dt>
            <dd>{EXAMPLE_PROFILE.nickname}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 shrink-0">연락처</dt>
            <dd>{EXAMPLE_PROFILE.phone}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[var(--color-brown-deep)]">
            내 제공자 프로필
          </h2>
          <Badge variant={myProvider.status === "ACTIVE" ? "active" : "paused"}>
            {myProvider.status === "ACTIVE" ? "모집중" : "휴식중"}
          </Badge>
        </div>
        <p className="mt-2 text-sm text-[var(--color-brown-deep)]">
          {myProvider.headline}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/providers/${myProvider.id}/edit`}
            className="flex min-h-11 items-center rounded-full border border-[var(--color-border)] px-4 text-sm font-medium text-[var(--color-brown-deep)] hover:bg-[var(--color-beige-light)]"
          >
            프로필 수정
          </Link>
          <button
            type="button"
            className="flex min-h-11 items-center rounded-full border border-[var(--color-border)] px-4 text-sm font-medium text-[var(--color-brown-deep)] hover:bg-[var(--color-beige-light)]"
          >
            활동 상태 변경
          </button>
        </div>
      </section>

      <section className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-5">
        <h2 className="font-semibold text-[var(--color-brown-deep)]">
          내가 작성한 요청글
        </h2>
        <ul className="mt-3 space-y-3">
          {myRequests.map((request) => (
            <li
              key={request.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--color-border)] p-3"
            >
              <div>
                <Badge variant={request.status === "OPEN" ? "open" : "closed"}>
                  {request.status === "OPEN" ? "모집중" : "마감"}
                </Badge>
                <p className="mt-1 text-sm font-medium text-[var(--color-brown-deep)]">
                  {request.title}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/requests/${request.id}/edit`}
                  className="flex min-h-9 items-center rounded-full border border-[var(--color-border)] px-3 text-xs font-medium text-[var(--color-brown-deep)] hover:bg-[var(--color-beige-light)]"
                >
                  수정
                </Link>
                <button
                  type="button"
                  className="flex min-h-9 items-center rounded-full border border-[var(--color-border)] px-3 text-xs font-medium text-[var(--color-brown-deep)] hover:bg-[var(--color-beige-light)]"
                >
                  마감
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
