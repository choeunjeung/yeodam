import { NextResponse } from "next/server";
import { chatComplete } from "@/lib/upstage/client";

const FIELD_GUIDE: Record<string, string> = {
  experienceDescription:
    "'경험 설명' 항목입니다. 어떤 경험을 얼마나 쌓아왔는지 구체적으로 드러나도록 다듬어 주세요.",
  introduction:
    "'자기소개' 항목입니다. 짧고 다정하게, 이용자가 안심하고 연락할 수 있는 느낌으로 다듬어 주세요.",
};

const SYSTEM_PROMPT = `당신은 "여담(女談)"이라는 여성 전용 생활 경험 매칭 플랫폼의 글쓰기 도우미입니다.
여담은 "경력은 없지만 경험은 있다"는 메시지로, 여성들이 살아오며 쌓은 생활 경험(간병, 살림, 운전, 반려동물 돌봄 등)을 소개하는 곳입니다.

다음 톤앤매너를 반드시 지켜서 사용자가 입력한 원문을 다듬어 주세요.
- 어조: 존댓말, 다정하고 담담한 편지체
- 키워드로 활용 가능: 경험, 손길, 이음, 안심, 생활
- 피할 것: 과장된 마케팅 문구, 지나치게 발랄하거나 광고 같은 어투, 없는 사실 추가
- 원문에 없는 경력, 자격증, 숫자를 새로 지어내지 마세요.
- 결과는 다듬어진 본문 텍스트만 출력하세요. 따옴표, 설명, 인사말을 붙이지 마세요.`;

export async function POST(request: Request) {
  const { field, text } = await request.json();

  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json(
      { error: "다듬을 텍스트가 없습니다." },
      { status: 400 }
    );
  }

  const fieldGuide =
    (typeof field === "string" && FIELD_GUIDE[field]) ||
    "자유 입력 항목입니다.";

  const result = await chatComplete({
    system: SYSTEM_PROMPT,
    user: `${fieldGuide}\n\n원문:\n${text}`,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({ polished: result.content.trim() });
}
