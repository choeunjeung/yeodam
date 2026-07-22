import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Next.js 16: `middleware.ts` -> `proxy.ts`, export 이름도 `proxy`로 변경되었습니다.
// Supabase 세션 쿠키를 요청마다 갱신해 로그인 상태가 끊기지 않도록 합니다.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Supabase 환경변수가 아직 설정되지 않았다면(.env.local 미생성) 통과시킵니다.
  // Phase 1 단계에서 Supabase 프로젝트 없이도 화면을 확인할 수 있도록 하기 위함입니다.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 세션 만료 시 토큰을 갱신하기 위해 반드시 호출합니다.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
