import { Pinecone } from "@pinecone-database/pinecone";
import { VoyageAIClient } from "voyageai";
import * as fs from "fs";
import * as path from "path";

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const voyage = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY! });

const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 150;
const KB_DIR = path.join(process.cwd(), "kb");
const INDEX_NAME = process.env.PINECONE_INDEX!;

function chunkText(text: string, filename: string) {
  const chunks = [];
  let i = 0, idx = 0;
  while (i < text.length) {
    chunks.push({ id: `${filename}-${idx}`, text: text.slice(i, i + CHUNK_SIZE), source: filename });
    i += CHUNK_SIZE - CHUNK_OVERLAP;
    idx++;
  }
  return chunks;
}

async function embedBatch(texts: string[]): Promise<number[][]> {
  const res = await voyage.embed({ input: texts, model: "voyage-3-lite" });
  return res.data!.map((d) => d.embedding!);
}

async function main() {
  const indexes = await pinecone.listIndexes();
  const names = indexes.indexes?.map((i) => i.name) ?? [];
  if (!names.includes(INDEX_NAME)) {
    console.log(`Creating index ${INDEX_NAME}...`);
    await pinecone.createIndex({
      name: INDEX_NAME,
      dimension: 512,
      metric: "cosine",
      spec: { serverless: { cloud: "aws", region: "us-east-1" } },
    });
    await new Promise((r) => setTimeout(r, 60000));
  }

  const index = pinecone.index(INDEX_NAME);
  const files = fs.readdirSync(KB_DIR).filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} documents`);

  const allChunks: { id: string; text: string; source: string }[] = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(KB_DIR, file), "utf-8");
    const chunks = chunkText(content, file);
    allChunks.push(...chunks);
    console.log(`  ${file}: ${chunks.length} chunks`);
  }
  console.log(`Total: ${allChunks.length} chunks`);

  const BATCH = 64;
  for (let i = 0; i < allChunks.length; i += BATCH) {
    const batch = allChunks.slice(i, i + BATCH);
    console.log(`Embedding batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(allChunks.length / BATCH)}...`);
    const embeddings = await embedBatch(batch.map((c) => c.text));
    await index.upsert({ records: batch.map((chunk, j) => ({
      id: chunk.id,
      values: embeddings[j],
      metadata: { text: chunk.text, source: chunk.source },
    })) });
  }
  console.log("Done.");
}

main().catch(console.error);
