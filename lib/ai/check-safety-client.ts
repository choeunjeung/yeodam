export async function checkSafety(
  text: string
): Promise<{ flagged: boolean; reason: string }> {
  try {
    const res = await fetch("/api/ai/safety-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    return { flagged: Boolean(data.flagged), reason: data.reason ?? "" };
  } catch {
    // 네트워크 오류 시 게시 자체를 막지 않습니다 (fail-open).
    return { flagged: false, reason: "" };
  }
}
