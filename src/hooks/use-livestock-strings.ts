import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { translateStrings } from "@/lib/livestock.functions";
import { useI18n } from "@/lib/i18n";

/** نصوص وحدة الماشية بالعربية والإنجليزية، وباقي اللغات تُترجم مرة وتُحفظ */
export const lsStrings = {
  ar: {
    title: "الثروة الحيوانية",
    subtitle: "سجل حيواناتك في قاعدة بيانات آمنة وتابع صحتها مع مستشار ذكي.",
    total: "إجمالي الحيوانات",
    healthy: "حيوانات سليمة",
    attention: "تحتاج متابعة",
    sick: "مريض",
    categories: "التصنيفات",
    activities: "أنشطة حديثة",
    records: "سجل الحيوانات",
    insights: "رؤى الذكاء الاصطناعي",
    ask: "اسأل عن صحة حيواناتك ورعايتها",
    askPlaceholder: "مثال: خروف يسعل ولا يأكل، ما العلاج؟",
    askBtn: "احصل على التوصيات",
    thinking: "جاري تحليل حالة القطيع…",
    aiError: "تعذّر تحضير التوصيات، حاول مرة أخرى.",
    search: "ابحث برقم الوسم أو السلالة…",
    all: "الكل",
    add: "إضافة حيوان",
    edit: "تعديل",
    del: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    empty: "لا توجد حيوانات مطابقة.",
    tag: "رقم الوسم",
    category: "التصنيف",
    breed: "السلالة",
    gender: "الجنس",
    age: "العمر (شهر)",
    health: "الحالة الصحية",
    location: "الموقع",
    notes: "ملاحظات",
    months: "شهر",
    male: "ذكر",
    female: "أنثى",
    cattle: "أبقار",
    sheep: "أغنام",
    goats: "ماعز",
    camels: "إبل",
    poultry: "دواجن",
    signinTitle: "سجّل الدخول لحفظ حيواناتك",
    signinBody: "بيانات الماشية تُخزّن في حسابك بشكل آمن ومتزامن على كل أجهزتك.",
    signin: "تسجيل الدخول",
    seed: "استيراد قطيع تجريبي",
    loading: "جاري التحميل…",
    noActivities: "لا توجد أنشطة بعد.",
  },
  en: {
    title: "Livestock",
    subtitle: "Keep your animals in a secure database and follow their health with a smart advisor.",
    total: "Total animals",
    healthy: "Healthy animals",
    attention: "Needing attention",
    sick: "Sick",
    categories: "Categories",
    activities: "Recent activities",
    records: "Animal records",
    insights: "AI insights",
    ask: "Ask about animal health and care",
    askPlaceholder: "e.g. a lamb is coughing and not eating, what should I do?",
    askBtn: "Get recommendations",
    thinking: "Analysing your herd…",
    aiError: "Could not prepare recommendations, please try again.",
    search: "Search by tag or breed…",
    all: "All",
    add: "Add animal",
    edit: "Edit",
    del: "Delete",
    save: "Save",
    cancel: "Cancel",
    empty: "No matching animals.",
    tag: "Tag / ID",
    category: "Category",
    breed: "Breed",
    gender: "Gender",
    age: "Age (months)",
    health: "Health status",
    location: "Location",
    notes: "Notes",
    months: "mo",
    male: "Male",
    female: "Female",
    cattle: "Cattle",
    sheep: "Sheep",
    goats: "Goats",
    camels: "Camels",
    poultry: "Poultry",
    signinTitle: "Sign in to save your animals",
    signinBody: "Livestock records are stored securely in your account and synced across devices.",
    signin: "Sign in",
    seed: "Import a demo herd",
    loading: "Loading…",
    noActivities: "No activities yet.",
  },
} as const;

export type LsStrings = typeof lsStrings.en;

export function useLivestockStrings() {
  const { lang } = useI18n();
  const translate = useServerFn(translateStrings);
  const base: LsStrings = lang === "ar" ? (lsStrings.ar as LsStrings) : lsStrings.en;
  const needs = lang !== "ar" && lang !== "en";
  const cacheKey = `smart-farmer:ls-ui:${lang}`;

  const query = useQuery({
    queryKey: ["ls-ui", lang],
    enabled: needs,
    staleTime: Infinity,
    queryFn: async (): Promise<LsStrings> => {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) return JSON.parse(cached) as LsStrings;
      } catch {
        /* ignore */
      }
      const result = (await translate({
        data: { lang, strings: lsStrings.en as unknown as Record<string, string> },
      })) as LsStrings;
      try {
        localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch {
        /* ignore */
      }
      return result;
    },
  });

  return { s: needs ? { ...base, ...(query.data ?? {}) } : base, isTranslating: needs && query.isLoading };
}
