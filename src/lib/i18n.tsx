import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const languages = [
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "en", label: "English", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "ur", label: "اردو", dir: "rtl" },
  { code: "hi", label: "हिन्दी", dir: "ltr" },
] as const;

export type LangCode = (typeof languages)[number]["code"];

type Dict = Record<string, string>;

const ar: Dict = {
  "nav.home": "الرئيسية",
  "nav.expert": "الخبير",
  "nav.explore": "استكشاف",
  "nav.greenhouse": "البيوت المحمية",
  "nav.compost": "الكمبوست",
  "nav.favorites": "مفضلتي",
  "nav.account": "حسابي",
  "expert.title": "اسأل الخبير الزراعي",
  "expert.subtitle": "اكتب اسم أي نبات وستحصل على دليل زراعة كامل: الخطوات، الأسمدة، الأمراض وعلاجها.",
  "expert.placeholder": "مثال: طماطم، مانجو، قمح، ورد جوري…",
  "expert.button": "ابحث عن الدليل",
  "expert.loading": "جاري تحضير الدليل الزراعي…",
  "expert.error": "تعذّر تحضير الدليل. حاول مرة أخرى.",
  "expert.rate": "الطلبات كثيرة الآن، انتظر قليلاً ثم أعد المحاولة.",
  "expert.credits": "انتهى رصيد الذكاء الاصطناعي لهذا العمل.",
  "expert.suggestions": "بحوث شائعة",
  "expert.overview": "نظرة عامة",
  "expert.steps": "طريقة الزراعة خطوة بخطوة",
  "expert.fertilizers": "الأسمدة ومواعيدها",
  "expert.diseases": "الأمراض والآفات وعلاجها",
  "expert.harvest": "علامات النضج والحصاد",
  "expert.facts": "معلومات تثقيفية",
  "expert.greenhouse": "ملاحظات للبيوت المحمية",
  "expert.symptoms": "الأعراض",
  "expert.treatment": "العلاج",
  "expert.prevention": "الوقاية",
  "expert.days": "مدة النضج",
  "expert.water": "الري",
  "expert.sun": "الشمس",
  "expert.soil": "التربة",
  "expert.dose": "الجرعة",
  "language": "اللغة",
  "greenhouse.title": "زراعة البيوت المحمية",
  "greenhouse.subtitle": "كيف تبني بيتك المحمي وتزرع فيه، وما الفوائد التي تجنيها.",
  "compost.title": "صناعة الكمبوست",
  "compost.subtitle": "حوّل مخلفات المطبخ والحديقة إلى سماد عضوي غني.",
  "home.expertCard": "اسأل الخبير عن أي نبات",
  "home.greenhouseCard": "زراعة البيوت المحمية",
  "home.compostCard": "صناعة الكمبوست",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.expert": "Expert",
  "nav.explore": "Explore",
  "nav.greenhouse": "Greenhouses",
  "nav.compost": "Compost",
  "nav.favorites": "Favorites",
  "nav.account": "Account",
  "expert.title": "Ask the farming expert",
  "expert.subtitle": "Type any plant name and get a full growing guide: steps, fertilizers, diseases and treatments.",
  "expert.placeholder": "e.g. tomato, mango, wheat, rose…",
  "expert.button": "Get the guide",
  "expert.loading": "Preparing your growing guide…",
  "expert.error": "Could not build the guide. Please try again.",
  "expert.rate": "Too many requests right now — please wait and retry.",
  "expert.credits": "AI credits for this workspace are exhausted.",
  "expert.suggestions": "Popular searches",
  "expert.overview": "Overview",
  "expert.steps": "Step-by-step planting",
  "expert.fertilizers": "Fertilizers and timing",
  "expert.diseases": "Diseases, pests and treatment",
  "expert.harvest": "Ripeness signs and harvest",
  "expert.facts": "Educational facts",
  "expert.greenhouse": "Greenhouse notes",
  "expert.symptoms": "Symptoms",
  "expert.treatment": "Treatment",
  "expert.prevention": "Prevention",
  "expert.days": "Time to harvest",
  "expert.water": "Water",
  "expert.sun": "Sun",
  "expert.soil": "Soil",
  "expert.dose": "Dose",
  "language": "Language",
  "greenhouse.title": "Greenhouse growing",
  "greenhouse.subtitle": "How to build a greenhouse, grow inside it, and the benefits you gain.",
  "compost.title": "Making compost",
  "compost.subtitle": "Turn kitchen and garden waste into rich organic fertilizer.",
  "home.expertCard": "Ask the expert about any plant",
  "home.greenhouseCard": "Greenhouse growing",
  "home.compostCard": "Making compost",
};

const fr: Dict = {
  ...en,
  "nav.home": "Accueil",
  "nav.expert": "Expert",
  "nav.explore": "Explorer",
  "nav.greenhouse": "Serres",
  "nav.compost": "Compost",
  "nav.favorites": "Favoris",
  "nav.account": "Compte",
  "expert.title": "Demandez à l'expert agricole",
  "expert.subtitle": "Saisissez une plante et obtenez un guide complet : étapes, engrais, maladies et traitements.",
  "expert.placeholder": "ex. tomate, mangue, blé, rose…",
  "expert.button": "Obtenir le guide",
  "expert.loading": "Préparation du guide…",
  "language": "Langue",
};

const es: Dict = {
  ...en,
  "nav.home": "Inicio",
  "nav.expert": "Experto",
  "nav.explore": "Explorar",
  "nav.greenhouse": "Invernaderos",
  "nav.compost": "Compost",
  "nav.favorites": "Favoritos",
  "nav.account": "Cuenta",
  "expert.title": "Pregunta al experto agrícola",
  "expert.subtitle": "Escribe cualquier planta y recibe una guía completa: pasos, fertilizantes, enfermedades y tratamientos.",
  "expert.placeholder": "ej. tomate, mango, trigo, rosa…",
  "expert.button": "Ver la guía",
  "expert.loading": "Preparando la guía…",
  "language": "Idioma",
};

const ur: Dict = {
  ...en,
  "nav.home": "ہوم",
  "nav.expert": "ماہر",
  "nav.explore": "تلاش",
  "nav.greenhouse": "گرین ہاؤس",
  "nav.compost": "کمپوسٹ",
  "nav.favorites": "پسندیدہ",
  "nav.account": "اکاؤنٹ",
  "expert.title": "زراعت کے ماہر سے پوچھیں",
  "expert.subtitle": "کسی بھی پودے کا نام لکھیں اور مکمل رہنمائی حاصل کریں: طریقہ، کھادیں، بیماریاں اور علاج۔",
  "expert.placeholder": "مثلاً ٹماٹر، آم، گندم، گلاب…",
  "expert.button": "رہنمائی حاصل کریں",
  "expert.loading": "رہنمائی تیار ہو رہی ہے…",
  "language": "زبان",
};

const hi: Dict = {
  ...en,
  "nav.home": "होम",
  "nav.expert": "विशेषज्ञ",
  "nav.explore": "खोज",
  "nav.greenhouse": "ग्रीनहाउस",
  "nav.compost": "कम्पोस्ट",
  "nav.favorites": "पसंदीदा",
  "nav.account": "खाता",
  "expert.title": "कृषि विशेषज्ञ से पूछें",
  "expert.subtitle": "किसी भी पौधे का नाम लिखें और पूरी मार्गदर्शिका पाएं: चरण, खाद, रोग और उपचार।",
  "expert.placeholder": "जैसे टमाटर, आम, गेहूं, गुलाब…",
  "expert.button": "मार्गदर्शिका पाएं",
  "expert.loading": "मार्गदर्शिका तैयार हो रही है…",
  "language": "भाषा",
};

const dicts: Record<LangCode, Dict> = { ar, en, fr, es, ur, hi };

const STORAGE_KEY = "smart-farmer:lang";

type Ctx = { lang: LangCode; setLang: (l: LangCode) => void; t: (k: string) => string };

const LanguageContext = createContext<Ctx>({ lang: "ar", setLang: () => {}, t: (k) => ar[k] ?? k });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("ar");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (stored && dicts[stored]) setLangState(stored);
  }, []);

  useEffect(() => {
    const dir = languages.find((l) => l.code === lang)?.dir ?? "rtl";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: (l) => {
        setLangState(l);
        window.localStorage.setItem(STORAGE_KEY, l);
      },
      t: (k) => dicts[lang][k] ?? ar[k] ?? k,
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  return useContext(LanguageContext);
}
