import { Pinecone } from "@pinecone-database/pinecone";

export async function getPineconeStats() {
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  const index = pinecone.index(process.env.PINECONE_INDEX!);
  const stats = await index.describeIndexStats();
  return {
    totalVectors: stats.totalRecordCount ?? 0,
    dimension: 1024,
    metric: "cosine",
    fullness: stats.indexFullness ?? 0,
  };
}
