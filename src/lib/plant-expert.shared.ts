import { z } from "zod";

export const guideSchema = z.object({
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

export const expertInputSchema = z.object({
  query: z.string().min(1),
  lang: z.string().min(2),
});

export const languageNames: Record<string, string> = {
  ar: "Arabic",
  en: "English",
  fr: "French",
  es: "Spanish",
  ur: "Urdu",
  hi: "Hindi",
  pt: "Portuguese",
  de: "German",
  tr: "Turkish",
  ru: "Russian",
  zh: "Simplified Chinese",
  id: "Indonesian",
  sw: "Swahili",
  bn: "Bengali",
  fa: "Persian (Farsi)",
};

export function expertSystemPrompt(language: string) {
  return [
    "You are a senior agronomist and horticulture extension expert.",
    "Give practical, field-tested guidance for hobby growers and smallholder farmers,",
    "with special attention to hot arid climates (Gulf / MENA) unless the user implies otherwise.",
    `Write ALL text values in ${language}. Keep the scientific name in Latin.`,
    "Be specific: real fertilizer products/NPK ratios, real pest and disease names,",
    "concrete organic and chemical treatment options with safety notes, and clear timing.",
    "Give 6 to 9 planting steps, at least 4 diseases/pests, and at least 4 fertilizer entries.",
    "Cover EVERY kind of plant with equal depth: vegetables, herbs, cereals, fodder, flowers,",
    "ornamental and shade trees, and perennial tree crops and nuts such as cashew, mango,",
    "almond, pistachio, olive, coffee, cocoa, date palm and citrus. For tree and nut crops give",
    "propagation (seed/graft), spacing, years to first yield, pruning and pollination details in the steps.",
    "Also mention whether the plant suits hydroponics or vertical/column growing, and how, in the greenhouse notes.",
    "If the input is not a plant, answer for the closest matching plant and say so in the summary.",
  ].join(" ");
}
