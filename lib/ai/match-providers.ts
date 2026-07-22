import { MOCK_PROVIDERS, type MockProvider } from "@/lib/constants/mock-data";
import { embed } from "@/lib/upstage/client";

function dotProduct(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

export async function getMatchingProviders(
  content: string,
  categorySlug: string,
  limit = 3
): Promise<Array<{ provider: MockProvider; score: number }>> {
  const candidates = MOCK_PROVIDERS.filter(
    (p) => p.categorySlug === categorySlug && p.status === "ACTIVE"
  );

  if (candidates.length === 0) return [];

  const [queryResult, passageResult] = await Promise.all([
    embed("embedding-query", content),
    embed(
      "embedding-passage",
      candidates.map(
        (p) => `${p.headline} ${p.experienceDescription} ${p.introduction}`
      )
    ),
  ]);

  if (!queryResult.ok || !passageResult.ok) return [];

  const [queryVector] = queryResult.embeddings;

  return candidates
    .map((provider, i) => ({
      provider,
      score: dotProduct(queryVector, passageResult.embeddings[i]),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
