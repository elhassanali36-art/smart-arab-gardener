/**
 * بيانات وحدة الثروة الحيوانية (Livestock)
 * الترجمة محلية داخل الوحدة (ar/en) حتى لا نلمس نظام i18n العام.
 */

export type LivestockCategory = "cattle" | "sheep" | "goats" | "camels" | "poultry";
export type HealthStatus = "healthy" | "attention" | "sick";
export type Gender = "male" | "female";

export interface Animal {
  id: string;
  tag: string;
  category: LivestockCategory;
  breed: string;
  gender: Gender;
  ageMonths: number;
  health: HealthStatus;
  location: string;
  notes?: string;
}

export const livestockCategories: LivestockCategory[] = [
  "cattle",
  "sheep",
  "goats",
  "camels",
  "poultry",
];

export const healthStatuses: HealthStatus[] = ["healthy", "attention", "sick"];

type Bi = { ar: string; en: string };

export const categoryLabels: Record<LivestockCategory, Bi> = {
  cattle: { ar: "أبقار", en: "Cattle" },
  sheep: { ar: "أغنام", en: "Sheep" },
  goats: { ar: "ماعز", en: "Goats" },
  camels: { ar: "إبل", en: "Camels" },
  poultry: { ar: "دواجن", en: "Poultry" },
};

export const categoryEmoji: Record<LivestockCategory, string> = {
  cattle: "🐄",
  sheep: "🐑",
  goats: "🐐",
  camels: "🐪",
  poultry: "🐔",
};

export const healthLabels: Record<HealthStatus, Bi> = {
  healthy: { ar: "سليم", en: "Healthy" },
  attention: { ar: "يحتاج متابعة", en: "Needs attention" },
  sick: { ar: "مريض", en: "Sick" },
};

export const genderLabels: Record<Gender, Bi> = {
  male: { ar: "ذكر", en: "Male" },
  female: { ar: "أنثى", en: "Female" },
};

export const lsText = {
  title: { ar: "الثروة الحيوانية", en: "Livestock" },
  subtitle: {
    ar: "سجل حيواناتك وتابع حالتها الصحية مع توصيات ذكية.",
    en: "Track your animals, their health status and smart recommendations.",
  },
  homeCard: { ar: "الثروة الحيوانية", en: "Livestock" },
  total: { ar: "إجمالي الحيوانات", en: "Total animals" },
  healthy: { ar: "حيوانات سليمة", en: "Healthy animals" },
  attention: { ar: "تحتاج متابعة", en: "Needing attention" },
  categories: { ar: "التصنيفات", en: "Categories" },
  activities: { ar: "أنشطة حديثة", en: "Recent activities" },
  records: { ar: "سجل الحيوانات", en: "Animal records" },
  insights: { ar: "رؤى الذكاء الاصطناعي", en: "AI Insights" },
  insightsNote: { ar: "توصيات تجريبية للعرض", en: "Demo recommendations" },
  search: { ar: "ابحث برقم الوسم أو السلالة…", en: "Search by tag or breed…" },
  all: { ar: "الكل", en: "All" },
  add: { ar: "إضافة حيوان", en: "Add animal" },
  edit: { ar: "تعديل", en: "Edit" },
  del: { ar: "حذف", en: "Delete" },
  save: { ar: "حفظ", en: "Save" },
  cancel: { ar: "إلغاء", en: "Cancel" },
  empty: { ar: "لا توجد حيوانات مطابقة.", en: "No matching animals." },
  tag: { ar: "رقم الوسم", en: "Animal ID / Tag" },
  category: { ar: "التصنيف", en: "Category" },
  breed: { ar: "السلالة", en: "Breed" },
  gender: { ar: "الجنس", en: "Gender" },
  age: { ar: "العمر (شهر)", en: "Age (months)" },
  health: { ar: "الحالة الصحية", en: "Health status" },
  location: { ar: "الموقع", en: "Location" },
  notes: { ar: "ملاحظات", en: "Notes" },
  months: { ar: "شهر", en: "mo" },
  reset: { ar: "استعادة البيانات التجريبية", en: "Restore demo data" },
} satisfies Record<string, Bi>;

/** يختار النص المناسب: العربية للغات RTL العربية، والإنجليزية لغير ذلك */
export function bi(value: Bi, lang: string) {
  return lang === "ar" ? value.ar : value.en;
}

export const demoAnimals: Animal[] = [
  {
    id: "a1",
    tag: "CT-1001",
    category: "cattle",
    breed: "هولشتاين",
    gender: "female",
    ageMonths: 42,
    health: "healthy",
    location: "الحوش الشمالي",
    notes: "إنتاج حليب جيد",
  },
  {
    id: "a2",
    tag: "CT-1002",
    category: "cattle",
    breed: "فريزيان",
    gender: "male",
    ageMonths: 18,
    health: "attention",
    location: "الحوش الشمالي",
    notes: "نقص وزن طفيف",
  },
  {
    id: "a3",
    tag: "SH-2001",
    category: "sheep",
    breed: "نجدي",
    gender: "female",
    ageMonths: 24,
    health: "healthy",
    location: "مظلة الأغنام",
  },
  {
    id: "a4",
    tag: "SH-2002",
    category: "sheep",
    breed: "نعيمي",
    gender: "male",
    ageMonths: 10,
    health: "sick",
    location: "الحجر الصحي",
    notes: "أعراض تنفسية — تحت الملاحظة",
  },
  {
    id: "a5",
    tag: "GT-3001",
    category: "goats",
    breed: "عارضي",
    gender: "female",
    ageMonths: 30,
    health: "healthy",
    location: "الحوش الشرقي",
  },
  {
    id: "a6",
    tag: "GT-3002",
    category: "goats",
    breed: "شامي",
    gender: "female",
    ageMonths: 15,
    health: "attention",
    location: "الحوش الشرقي",
    notes: "يحتاج فحص حوافر",
  },
  {
    id: "a7",
    tag: "CM-4001",
    category: "camels",
    breed: "مجاهيم",
    gender: "female",
    ageMonths: 84,
    health: "healthy",
    location: "المرعى المفتوح",
  },
  {
    id: "a8",
    tag: "CM-4002",
    category: "camels",
    breed: "وضح",
    gender: "male",
    ageMonths: 60,
    health: "healthy",
    location: "المرعى المفتوح",
  },
  {
    id: "a9",
    tag: "PL-5001",
    category: "poultry",
    breed: "دجاج بياض",
    gender: "female",
    ageMonths: 8,
    health: "healthy",
    location: "العشة الأولى",
    notes: "معدل بيض مستقر",
  },
  {
    id: "a10",
    tag: "PL-5002",
    category: "poultry",
    breed: "دجاج لاحم",
    gender: "male",
    ageMonths: 2,
    health: "attention",
    location: "العشة الثانية",
    notes: "حرارة العشة مرتفعة",
  },
];

export const demoActivities: { at: Bi; text: Bi }[] = [
  {
    at: { ar: "اليوم", en: "Today" },
    text: { ar: "تم تسجيل وزن 6 رؤوس أغنام", en: "Weight logged for 6 sheep" },
  },
  {
    at: { ar: "أمس", en: "Yesterday" },
    text: { ar: "SH-2002 نُقل إلى الحجر الصحي", en: "SH-2002 moved to quarantine" },
  },
  {
    at: { ar: "قبل 3 أيام", en: "3 days ago" },
    text: { ar: "تحصين الأبقار ضد الحمى القلاعية", en: "Cattle vaccinated against FMD" },
  },
  {
    at: { ar: "قبل 5 أيام", en: "5 days ago" },
    text: { ar: "إضافة 2 رؤوس إبل للسجل", en: "2 camels added to the records" },
  },
];

export type InsightKind = "alert" | "feed" | "inspect" | "herd";

export const demoInsights: { kind: InsightKind; title: Bi; body: Bi }[] = [
  {
    kind: "alert",
    title: { ar: "تنبيه صحي", en: "Health alert" },
    body: {
      ar: "SH-2002 يظهر أعراضاً تنفسية؛ أبقِه معزولاً 7 أيام وراقب الحرارة يومياً.",
      en: "SH-2002 shows respiratory signs; keep isolated for 7 days and log temperature daily.",
    },
  },
  {
    kind: "feed",
    title: { ar: "توصية تغذية", en: "Feeding recommendation" },
    body: {
      ar: "ارفع البرسيم الأخضر إلى 3% من وزن الجسم للأبقار الحلوب مع ملح معدني حر.",
      en: "Raise green alfalfa to 3% of body weight for dairy cattle, with free-choice mineral salt.",
    },
  },
  {
    kind: "inspect",
    title: { ar: "حيوانات تحتاج فحصاً", en: "Animals requiring inspection" },
    body: {
      ar: "GT-3002 وCT-1002 لم يُفحصا منذ 3 أسابيع — افحص الحوافر والوزن.",
      en: "GT-3002 and CT-1002 unchecked for 3 weeks — inspect hooves and weight.",
    },
  },
  {
    kind: "herd",
    title: { ar: "ملاحظات عامة على القطيع", en: "General herd observations" },
    body: {
      ar: "نسبة السليم 60%؛ حرارة العشة الثانية مرتفعة — حسّن التهوية قبل الظهيرة.",
      en: "Healthy share is 60%; coop 2 runs hot — improve ventilation before noon.",
    },
  },
];
