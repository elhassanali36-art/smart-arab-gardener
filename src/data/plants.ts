/**
 * بيانات النباتات (Mock Data)
 * ---------------------------------------------------------------------------
 * TODO(API): هذا الملف هو نقطة الاستبدال المستقبلية ببيانات حقيقية.
 * استبدل `plants` بنتيجة نداء API (مثال: GET /api/plants) مع الحفاظ على
 * نفس شكل النوع `Plant` حتى لا تحتاج الواجهات إلى أي تعديل.
 */

export type Season = "winter" | "summer" | "moderate";
export type SpaceType = "pots" | "garden" | "indoor";
export type Difficulty = "easy" | "medium";
/** تصنيف النبات — يُستخدم في البحث المتقدم */
export type Category =
  | "vegetable"
  | "herb"
  | "fruit-tree"
  | "ornamental-tree"
  | "shade-tree"
  | "fodder"
  | "flower";

export interface Plant {
  id: string;
  nameAr: string;
  nameEn: string;
  scientificName: string;
  emoji: string;
  /** التصنيف (افتراضياً خضروات) */
  category?: Category;
  /** المواسم المناسبة للزراعة */
  seasons: Season[];
  /** أشهر الزراعة الفعلية (1-12) */
  months: number[];
  spaces: SpaceType[];
  difficulty: Difficulty;
  /** مدة النضج بالأيام (تقريبية) — للأشجار تعني مدة الإثمار الأولى */
  maturityDays: [number, number];
  water: string;
  sun: string;
  soil: string;
  steps: string[];
  fertilizers: { name: string; timing: string }[];
  /** الأمراض والآفات حسب الموسم */
  pests: { season: Season; items: string[] }[];
  harvest: string[];
  /** معلومات تثقيفية عن النبات (اختياري) */
  facts?: string[];
}

export const seasonLabels: Record<Season, string> = {
  winter: "شتوي",
  summer: "صيفي",
  moderate: "معتدل",
};

export const spaceLabels: Record<SpaceType, string> = {
  pots: "أصص وشرفات",
  garden: "حديقة مفتوحة",
  indoor: "داخل المنزل",
};

export const categoryLabels: Record<Category, string> = {
  vegetable: "خضروات",
  herb: "أعشاب عطرية",
  "fruit-tree": "أشجار مثمرة",
  "ornamental-tree": "أشجار زينة",
  "shade-tree": "أشجار ظليلة",
  fodder: "أعلاف",
  flower: "زهور وورود",
};

export function categoryOf(p: Plant): Category {
  return p.category ?? "vegetable";
}

export const difficultyLabels: Record<Difficulty, string> = {
  easy: "سهل",
  medium: "متوسط",
};


const corePlants: Plant[] = [
  {
    id: "tomato",
    nameAr: "طماطم",
    nameEn: "Tomato",
    scientificName: "Solanum lycopersicum",
    emoji: "🍅",
    seasons: ["moderate", "winter"],
    months: [1, 2, 3, 9, 10, 11, 12],
    spaces: ["pots", "garden"],
    difficulty: "medium",
    maturityDays: [70, 90],
    water: "ريّ منتظم يومي صيفاً",
    sun: "6-8 ساعات شمس",
    soil: "طينية خفيفة جيدة التصريف",
    steps: [
      "انقع البذور لساعات قليلة ثم ازرعها في صواني الشتلات بعمق 1 سم.",
      "انقل الشتلة إلى أصيص 30 سم أو للأرض بعد 4-5 أسابيع.",
      "ثبّت دعامة خشبية بجانب كل نبتة لرفع الأفرع.",
      "أزل الأفرع الجانبية أسفل أول عنقود زهري لتحسين الإنتاج.",
    ],
    fertilizers: [
      { name: "سماد عضوي متحلل", timing: "قبل الزراعة بأسبوع" },
      { name: "NPK 20-20-20", timing: "كل أسبوعين خلال النمو الخضري" },
      { name: "سماد عالي البوتاسيوم", timing: "من بداية العقد حتى الحصاد" },
    ],
    pests: [
      { season: "winter", items: ["اللفحة المبكرة", "البياض الدقيقي", "الذبابة البيضاء"] },
      { season: "summer", items: ["دودة ثمار الطماطم", "العنكبوت الأحمر", "حشرة المن"] },
      { season: "moderate", items: ["تبقع الأوراق", "المن", "الذبابة البيضاء"] },
    ],
    harvest: [
      "تحوّل لون الثمرة إلى الأحمر الكامل مع لمعان خفيف.",
      "تنفصل الثمرة بسهولة عند لفها برفق.",
      "اجمع الثمار صباحاً لتبقى أكثر صلابة.",
    ],
  },
  {
    id: "basil",
    nameAr: "ريحان",
    nameEn: "Basil",
    scientificName: "Ocimum basilicum",
    emoji: "🌿",
    seasons: ["summer", "moderate"],
    months: [3, 4, 5, 6, 7, 8, 9, 10],
    spaces: ["pots", "indoor", "garden"],
    difficulty: "easy",
    maturityDays: [30, 45],
    water: "ريّ سطحي عند جفاف التربة",
    sun: "4-6 ساعات شمس",
    soil: "خفيفة غنية بالمادة العضوية",
    steps: [
      "انثر البذور على سطح التربة ثم غطها بطبقة رقيقة جداً.",
      "حافظ على رطوبة التربة حتى الإنبات (5-10 أيام).",
      "خفّف الشتلات لتصبح المسافة 15 سم بينها.",
      "قصّ القمم النامية باستمرار لتشجيع التفرّع.",
    ],
    fertilizers: [
      { name: "شاي الكومبوست", timing: "كل 3 أسابيع" },
      { name: "سماد نيتروجيني خفيف", timing: "بعد كل عملية قص" },
    ],
    pests: [
      { season: "summer", items: ["المن", "الذبابة البيضاء", "لفحة الشمس"] },
      { season: "moderate", items: ["العفن الرمادي", "المن"] },
      { season: "winter", items: ["تعفن الجذور من الريّ الزائد"] },
    ],
    harvest: [
      "ابدأ الحصاد عند وصول الطول إلى 20 سم.",
      "اقطع فوق زوج الأوراق مباشرة.",
      "أزل الأزهار مبكراً للحفاظ على طعم الأوراق.",
    ],
  },
  {
    id: "chili",
    nameAr: "فلفل حار",
    nameEn: "Chili Pepper",
    scientificName: "Capsicum annuum",
    emoji: "🌶️",
    seasons: ["summer", "moderate"],
    months: [2, 3, 4, 5, 8, 9, 10],
    spaces: ["pots", "garden"],
    difficulty: "medium",
    maturityDays: [80, 100],
    water: "ريّ متوسط منتظم",
    sun: "6-8 ساعات شمس",
    soil: "رملية طينية جيدة التصريف",
    steps: [
      "ازرع البذور في صواني بعمق 0.5 سم.",
      "انقل الشتلات بعد ظهور 4 أوراق حقيقية.",
      "اترك 40 سم بين النباتات.",
      "أزل الأزهار الأولى لتقوية النبتة.",
    ],
    fertilizers: [
      { name: "سماد عضوي", timing: "عند تجهيز التربة" },
      { name: "NPK 15-15-15", timing: "كل 3 أسابيع" },
      { name: "كالسيوم + بوتاسيوم", timing: "خلال مرحلة العقد" },
    ],
    pests: [
      { season: "summer", items: ["التربس", "العنكبوت الأحمر", "المن"] },
      { season: "moderate", items: ["الذبابة البيضاء", "تبقع الأوراق"] },
      { season: "winter", items: ["البياض الدقيقي"] },
    ],
    harvest: [
      "اللون يتحول للأحمر أو البرتقالي الكامل.",
      "القرن يصبح لامعاً ومتماسكاً.",
      "استخدم مقصاً لتجنّب كسر الأفرع.",
    ],
  },
  {
    id: "cucumber",
    nameAr: "خيار",
    nameEn: "Cucumber",
    scientificName: "Cucumis sativus",
    emoji: "🥒",
    seasons: ["summer", "moderate"],
    months: [2, 3, 4, 8, 9, 10],
    spaces: ["pots", "garden"],
    difficulty: "easy",
    maturityDays: [45, 60],
    water: "ريّ غزير ومنتظم",
    sun: "6-8 ساعات شمس",
    soil: "غنية بالعضويات جيدة التصريف",
    steps: [
      "ازرع البذور مباشرة بعمق 2 سم.",
      "وفّر شبكة تسلق أو خيوط رأسية.",
      "اترك 40-50 سم بين النباتات.",
      "غطِّ التربة بالتبن للحفاظ على الرطوبة.",
    ],
    fertilizers: [
      { name: "كومبوست", timing: "قبل الزراعة" },
      { name: "NPK 20-20-20", timing: "كل أسبوعين" },
    ],
    pests: [
      { season: "summer", items: ["البياض الزغبي", "ذبابة القرعيات", "المن"] },
      { season: "moderate", items: ["البياض الدقيقي", "الذبابة البيضاء"] },
      { season: "winter", items: ["تعفن الساق"] },
    ],
    harvest: [
      "اجمع الثمار بطول 12-18 سم.",
      "الحصاد كل يومين يمنع المرارة.",
      "اقطع بالساق لا بالشد.",
    ],
  },
  {
    id: "mint",
    nameAr: "نعناع",
    nameEn: "Mint",
    scientificName: "Mentha spicata",
    emoji: "🍃",
    seasons: ["moderate", "summer", "winter"],
    months: [1, 2, 3, 4, 5, 9, 10, 11, 12],
    spaces: ["pots", "indoor", "garden"],
    difficulty: "easy",
    maturityDays: [30, 40],
    water: "تربة رطبة دائماً",
    sun: "3-5 ساعات شمس",
    soil: "أي تربة رطبة غنية",
    steps: [
      "استخدم عقلة ساق بطول 10 سم وضعها في ماء حتى تتجذر.",
      "انقلها لأصيص منفصل لأنها تنتشر بسرعة.",
      "ضعها في مكان نصف مظلل.",
      "قصّها كل شهر للحفاظ على كثافتها.",
    ],
    fertilizers: [
      { name: "سماد عضوي سائل", timing: "كل شهر" },
      { name: "نيتروجين خفيف", timing: "بعد القص" },
    ],
    pests: [
      { season: "summer", items: ["صدأ النعناع", "العنكبوت الأحمر"] },
      { season: "moderate", items: ["المن", "الذبابة البيضاء"] },
      { season: "winter", items: ["العفن الرمادي"] },
    ],
    harvest: ["اقطع السويقات قبل الإزهار.", "لا تأخذ أكثر من ثلث النبتة مرة واحدة."],
  },
  {
    id: "eggplant",
    nameAr: "باذنجان",
    nameEn: "Eggplant",
    scientificName: "Solanum melongena",
    emoji: "🍆",
    seasons: ["summer", "moderate"],
    months: [2, 3, 4, 5, 8, 9],
    spaces: ["garden", "pots"],
    difficulty: "medium",
    maturityDays: [80, 110],
    water: "ريّ منتظم غزير",
    sun: "7-8 ساعات شمس",
    soil: "طينية دافئة غنية",
    steps: [
      "ازرع في مشتل ثم انقل بعد 6 أسابيع.",
      "اترك 50 سم بين الشتلات.",
      "ثبّت دعامة للأفرع المحمّلة.",
      "أزل الأوراق السفلية الملامسة للتربة.",
    ],
    fertilizers: [
      { name: "سماد بلدي متحلل", timing: "عند التجهيز" },
      { name: "NPK 12-12-17", timing: "كل 3 أسابيع" },
    ],
    pests: [
      { season: "summer", items: ["حفار ساق الباذنجان", "العنكبوت الأحمر", "المن"] },
      { season: "moderate", items: ["الذبابة البيضاء", "الذبول الفطري"] },
      { season: "winter", items: ["البياض الدقيقي"] },
    ],
    harvest: ["القشرة لامعة وتعود للوضع عند الضغط الخفيف.", "اقطع مع جزء من العنق."],
  },
  {
    id: "lettuce",
    nameAr: "خس",
    nameEn: "Lettuce",
    scientificName: "Lactuca sativa",
    emoji: "🥬",
    seasons: ["winter", "moderate"],
    months: [1, 2, 3, 9, 10, 11, 12],
    spaces: ["pots", "garden", "indoor"],
    difficulty: "easy",
    maturityDays: [40, 60],
    water: "ريّ خفيف متكرر",
    sun: "4-6 ساعات شمس",
    soil: "خفيفة رطبة غنية",
    steps: [
      "انثر البذور بعمق 0.5 سم.",
      "خفّف الشتلات إلى 20 سم بين كل نبتة.",
      "حافظ على رطوبة ثابتة لتجنب المرارة.",
      "وفّر ظلاً جزئياً في الأيام الحارة.",
    ],
    fertilizers: [
      { name: "كومبوست", timing: "قبل الزراعة" },
      { name: "سماد نيتروجيني", timing: "كل أسبوعين" },
    ],
    pests: [
      { season: "winter", items: ["البياض الزغبي", "القواقع والبزاقات", "المن"] },
      { season: "moderate", items: ["المن", "تبقع الأوراق"] },
      { season: "summer", items: ["الاحتراق الطرفي من الحرارة"] },
    ],
    harvest: ["اقطع الرأس عند تماسكه.", "أو اقطف الأوراق الخارجية تدريجياً."],
  },
  {
    id: "radish",
    nameAr: "فجل",
    nameEn: "Radish",
    scientificName: "Raphanus sativus",
    emoji: "🌱",
    seasons: ["winter", "moderate"],
    months: [1, 2, 3, 9, 10, 11, 12],
    spaces: ["pots", "garden"],
    difficulty: "easy",
    maturityDays: [25, 35],
    water: "ريّ منتظم خفيف",
    sun: "4-6 ساعات شمس",
    soil: "رملية خفيفة مفككة",
    steps: [
      "ازرع البذور مباشرة بعمق 1 سم.",
      "اترك 5 سم بين البذور.",
      "لا تسمّد بالنيتروجين بكثرة لتجنّب نمو الأوراق فقط.",
      "حافظ على رطوبة منتظمة لتفادي التشقق.",
    ],
    fertilizers: [
      { name: "كومبوست ناعم", timing: "قبل الزراعة" },
      { name: "سماد بوتاسي", timing: "بعد أسبوعين من الإنبات" },
    ],
    pests: [
      { season: "winter", items: ["ذبابة الجذور", "البزاقات"] },
      { season: "moderate", items: ["البرغوث الأرضي", "المن"] },
      { season: "summer", items: ["تخشّب الجذر من الحرارة"] },
    ],
    harvest: ["يظهر كتف الجذر فوق التربة بقطر 2-3 سم.", "لا تتأخر لتفادي الطعم الحاد جداً."],
  },
  {
    id: "green-onion",
    nameAr: "بصل أخضر",
    nameEn: "Green Onion",
    scientificName: "Allium fistulosum",
    emoji: "🧅",
    seasons: ["winter", "moderate", "summer"],
    months: [1, 2, 3, 4, 9, 10, 11, 12],
    spaces: ["pots", "indoor", "garden"],
    difficulty: "easy",
    maturityDays: [30, 50],
    water: "ريّ خفيف مستمر",
    sun: "4-6 ساعات شمس",
    soil: "خفيفة جيدة التصريف",
    steps: [
      "استخدم قواعد بصل أخضر متبقية أو بذور.",
      "اغرسها بعمق 2 سم مع ترك الرأس ظاهراً.",
      "اترك 5 سم بين النباتات.",
      "أضف تربة حول الساق لتبيضها.",
    ],
    fertilizers: [
      { name: "سماد عضوي سائل", timing: "كل 3 أسابيع" },
      { name: "نيتروجين خفيف", timing: "منتصف النمو" },
    ],
    pests: [
      { season: "winter", items: ["العفن الأبيض", "التربس"] },
      { season: "moderate", items: ["ذبابة البصل", "المن"] },
      { season: "summer", items: ["التربس", "لفحة الأوراق"] },
    ],
    harvest: ["اقطع الأوراق عند طول 20 سم.", "يمكن الحصاد عدة مرات من نفس النبتة."],
  },
  {
    id: "strawberry",
    nameAr: "فراولة",
    nameEn: "Strawberry",
    scientificName: "Fragaria × ananassa",
    emoji: "🍓",
    seasons: ["winter", "moderate"],
    months: [9, 10, 11, 12, 1, 2],
    spaces: ["pots", "garden"],
    difficulty: "medium",
    maturityDays: [90, 120],
    water: "ريّ منتظم دون تغريق",
    sun: "6-8 ساعات شمس",
    soil: "حمضية خفيفة غنية بالعضويات",
    steps: [
      "استخدم شتلات جاهزة (أفضل من البذور).",
      "ازرع بحيث يبقى التاج فوق سطح التربة.",
      "اترك 30 سم بين الشتلات.",
      "أزل المدادات الأولى لتقوية النبتة.",
    ],
    fertilizers: [
      { name: "كومبوست + بيتموس", timing: "عند الزراعة" },
      { name: "سماد عالي البوتاسيوم", timing: "من بداية الإزهار كل أسبوعين" },
    ],
    pests: [
      { season: "winter", items: ["العفن الرمادي", "البياض الدقيقي", "البزاقات"] },
      { season: "moderate", items: ["العنكبوت الأحمر", "التربس"] },
      { season: "summer", items: ["لفحة الشمس", "العنكبوت الأحمر"] },
    ],
    harvest: ["لون أحمر كامل حتى الكتفين.", "اقطع بالعنق وليس بشد الثمرة."],
  },
  {
    id: "parsley",
    nameAr: "بقدونس",
    nameEn: "Parsley",
    scientificName: "Petroselinum crispum",
    emoji: "🌿",
    seasons: ["winter", "moderate"],
    months: [1, 2, 3, 9, 10, 11, 12],
    spaces: ["pots", "indoor", "garden"],
    difficulty: "easy",
    maturityDays: [50, 70],
    water: "ريّ منتظم متوسط",
    sun: "4-6 ساعات شمس",
    soil: "خفيفة غنية",
    steps: [
      "انقع البذور ليلة كاملة لتسريع الإنبات.",
      "ازرع بعمق 1 سم وحافظ على الرطوبة.",
      "خفّف إلى 15 سم بين النباتات.",
      "احصد الأوراق الخارجية أولاً.",
    ],
    fertilizers: [
      { name: "كومبوست", timing: "قبل الزراعة" },
      { name: "سماد نيتروجيني خفيف", timing: "كل 3 أسابيع" },
    ],
    pests: [
      { season: "winter", items: ["البياض الزغبي", "المن"] },
      { season: "moderate", items: ["دودة أوراق الجزر", "المن"] },
      { season: "summer", items: ["ذبول من الحرارة"] },
    ],
    harvest: ["ابدأ عند وجود 3 مجموعات أوراق.", "اقطع من القاعدة لتشجيع النمو."],
  },
  {
    id: "arugula",
    nameAr: "جرجير",
    nameEn: "Arugula",
    scientificName: "Eruca vesicaria",
    emoji: "🥗",
    seasons: ["winter", "moderate"],
    months: [1, 2, 3, 10, 11, 12],
    spaces: ["pots", "garden", "indoor"],
    difficulty: "easy",
    maturityDays: [25, 35],
    water: "ريّ خفيف متكرر",
    sun: "4-5 ساعات شمس",
    soil: "خفيفة رطبة",
    steps: [
      "انثر البذور بكثافة خفيفة وغطها قليلاً.",
      "الإنبات سريع خلال 4-7 أيام.",
      "احصد على دفعات متتالية كل أسبوعين.",
      "احمِه من الشمس القوية لتجنّب الطعم الحاد.",
    ],
    fertilizers: [
      { name: "كومبوست", timing: "قبل الزراعة" },
      { name: "سماد سائل عضوي", timing: "بعد أول حصاد" },
    ],
    pests: [
      { season: "winter", items: ["البزاقات", "المن"] },
      { season: "moderate", items: ["البرغوث الأرضي", "المن"] },
      { season: "summer", items: ["الإزهار المبكر من الحرارة"] },
    ],
    harvest: ["الأوراق بطول 10-15 سم.", "اقطع فوق نقطة النمو للحصاد المتكرر."],
  },
  {
    id: "okra",
    nameAr: "بامية",
    nameEn: "Okra",
    scientificName: "Abelmoschus esculentus",
    emoji: "🌾",
    seasons: ["summer"],
    months: [3, 4, 5, 6, 7],
    spaces: ["garden", "pots"],
    difficulty: "medium",
    maturityDays: [55, 70],
    water: "ريّ غزير كل 2-3 أيام",
    sun: "8 ساعات شمس",
    soil: "طينية دافئة جيدة التصريف",
    steps: [
      "انقع البذور 12 ساعة ثم ازرعها مباشرة بعمق 2 سم.",
      "اترك 40 سم بين النباتات.",
      "أزل الأعشاب باستمرار.",
      "احصد كل يومين لاستمرار الإنتاج.",
    ],
    fertilizers: [
      { name: "سماد بلدي", timing: "عند التجهيز" },
      { name: "NPK 20-20-20", timing: "كل 3 أسابيع" },
    ],
    pests: [
      { season: "summer", items: ["دودة اللوز", "الذبابة البيضاء", "العنكبوت الأحمر"] },
      { season: "moderate", items: ["المن", "تبقع الأوراق"] },
      { season: "winter", items: ["توقف النمو من البرودة"] },
    ],
    harvest: ["القرن بطول 5-8 سم وطري عند الكسر.", "الحصاد المتأخر يجعلها ليفية."],
  },
  {
    id: "carrot",
    nameAr: "جزر",
    nameEn: "Carrot",
    scientificName: "Daucus carota",
    emoji: "🥕",
    seasons: ["winter", "moderate"],
    months: [1, 2, 9, 10, 11, 12],
    spaces: ["garden", "pots"],
    difficulty: "medium",
    maturityDays: [70, 90],
    water: "ريّ منتظم معتدل",
    sun: "6 ساعات شمس",
    soil: "رملية عميقة مفككة خالية من الحجارة",
    steps: [
      "افلح التربة لعمق 30 سم.",
      "ازرع البذور بعمق 1 سم في سطور.",
      "خفّف إلى 5 سم بين النباتات.",
      "احمِ أكتاف الجذور بالتراب لمنع اخضرارها.",
    ],
    fertilizers: [
      { name: "كومبوست ناعم", timing: "قبل الزراعة" },
      { name: "سماد بوتاسي فوسفوري", timing: "بعد 4 أسابيع" },
    ],
    pests: [
      { season: "winter", items: ["ذبابة الجزر", "العفن الأبيض"] },
      { season: "moderate", items: ["المن", "النيماتودا"] },
      { season: "summer", items: ["تشقق الجذور من عدم انتظام الريّ"] },
    ],
    harvest: ["قطر الجذر 2-3 سم عند سطح التربة.", "ارو التربة قبل القلع لتسهيله."],
  },
  {
    id: "spinach",
    nameAr: "سبانخ",
    nameEn: "Spinach",
    scientificName: "Spinacia oleracea",
    emoji: "🥬",
    seasons: ["winter"],
    months: [10, 11, 12, 1, 2],
    spaces: ["pots", "garden"],
    difficulty: "easy",
    maturityDays: [40, 55],
    water: "ريّ منتظم خفيف",
    sun: "4-6 ساعات شمس",
    soil: "غنية بالعضويات جيدة التصريف",
    steps: [
      "ازرع البذور بعمق 1.5 سم.",
      "اترك 15 سم بين النباتات.",
      "حافظ على تربة رطبة باردة.",
      "احصد قبل ارتفاع الحرارة.",
    ],
    fertilizers: [
      { name: "كومبوست", timing: "قبل الزراعة" },
      { name: "سماد نيتروجيني", timing: "كل أسبوعين" },
    ],
    pests: [
      { season: "winter", items: ["البياض الزغبي", "حشرة المن", "صانعات الأنفاق"] },
      { season: "moderate", items: ["المن", "تبقع الأوراق"] },
      { season: "summer", items: ["الإزهار المبكر"] },
    ],
    harvest: ["الأوراق بطول 15 سم ولون أخضر غامق.", "احصد الأوراق الخارجية تدريجياً."],
  },
];

/** الشهر (1-12) → الموسم الزراعي المناسب في مناخ الخليج/الرياض */
export function seasonForMonth(month: number): Season {
  if ([12, 1, 2].includes(month)) return "winter";
  if ([6, 7, 8, 9].includes(month)) return "summer";
  return "moderate";
}

export function plantsForMonth(month: number): Plant[] {
  return plants.filter((p) => p.months.includes(month));
}

export function getPlant(id: string): Plant | undefined {
  return plants.find((p) => p.id === id);
}

export const trendingSearches = [
  "طماطم",
  "نعناع",
  "فراولة",
  "خس",
  "فلفل حار",
  "ريحان",
  "فجل",
];
