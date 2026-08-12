import { streamText } from "ai";
import type { ZodType } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

/**
 * Server-only helper: ask the Lovable AI Gateway for strict JSON and parse it.
 * The gateway's OpenAI-compatible chat route does not enforce JSON schemas,
 * so we prompt for raw JSON, strip any fences and validate with zod (1 retry).
 */
function extractJson(text: string): unknown {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

export async function generateJson<T>(opts: {
  system: string;
  prompt: string;
  schema: ZodType<T>;
  model?: string;
}): Promise<T> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("Missing LOVABLE_API_KEY");

  const gateway = createLovableAiGatewayProvider(key);
  const model = gateway(opts.model ?? "google/gemini-2.5-flash");
  let lastError = "";

  for (let attempt = 0; attempt < 2; attempt++) {
    const result = streamText({
      model,
      system: `${opts.system}\nReply with ONLY one valid minified JSON object. No markdown fences, no commentary, no trailing text.`,
      prompt: attempt === 0 ? opts.prompt : `${opts.prompt}\n\nYour previous answer was not valid JSON (${lastError}). Return ONLY the JSON object.`,
    });

    const text = await result.text;
    const raw = extractJson(text);
    if (!raw) {
      lastError = "no JSON object found";
      continue;
    }
    const parsed = opts.schema.safeParse(raw);
    if (parsed.success) return parsed.data;
    lastError = parsed.error.issues
      .slice(0, 4)
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
  }

  throw new Error(`AI returned invalid JSON (${lastError})`);
}
