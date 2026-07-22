# CLAUDE.md

이 파일은 이 저장소에서 작업하는 Claude Code(claude.ai/code)를 위한 안내 문서입니다.

@AGENTS.md

## 명령어

```bash
npm run dev      # Turbopack 개발 서버, http://localhost:3000 (.claude/launch.json 에 "yeodam-dev" 로 등록됨)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 빌드 실행
npm run lint     # eslint (flat config: eslint-config-next core-web-vitals + typescript)
```

이 프로젝트에는 테스트 러너가 구성되어 있지 않습니다 (test 스크립트 없음, Jest/Vitest 의존성 없음).

## 배포

- Vercel 배포는 사용자가 명시적으로 "배포해줘"라고 요청했을 때만 실행한다. 코드를 수정했다고 해서 자동으로 배포하지 않는다.

## 이 프로젝트는 무엇인가

**여담(女談)** — 7일 개발 대회 출품용으로 만든, 여성 전용 "생활 경험" 매칭 게시판입니다. 간병, 운전, 살림, 반려동물 돌봄 등 정식 경력은 아니지만 생활 속에서 쌓은 경험이 있는 여성이 제공자로 등록하고, 도움이 필요한 여성이 요청글을 올립니다. 화면 구성, 권한표, 필수 입력 항목, 카피 톤 등 전체 제품 스펙은 [PRD.md](PRD.md)에, 브랜드 보이스/카피 참고 자료는 [여담_웹사이트콘텐츠.txt](여담_웹사이트콘텐츠.txt)에 있습니다. 네이밍, 톤, 필드의 의미처럼 제품과 관련된 판단이 필요할 때는 코드만 보고 추측하지 말고 이 문서들을 먼저 확인하세요.

## 현재 단계: mock 데이터 기반, Supabase 미연동

지금 앱은 화면 이동은 전부 가능하지만 실제로는 아무것도 저장되지 않습니다 — [lib/constants/mock-data.ts](lib/constants/mock-data.ts)의 정적 데이터(`MOCK_CATEGORIES`, `SERVICE_ITEMS_BY_CATEGORY`, `MOCK_PROVIDERS`, `MOCK_REQUESTS`)만으로 동작합니다. 폼은 Zod로 값을 검증한 뒤 "저장/게시되었습니다 (미리보기 화면)"라는 정적 완료 상태로 끝나며, Supabase를 실제로 호출하지 않습니다.

[types/database.ts](types/database.ts)는 `supabase/` 마이그레이션이 나중에 구현할 *목표* Postgres 스키마(profiles, categories, service_items, provider_profiles, request_posts, reports)를 이미 정의해 두었습니다 — 마이그레이션을 추가할 때 이 파일도 함께 맞춰주세요. 그리고 mock 데이터 조회를 실제 쿼리로 바꿀 때는 [lib/queries/categories.ts](lib/queries/categories.ts)를 템플릿으로 삼으세요 (아래 fail-soft 패턴 참고).

**Fail-soft 설정 패턴 (전역적으로 쓰이는 패턴이니 새 연동을 추가할 때도 따라주세요):** 선택적 외부 서비스에 의존하는 코드는 항상 그 서비스가 설정되어 있는지 먼저 확인하고, 에러를 던지는 대신 안전한 기본값을 반환합니다.
- [lib/supabase/get-current-profile.ts](lib/supabase/get-current-profile.ts)와 [lib/queries/categories.ts](lib/queries/categories.ts)의 `isSupabaseConfigured()` — `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`가 없으면 `null`/`[]`/폴백 데이터를 반환합니다.
- [proxy.ts](proxy.ts) (아래 참고) — Supabase 환경변수가 없으면 요청을 그대로 통과시킵니다.
- [lib/upstage/client.ts](lib/upstage/client.ts) — `chatComplete()`/`embed()`는 `UPSTAGE_API_KEY`가 없거나 호출이 실패하면 예외를 던지지 않고 `{ ok: false, error }`를 반환합니다. 호출하는 쪽은 이 결과를 받아 에러를 인라인으로 보여주거나(자기소개 다듬기), 사용자 흐름을 막지 않도록 fail-open 처리하거나 기능 자체를 조용히 숨깁니다(안전 검수, 제공자 매칭).

## 아키텍처 메모

- **권한**: 시스템 역할은 `user`, `admin` 두 개뿐입니다 ([types/database.ts](types/database.ts)). "제공자"는 역할이 아니라 해당 유저의 `provider_profiles` 행이 존재하는지로 판단합니다. PRD는 Supabase 연동 후 이를 RLS로 실제 강제해야 한다고 명시하고 있으며, 프론트엔드에서 버튼만 숨기는 방식은 허용하지 않습니다 ([PRD.md](PRD.md) §6).
- **폼** ([components/forms/ProviderForm.tsx](components/forms/ProviderForm.tsx), [RequestForm.tsx](components/forms/RequestForm.tsx)): `"use client"` 컴포넌트가 `new FormData(e.currentTarget)`로 제출값을 읽고, 제어가 필요한 부분(카테고리에 따라 바뀌는 세부 서비스 칩, AI로 수정 가능한 textarea)은 `useState`로 관리합니다. [lib/validations/*.ts](lib/validations)의 Zod 스키마로 파싱한 뒤, `result.error.issues`를 `Record<field, message>` 형태로 매핑해 인라인 에러로 보여줍니다.
- **AI 기능** ([lib/upstage/client.ts](lib/upstage/client.ts), `app/api/ai/*`, [lib/ai/](lib/ai)): Upstage Solar Chat 완성형 API와 Embeddings로 자기소개 다듬기, [lib/constants/safety.ts](lib/constants/safety.ts)의 금지 서비스 목록에 기반한 게시 전 안전 검수, 요청글 상세 화면의 의미 기반 제공자 매칭을 구현했습니다. Upstage 호출은 전부 서버 전용(라우트/서버 컴포넌트)이며, API 키가 노출되는 클라이언트에서는 절대 호출하지 않습니다.
- **스타일링**: Tailwind v4를 쓰지만, 팔레트는 전부 [app/globals.css](app/globals.css)에 정의된 커스텀 CSS 변수(`--color-brown-deep`, `--color-accent-terracotta`, `--color-urgent`, `--radius-card` 등)이며, `text-[var(--color-brown-deep)]`나 `bg-[var(--color-accent-terracotta)]`처럼 완전한 토큰 이름을 그대로 넣은 arbitrary-value 유틸리티로 사용합니다. 기본 Tailwind 팔레트 클래스(`bg-red-500` 등)를 쓰지 말고 기존 토큰을 사용해 브랜드 톤을 유지하세요. **주의**: Tailwind v4는 Markdown을 포함한 프로젝트 전체를 스캔해 클래스처럼 보이는 문자열을 찾기 때문에, 문서나 주석에 예시를 쓸 때도 실제로 존재하는 완전한 토큰 이름만 사용해야 합니다 — 잘려 있거나 자리표시자(placeholder, 예를 들어 말줄임표)가 들어간 arbitrary-value 클래스 예시를 그대로 적으면 빌드가 깨집니다.
- **lucide-react가 이례적으로 높은 버전에 고정되어 있습니다** (`^1.25.0`, 일반적인 0.x대가 아님). 일부 아이콘은 이름이 바뀌었거나 지금은 별칭(alias)으로만 남아 있습니다 (예: `Loader2`는 이제 `LoaderCircle`의 별칭). 어떤 아이콘이 실제로 존재하는지, 학습 데이터가 알고 있는 것과 같게 동작하는지는 가정하지 말고 `node_modules/lucide-react/dist/lucide-react.d.ts`에서 해당 아이콘의 `@name`을 먼저 확인하세요.
- **경로 별칭**: `@/*` → 프로젝트 루트 ([tsconfig.json](tsconfig.json) 참고).
- 서버 전용 환경변수(`SUPABASE_SERVICE_ROLE_KEY`, `UPSTAGE_API_KEY`)는 절대 `"use client"` 파일에서 import하면 안 됩니다 — 전체 목록과 공개(`NEXT_PUBLIC_*`)/서버 전용 구분은 [.env.example](.env.example)을 참고하세요.
