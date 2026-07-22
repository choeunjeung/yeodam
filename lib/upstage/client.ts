// Upstage API(Solar Chat, Embeddings) 서버 전용 헬퍼입니다.
// 모든 호출은 실패 시 throw 대신 { ok: false, error }를 반환합니다.
// 프로토타입 단계에서 API 키 미설정/네트워크 오류가 화면 렌더링 자체를 막지 않도록 하기 위함입니다.

const CHAT_URL = "https://api.upstage.ai/v1/chat/completions";
const EMBEDDINGS_URL = "https://api.upstage.ai/v1/embeddings";

type ChatResult = { ok: true; content: string } | { ok: false; error: string };

export async function chatComplete({
  system,
  user,
  jsonSchema,
}: {
  system: string;
  user: string;
  jsonSchema?: { name: string; schema: Record<string, unknown> };
}): Promise<ChatResult> {
  const apiKey = process.env.UPSTAGE_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "UPSTAGE_API_KEY가 설정되어 있지 않습니다." };
  }

  const body: Record<string, unknown> = {
    model: "solar-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  };

  if (jsonSchema) {
    body.response_format = {
      type: "json_schema",
      json_schema: {
        name: jsonSchema.name,
        strict: true,
        schema: jsonSchema.schema,
      },
    };
  }

  try {
    const res = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return { ok: false, error: `Upstage Chat API 오류 (${res.status})` };
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== "string") {
      return {
        ok: false,
        error: "Upstage Chat API 응답 형식이 올바르지 않습니다.",
      };
    }

    return { ok: true, content };
  } catch {
    return {
      ok: false,
      error: "Upstage Chat API 호출 중 네트워크 오류가 발생했습니다.",
    };
  }
}

type EmbedResult =
  | { ok: true; embeddings: number[][] }
  | { ok: false; error: string };

export async function embed(
  model: "embedding-query" | "embedding-passage",
  input: string | string[]
): Promise<EmbedResult> {
  const apiKey = process.env.UPSTAGE_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "UPSTAGE_API_KEY가 설정되어 있지 않습니다." };
  }

  try {
    const res = await fetch(EMBEDDINGS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, input }),
    });

    if (!res.ok) {
      return { ok: false, error: `Upstage Embeddings API 오류 (${res.status})` };
    }

    const data = await res.json();
    const embeddings = (
      data?.data as Array<{ embedding: number[] }> | undefined
    )?.map((item) => item.embedding);

    if (!embeddings) {
      return {
        ok: false,
        error: "Upstage Embeddings API 응답 형식이 올바르지 않습니다.",
      };
    }

    return { ok: true, embeddings };
  } catch {
    return {
      ok: false,
      error: "Upstage Embeddings API 호출 중 네트워크 오류가 발생했습니다.",
    };
  }
}
