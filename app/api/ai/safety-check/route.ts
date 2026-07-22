import { NextResponse } from "next/server";
import { chatComplete } from "@/lib/upstage/client";
import { SAFETY_LIMITS } from "@/lib/constants/safety";

const PROHIBITED_LIST = SAFETY_LIMITS.map(
  (limit) => `- ${limit.category}: ${limit.impossible.join(", ")}`
).join("\n");

const SYSTEM_PROMPT = `당신은 "여담(女談)"이라는 여성 전용 생활 경험 매칭 플랫폼의 게시글 검수자입니다.
여담은 이용자와 제공자가 직접 연락해 만나는 게시판형 서비스이며, 다음 서비스는 카테고리별로 금지되어 있습니다.

${PROHIBITED_LIST}

다음도 위험 신호로 간주해 flagged: true 로 표시하세요.
- 선입금, 급전, 대출 등 금전 사기로 의심되는 문구
- 성적인 서비스나 성희롱으로 읽힐 수 있는 문구
- 불법 행위 요청
- 과도한 개인정보(주민번호, 계좌번호 등)를 직접 요구하는 문구

위 목록에 해당하지 않는 일반적인 생활 도움 요청/소개는 flagged: false로 판단하세요.
JSON으로만 답하세요.`;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    flagged: { type: "boolean" },
    reason: { type: "string" },
  },
  required: ["flagged", "reason"],
  additionalProperties: false,
};

export async function POST(request: Request) {
  const { text } = await request.json();

  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ flagged: false, reason: "" });
  }

  const result = await chatComplete({
    system: SYSTEM_PROMPT,
    user: `다음 글을 검수해 주세요:\n\n${text}`,
    jsonSchema: { name: "safety_check", schema: RESPONSE_SCHEMA },
  });

  if (!result.ok) {
    // API 오류 시 게시 자체를 막지 않습니다 (fail-open).
    return NextResponse.json({ flagged: false, reason: "" });
  }

  try {
    const parsed = JSON.parse(result.content);
    return NextResponse.json({
      flagged: Boolean(parsed.flagged),
      reason: typeof parsed.reason === "string" ? parsed.reason : "",
    });
  } catch {
    return NextResponse.json({ flagged: false, reason: "" });
  }
}
