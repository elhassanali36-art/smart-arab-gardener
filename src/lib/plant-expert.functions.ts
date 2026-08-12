import { createServerFn } from "@tanstack/react-start";
import { generateJson } from "./ai-json.server";
import {
  expertInputSchema,
  expertSystemPrompt,
  guideJsonShape,
  guideSchema,
  languageNames,
} from "./plant-expert.shared";

export const askPlantExpert = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => expertInputSchema.parse(input))
  .handler(async ({ data }) => {
    const language = languageNames[data.lang] ?? "Arabic";
    return generateJson({
      schema: guideSchema,
      system: `${expertSystemPrompt(language)}\nUse exactly this JSON shape:\n${guideJsonShape}`,
      prompt: `Plant or crop the user asked about: "${data.query}". Write every text value in ${language}.`,
    });
  });
