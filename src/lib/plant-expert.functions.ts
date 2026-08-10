import { createServerFn } from "@tanstack/react-start";
import { NoObjectGeneratedError, Output, streamText } from "ai";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";
import {
  expertInputSchema,
  expertSystemPrompt,
  guideSchema,
  languageNames,
} from "./plant-expert.shared";

export const askPlantExpert = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => expertInputSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(key);
    const result = streamText({
      model: gateway("google/gemini-2.5-flash"),
      output: Output.object({ schema: guideSchema }),
      system: expertSystemPrompt(languageNames[data.lang] ?? "Arabic"),
      prompt: `Plant or crop the user asked about: "${data.query}"`,
    });

    try {
      return await result.output;
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error) && error.text) {
        return guideSchema.parse(JSON.parse(error.text));
      }
      throw error;
    }
  });
