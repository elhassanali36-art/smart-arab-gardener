import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { LongGuide } from "@/data/guides";
import { translateGuide } from "@/lib/translate.functions";
import { useI18n } from "@/lib/i18n";

/**
 * يعيد الدليل بلغة المستخدم: العربية والإنجليزية جاهزتان،
 * وباقي اللغات تُترجم مرة واحدة ثم تُحفظ في المتصفح.
 */
export function useTranslatedGuide(key: string, guides: Record<"ar" | "en", LongGuide>) {
  const { lang } = useI18n();
  const translate = useServerFn(translateGuide);
  const base = guides[lang === "ar" ? "ar" : "en"];
  const needsTranslation = lang !== "ar" && lang !== "en";
  const cacheKey = `smart-farmer:guide:${key}:${lang}`;

  const query = useQuery({
    queryKey: ["guide", key, lang],
    enabled: needsTranslation,
    staleTime: Infinity,
    queryFn: async (): Promise<LongGuide> => {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) return JSON.parse(cached) as LongGuide;
      } catch {
        /* ignore */
      }
      const result = (await translate({ data: { lang, guide: guides.en } })) as LongGuide;
      try {
        localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch {
        /* ignore */
      }
      return result;
    },
  });

  return {
    guide: needsTranslation ? (query.data ?? base) : base,
    isTranslating: needsTranslation && query.isLoading,
  };
}
