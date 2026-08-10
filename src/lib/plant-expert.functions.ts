import { createServerFn } from "@tanstack/react-start";
import { NoObjectGeneratedError, Output, streamText } from "ai";
import { z } from "zod";

const guideSchema = z.object({
  nameLocal: z.string(),
  nameEnglish: z.string(),
  scientificName: z.string(),
  family: z.string(),
  summary: z.string(),
  climate: z.string(),
  seasons: z.array(z.string()),
  spaces: z.array(z.string()),
  daysToHarvest: z.string(),
  water: z.string(),
  sun: z.string(),
  soil: z.string(),
  steps: z.array(z.string()),
  fertilizers: z.array(z.object({ name: z.string(), timing: z.string(), dose: z.string() })),
  diseases: z.array(
    z.object({
      name: z.string(),
      symptoms: z.string(),
      treatment: z.string(),
      prevention: z.string(),
    }),
  ),
  harvest: z.array(z.string()),
  facts: z.array(z.string()),
  greenhouseNotes: z.string(),
});

export type PlantGuide = z.infer<typeof guideSchema>;

const inputSchema = z.object({
  query: z.string().min(1),
  lang: z.string().min(2),
});

const languageNames: Record<string, string> = {
  ar: "Arabic",
  en: "English",
  fr: "French",
  es: "Spanish",
  ur: "Urdu",
  hi: "Hindi",
};

export const askPlantExpert = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const language = languageNames[data.lang] ?? "Arabic";
    const gateway = createLovableAiGatewayProvider(key);

    const result = streamText({
      model: gateway("google/gemini-2.5-flash"),
      output: Output.object({ schema: guideSchema }),
      system: [
        "You are a senior agronomist and horticulture extension expert.",
        "Give practical, field-tested guidance for hobby growers and smallholder farmers,",
        "with special attention to hot arid climates (Gulf / MENA) unless the user implies otherwise.",
        `Write ALL text values in ${language}. Keep the scientific name in Latin.`,
        "Be specific: real fertilizer products/NPK ratios, real pest and disease names,",
        "concrete organic and chemical treatment options with safety notes, and clear timing.",
        "Give 6 to 9 planting steps, at least 4 diseases/pests, and at least 4 fertilizer entries.",
        "If the input is not a plant, answer for the closest matching plant and say so in the summary.",
      ].join(" "),
      prompt: `Plant or crop the user asked about: "${data.query}"`,
    });

    try {
      return await result.output;
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error) && error.text) {
        try {
          return guideSchema.parse(JSON.parse(error.text));
        } catch {
          throw new Error("AI_PARSE_FAILED");
        }
      }
      throw error;
    }
  });

// Imported after the schema so the client bundle never pulls the server helper eagerly.
import { createLovableAiGatewayProvider } from "./ai-gateway.server";
