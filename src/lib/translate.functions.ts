import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateJson } from "./ai-json.server";
import { languageNames } from "./plant-expert.shared";

const guideShape = z.object({
  intro: z.string(),
  sections: z.array(z.object({ title: z.string(), items: z.array(z.string()) })),
});

const inputSchema = z.object({
  lang: z.string().min(2),
  guide: guideShape,
});

/** ترجمة دليل تعليمي كامل إلى لغة المستخدم مع الحفاظ على نفس البنية */
export const translateGuide = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const language = languageNames[data.lang] ?? "English";
    return generateJson({
      schema: guideShape,
      system: [
        "You are a professional agricultural translator and localizer.",
        `Translate every text value into ${language}, keeping agronomic terms accurate.`,
        "Keep EXACTLY the same JSON structure: same number of sections, same number of items per section, same order.",
        "Keep numbers, units, chemical names and Latin names intact. Do not add or remove content.",
      ].join(" "),
      prompt: JSON.stringify(data.guide),
    });
  });
