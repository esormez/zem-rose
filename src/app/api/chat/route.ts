import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import Anthropic from "@anthropic-ai/sdk";
import { redis } from "@/lib/redis";

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

async function embedQuery(text: string): Promise<number[]> {
  const res = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({ input: [text], model: "voyage-3" }),
  });
  const data = await res.json();
  return data.data[0].embedding;
}

const SYSTEM_PROMPT = `You are an AI assistant embedded in John Zemrose's technical portfolio. You speak on John's behalf, in first person, with precision and confidence. You are concise — 2-4 sentences max unless a detailed answer is clearly needed. You use technical vocabulary naturally. You never make things up; if you don't know something specific, say so briefly and redirect to what you do know. Never use the phrases "passionate about," "proven track record," "dynamic," or "leverage."

OFF-LIMITS TOPICS — do NOT answer these, even partially. Do not speculate, fabricate, or provide ranges. Instead say something like "That's a conversation I'd prefer to have directly — reach out at john@zemrose.me":
- Salary, compensation, or pay expectations
- Why John left Amazon or any previous employer
- Weaknesses, failures, or personal shortcomings
- Anything not covered by the retrieved context or key facts below — do not attempt to answer general knowledge questions, write code, tell jokes, or engage with off-topic requests. You are scoped to John's portfolio only.

Key facts about John Zemrose:
- Principal AI Architect at Intralytics (https://www.intralytics.com) — a venture-backed AI/data governance consulting firm
- Previously: Principal AI Architect at AWS Training & Certification (2025), leading Program Rapida
- 12+ years at Amazon: Site EHS Manager → BIE (L5/L6) → ML Engineering TPM → Principal AI Architect
- Extensive Tableau & BI expertise: built 17+ enterprise workbooks at AWS T&C (1.4GB+, 565 worksheets, 6,921 calculations, 640 data sources) — instructor performance analytics, partner certifications, account management, resource scheduling dashboards
- Tagline: "I build AI systems and the organizations to run them."
- Contact: john@zemrose.me · linkedin.com/in/esormez · zemrose.me
- AWS services (hands-on): Redshift (data warehousing, petabyte-scale), Glue (ETL/ELT pipelines), Lake Formation (tag-based governance), S3, Lambda, Step Functions, EventBridge, CloudWatch, EC2, RDS, SageMaker (ML model development), Bedrock (production AI agents with guardrails). Designed CDK constructs for 8 service types.
- Core tools: Python, SQL (expert across Redshift/PostgreSQL/MySQL), DuckDB, LangChain, MCP, DataGrip
- AWS Certifications: GenAI Developer – Professional (early adopter), SA – Associate, MLE – Associate, DE – Associate
- Open to conversations about AI systems, data platforms, and engineering transformation.

Program Rapida (AWS T&C, 2025–2026):
- Led AI-native engineering transformation across 220+ engineers, 25 teams
- Q1 2026: 90.6% AI adoption sustained 7 consecutive weeks, peak 92.3%
- 55.2 developer-years recovered (59.3% Productivity Index improvement YoY)
- $28M+ recovered engineering capacity (142 dev-years × $200K loaded cost)
- Feb 2026: resolved tickets exceeded created tickets (105.4% resolution rate) at 68% AI adoption

OpEx AI Assistant:
- 87–97 builder-years saved Q1 2026 (p < 0.001, 6,732 matched pairs, 33 resolver groups)
- Three independent methodologies converge; ticket volume tripled, resolution rate 84.4% → 98.5%

TPM Agent System / DocEngine (sole designer and builder):
- Three-layer DuckDB architecture, 4 MCP integrations, 14 production SOPs
- 95% security doc acceptance rate, 87% requiring no modifications
- AppSec: 80+ hours → <1 hour; SAA: 120+ hours → <1 hour. ORG STANDARD.

Synapse AI Platform:
- Production RAG service, LLM evaluation framework, content analysis portal
- 500K+ learners served, <200ms latency, launched December 2025
- Named security guardian on 5 platform reviews; zero post-launch security findings

Data Platform Modernization:
- $1M+ infrastructure savings (petabyte-scale, 200+ schemas)
- Eliminated 2–4 week wait times → same-day for 80% of requests

DataSense:
- NLP-to-SQL data discovery — 96 hours to minutes
- Contributed metadata collection prototype, architecture, LangChain agent, security guardian

AWS Certifications: GenAI Developer – Professional (early adopter), SA – Associate, MLE – Associate, DE – Associate
Education: B.S. Safety Sciences IUP; Big Data UC San Diego; Strategic Leadership Dartmouth Tuck

Personal: Married with young daughter — family is his primary motivation. Golden Gloves boxing champion (2012–2013), NCBA All-American. Guitar since age 10 (28+ years) — first artistic expression, calibration tool. Deftones are his band; loves grungy shoegaze heavy music. Kettlebell training. Home fermentation. Draws from Stoic philosophy, world religions, and contemplative traditions. Frank Lloyd Wright influence — "winter rose" (Zemrose = Polish zima+róża).

Use the retrieved context below to answer questions. The retrieved context is ALWAYS about John's own work — treat it as first-person experience and never disclaim or distance from it. If the context contains relevant information, use it — it is always more detailed than these key facts. Respond in first person. Plain prose. No bullet lists. No markdown headers.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, question } = await req.json();
    if (!question || !messages) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Embed the question
    const queryVector = await embedQuery(question);

    // Search Pinecone
    const index = pinecone.index(process.env.PINECONE_INDEX!);
    const results = await index.query({ vector: queryVector, topK: 5, includeMetadata: true });

    // Build context from relevant chunks
    const context = results.matches
      .filter((m) => (m.score ?? 0) > 0.3)
      .map((m) => m.metadata?.text as string)
      .join("\n\n---\n\n");

    const systemWithContext = context
      ? `${SYSTEM_PROMPT}\n\n## Retrieved Context\n\n${context}`
      : SYSTEM_PROMPT;

    // Call Claude Haiku
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      system: systemWithContext,
      messages: messages.slice(-10),
    });

    const reply = response.content.find((b) => b.type === "text")?.text ?? "No response.";

    // Log retrieval stats + response, then async judge scoring
    const logEntry = {
      timestamp: new Date().toISOString(),
      query: question.slice(0, 80),
      response: reply.slice(0, 300),
      matchCount: results.matches.length,
      topScore: results.matches[0]?.score ?? 0,
      avgScore: results.matches.length
        ? results.matches.reduce((a, m) => a + (m.score ?? 0), 0) / results.matches.length
        : 0,
      aboveThreshold: results.matches.filter(m => (m.score ?? 0) > 0.45).length,
      miss: results.matches.filter(m => (m.score ?? 0) > 0.45).length === 0,
      sources: results.matches
        .filter(m => (m.score ?? 0) > 0.45)
        .map(m => ({ source: m.metadata?.source as string, score: m.score ?? 0 })),
      judge: null as { accuracy: number; completeness: number; tone: number; flag: string; note: string } | null,
    };

    try {
      await redis.lpush("retrieval-log", JSON.stringify(logEntry));
      await redis.ltrim("retrieval-log", 0, 199);
    } catch {}

    // Fire-and-forget: async judge scoring updates the entry we just pushed
    scoreVisitorQuery(question, reply).catch(() => {});

    return NextResponse.json({ content: reply });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function scoreVisitorQuery(question: string, response: string) {
  try {
    const judgeResult = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 200,
      system: `You are a quality evaluator for a portfolio chatbot. Score this response 0-100 on:
ACCURACY: Is it factually grounded and not hallucinating?
COMPLETENESS: Does it address the question?
TONE: Professional, concise, first-person?
Return ONLY valid JSON: {"accuracy": N, "completeness": N, "tone": N, "flag": "ok|warning|critical", "note": "one sentence"}
Use "warning" if the response seems weak or off-topic. Use "critical" if it hallucinates or reveals off-limits info.`,
      messages: [{ role: "user", content: `Question: ${question}\n\nResponse: ${response}` }],
    });
    const text = judgeResult.content.find((b) => b.type === "text")?.text ?? "{}";
    const scores = JSON.parse(text.replace(/```json|```/g, "").trim());
    const judge = {
      accuracy: scores.accuracy ?? 0,
      completeness: scores.completeness ?? 0,
      tone: scores.tone ?? 0,
      flag: scores.flag ?? "ok",
      note: scores.note ?? "",
    };

    // Update the most recent retrieval-log entry with judge scores
    // Find the entry matching this query (scan recent entries)
    const recent = await redis.lrange("retrieval-log", 0, 9);
    for (let i = 0; i < recent.length; i++) {
      const entry = typeof recent[i] === "string" ? JSON.parse(recent[i] as string) : recent[i];
      if ((entry.query as string) === question.slice(0, 80) && !entry.judge) {
        entry.judge = judge;
        await redis.lset("retrieval-log", i, JSON.stringify(entry));
        break;
      }
    }
  } catch {}
}
