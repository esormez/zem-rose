import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const JUDGE_PROMPT = `You are an expert evaluator assessing an AI assistant that speaks on behalf of John Zemrose, a Principal AI Architect.

Evaluate the response on three dimensions, each scored 0-100:
ACCURACY (0-100): Is the response factually correct relative to the expected answer?
COMPLETENESS (0-100): Does it address the question fully?
TONE (0-100): Confident, first-person, concise (2-4 sentences), no filler phrases like "passionate about" or "proven track record", no markdown?

Return ONLY valid JSON: {"accuracy": N, "completeness": N, "tone": N, "reasoning": "one sentence"}`;

export async function POST(req: NextRequest) {
  if (req.headers.get("x-eval-secret") !== process.env.EVAL_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { question, expected, response } = await req.json();
  if (!question || !expected || !response) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const result = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    system: JUDGE_PROMPT,
    messages: [{ role: "user", content: `Question: ${question}\n\nExpected: ${expected}\n\nResponse: ${response}` }],
  });
  const text = result.content.find((b) => b.type === "text")?.text ?? "{}";
  try {
    return NextResponse.json(JSON.parse(text.replace(/```json|```/g, "").trim()));
  } catch {
    return NextResponse.json({ accuracy: 0, completeness: 0, tone: 0, reasoning: "Parse error" });
  }
}
