import Link from "next/link";
import Image from "next/image";
import {
  HeartHandshake,
  ShieldCheck,
  Search,
  UserPlus,
  MessageCircleQuestion,
} from "lucide-react";
import { getFeaturedCategories } from "@/lib/queries/categories";

const FAQ_PREVIEW = [
  {
    q: "여담은 어떤 서비스인가요?",
    a: "생활 속에서 쌓아온 경험을 필요한 이웃과 연결하는 게시판형 서비스입니다.",
  },
  {
    q: "여담이 제공자를 직접 고용하나요?",
    a: "아니요. 여담은 이용자와 제공자가 서로를 발견하고 직접 연락하도록 돕는 연결 플랫폼입니다.",
  },
  {
    q: "본인인증이 제공되나요?",
    a: "현재는 본인인증을 제공하지 않습니다. 첫 만남은 공개된 장소에서 진행해 주세요.",
  },
];

const FLOW_STEPS = [
  { icon: UserPlus, title: "경험 등록", desc: "내 생활 경험을 프로필로 등록해요" },
  { icon: Search, title: "요청 확인", desc: "필요한 도움을 찾거나 요청글을 확인해요" },
  {
    icon: MessageCircleQuestion,
    title: "연락하기",
    desc: "로그인 후 연락처를 확인하고 직접 연결해요",
  },
];

export default async function HomePage() {
  const categories = await getFeaturedCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      {/* 히어로 영역 */}
      <section className="text-center">
        <p className="text-sm font-semibold tracking-wide text-[var(--color-accent-terracotta)]">
          경력이 없어도, 경험은 있습니다.
        </p>
        <h1 className="mt-3 flex flex-col items-center gap-2 text-3xl font-bold leading-snug text-[var(--color-brown-deep)] sm:text-4xl">
          <span className="flex items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt=""
              width={272}
              height={187}
              className="h-10 w-auto sm:h-12"
            />
            오랜 생활 속에서 쌓아온 경험이
          </span>
          누군가에게는 꼭 필요한 도움이 될 수 있습니다.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--color-brown-mid)]">
          여담은 살림, 정리수납, 반려동물 돌봄, 스마트폰 사용 도움 등 생활 속
          <br />
          경험을 필요한 이웃과 연결하는 게시판형 서비스입니다.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/providers/new"
            className="flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent-terracotta)] px-6 text-sm font-semibold text-white hover:opacity-90"
          >
            내 경험 등록하기
          </Link>
          <Link
            href="/requests/new"
            className="flex min-h-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-cream)] px-6 text-sm font-semibold text-[var(--color-brown-deep)] hover:bg-[var(--color-beige-light)]"
          >
            도움 요청하기
          </Link>
          <Link
            href="/providers"
            className="flex min-h-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-cream)] px-6 text-sm font-semibold text-[var(--color-brown-deep)] hover:bg-[var(--color-beige-light)]"
          >
            제공자 찾아보기
          </Link>
        </div>
      </section>

      {/* 대표 카테고리 */}
      <section className="mt-20">
        <h2 className="text-xl font-bold text-[var(--color-brown-deep)]">
          대표 카테고리
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/providers?category=${category.slug}`}
              className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-4 text-center text-sm font-medium text-[var(--color-brown-deep)] shadow-sm hover:border-[var(--color-accent-terracotta)]"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      {/* 여담이 필요한 이유 */}
      <section className="mt-20 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-brown-deep)]">
            여담이 필요한 이유
          </h2>
          <p className="mt-3 text-[var(--color-brown-mid)]">
            경력이 없거나 경력단절이 길고 정규채용 시장에서의 부담과
            압박에서 벗어나 생활속에서 오래 쌓아온 경험은 실제로 다른
            분들에게 꼭 필요한 경험이 될 수 있습니다.
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-beige-light)]/60 p-6">
          <div className="flex items-center gap-2 text-[var(--color-brown-deep)]">
            <HeartHandshake size={20} aria-hidden="true" />
            <p className="font-semibold">여담이 하는 일</p>
          </div>
          <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
            여담은 제공자를 직접 고용하거나 서비스를 제공하는 업체가
            아닙니다. 이용자와 제공자가 서로를 발견하고 직접 연락할 수
            있도록 돕는 게시판형 연결 플랫폼입니다.
          </p>
        </div>
      </section>

      {/* 이용 흐름 */}
      <section className="mt-20">
        <h2 className="text-xl font-bold text-[var(--color-brown-deep)]">
          제공자와 이용자, 이렇게 이용해요
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-6">
            <p className="font-semibold text-[var(--color-brown-deep)]">
              제공자라면
            </p>
            <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
              회원가입 → 제공자 프로필 등록 → 목록에 노출 → 연락받고 직접
              연결
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-6">
            <p className="font-semibold text-[var(--color-brown-deep)]">
              이용자라면
            </p>
            <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
              카테고리 선택 → 제공자 목록 확인 → 로그인 후 연락처 확인 →
              직접 연락
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-beige-light)] text-[var(--color-accent-terracotta)]">
                <step.icon size={22} aria-hidden="true" />
              </div>
              <p className="mt-3 text-sm font-semibold text-[var(--color-brown-deep)]">
                {i + 1}. {step.title}
              </p>
              <p className="mt-1 text-sm text-[var(--color-brown-mid)]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 안전 안내 */}
      <section className="mt-20 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-6">
        <div className="flex items-center gap-2 text-[var(--color-brown-deep)]">
          <ShieldCheck size={20} aria-hidden="true" />
          <p className="font-semibold">안전 안내</p>
        </div>
        <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
          여담은 이용자 간 직접 연결을 돕는 게시판형 서비스입니다. 첫 만남은
          공개된 장소에서 진행하고, 선입금이나 과도한 개인정보 요구에 주의해
          주세요.
        </p>
        <Link
          href="/guide"
          className="mt-3 inline-block text-sm font-semibold text-[var(--color-accent-terracotta)] hover:underline"
        >
          이용방법 및 안전 안내 자세히 보기
        </Link>
      </section>

      {/* FAQ 일부 */}
      <section className="mt-20">
        <h2 className="text-xl font-bold text-[var(--color-brown-deep)]">
          자주 묻는 질문
        </h2>
        <div className="mt-5 space-y-3">
          {FAQ_PREVIEW.map((item) => (
            <details
              key={item.q}
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold text-[var(--color-brown-deep)]">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
        <Link
          href="/faq"
          className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent-terracotta)] hover:underline"
        >
          FAQ 전체 보기
        </Link>
      </section>
    </div>
  );
}
