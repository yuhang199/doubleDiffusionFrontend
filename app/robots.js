const baseUrl = "https://www.doublediffusion.co";

// Crawlers that feed AI answer engines. The wildcard rule below already allows
// them, but naming them explicitly makes the intent auditable and survives any
// future tightening of the default rule.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI — model training
  "OAI-SearchBot", // OpenAI — ChatGPT Search results
  "ChatGPT-User", // OpenAI — user-initiated browsing
  "ClaudeBot", // Anthropic
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / Vertex grounding
  "Applebot-Extended",
  "meta-externalagent",
  "Bytespider",
  "cohere-ai",
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
