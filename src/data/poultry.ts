/**
 * بيانات الدواجن والماشية الصغيرة — مراجع منظمة قابلة للتحرير لاحقاً.
 * ملاحظة مهمة: التركيبات العلفية هنا "تركيبات مرجعية موصى بها" وليست وصفات مضمونة،
 * والمعلومات الصحية إرشادية ولا تُغني عن الطبيب البيطري.
 */

export type PoultryFamily = "birds" | "small_livestock";
export type Purpose = "meat" | "eggs" | "dual" | "breeding" | "fur_meat";

export const poultrySpeciesIds = [
  "chicken_broiler",
  "chicken_layer",
  "chicken_dual",
  "chicken_local",
  "duck",
  "goose",
  "quail",
  "turkey",
  "pigeon",
  "guinea_fowl",
  "rabbit",
] as const;

export type SpeciesId = (typeof poultrySpeciesIds)[number];

export interface FeedStage {
  stage: string;
  ageRange: string;
  /** جرام لكل رأس يومياً (تقديري مرجعي) */
  gramsPerHeadPerDay: number;
  protein: string;
  ingredients: string[];
}

export interface TimelineStage {
  stage: string;
  age: string;
  target: string;
  care: string;
}

export interface Disease {
  name: string;
  symptoms: string;
  causes: string;
  prevention: string;
  action: string;
  vaccine?: string;
}

export interface SpeciesProfile {
  id: SpeciesId;
  family: PoultryFamily;
  nameAr: string;
  nameEn: string;
  purpose: Purpose;
  breeds: string[];
  climate: string;
  housing: string;
  spacePerHead: string;
  density: string;
  temperatureByAge: string;
  lighting: string;
  waterPerHead: string;
  feedingSchedule: string;
  productionPeriod: string;
  expectedProduction: string;
  breeding: string;
  incubation: string;
  maturity: string;
  cycle: string;
  records: string;
  feed: FeedStage[];
  timeline: TimelineStage[];
  diseases: Disease[];
}

const commonBirdFeed = (layer = false): FeedStage[] => [
  {
    stage: "بادئ (Starter)",
    ageRange: "0 – 3 أسابيع",
    gramsPerHeadPerDay: 25,
    protein: "20 – 23% بروتين",
    ingredients: ["ذرة صفراء", "كسب صويا", "دقيق سمك", "حجر جيري", "فوسفات ثنائي الكالسيوم", "ملح", "فيتامينات ومعادن"],
  },
  {
    stage: "نامي (Grower)",
    ageRange: "4 – 8 أسابيع",
    gramsPerHeadPerDay: 60,
    protein: "18 – 20% بروتين",
    ingredients: ["ذرة", "ذرة رفيعة", "كسب صويا", "ردة قمح", "حجر جيري", "ملح", "فيتامينات ومعادن"],
  },
  layer
    ? {
        stage: "بياض (Layer)",
        ageRange: "من 18 أسبوعاً وحتى نهاية الإنتاج",
        gramsPerHeadPerDay: 115,
        protein: "16 – 18% بروتين + كالسيوم مرتفع",
        ingredients: ["ذرة", "قمح", "كسب صويا", "ردة", "حجر جيري (كالسيوم)", "فوسفات ثنائي الكالسيوم", "ملح", "فيتامينات ومعادن"],
      }
    : {
        stage: "ناهي (Finisher)",
        ageRange: "من 5 أسابيع حتى التسويق",
        gramsPerHeadPerDay: 130,
        protein: "17 – 19% بروتين",
        ingredients: ["ذرة", "كسب صويا", "ردة", "زيت نباتي", "حجر جيري", "ملح", "فيتامينات ومعادن"],
      },
  {
    stage: "أمهات (Breeder)",
    ageRange: "قطيع التربية",
    gramsPerHeadPerDay: 120,
    protein: "16 – 18% بروتين متوازن",
    ingredients: ["ذرة", "كسب صويا", "دقيق سمك", "حجر جيري", "فوسفات", "ملح", "فيتامينات E و A"],
  },
];

const birdDiseases: Disease[] = [
  {
    name: "النيوكاسل",
    symptoms: "أعراض تنفسية، التواء الرقبة، إسهال أخضر، نفوق مرتفع",
    causes: "فيروس شديد العدوى ينتقل بالهواء والطيور والزوار",
    prevention: "تحصين منتظم، أمن حيوي صارم، منع دخول الزوار والطيور البرية",
    action: "عزل القطيع فوراً والاتصال بالطبيب البيطري — لا يوجد علاج نوعي، الرعاية داعمة فقط",
    vaccine: "برنامج تحصين حسب توصية البيطري (غالباً في الأيام الأولى ويُعاد لاحقاً)",
  },
  {
    name: "الكوكسيديا",
    symptoms: "إسهال مدمم، خمول، تقزّم، انخفاض استهلاك العلف",
    causes: "فرشة رطبة وكثافة عالية ونظافة ضعيفة",
    prevention: "فرشة جافة، تهوية جيدة، تقليل الكثافة، تنظيف المعالف والمساقي",
    action: "استشارة بيطري لاختيار مضاد الكوكسيديا المناسب والالتزام بفترة التحريم قبل التسويق",
  },
  {
    name: "أمراض تنفسية (CRD / التهاب الشعب)",
    symptoms: "عطاس، حشرجة، إفرازات أنفية وعينية، تراجع الإنتاج",
    causes: "أمونيا مرتفعة، تهوية سيئة، تقلبات حرارة، عدوى مختلطة",
    prevention: "تهوية مناسبة، تحكم في الرطوبة، تجنّب الازدحام",
    action: "تشخيص بيطري قبل أي مضاد حيوي، مع الالتزام بفترة التحريم في الطيور المنتجة للغذاء",
  },
  {
    name: "الطفيليات الخارجية (قمل وحلم)",
    symptoms: "هرش، تناقص وزن، تراجع البيض، ريش متساقط",
    causes: "عشش قديمة غير مطهّرة وازدحام",
    prevention: "تطهير العشش ودورية الفرشة وحمامات الرمل",
    action: "معالجة موضعية معتمدة بيطرياً وتطهير المكان بالكامل",
  },
];

function bird(
  p: Omit<SpeciesProfile, "family" | "feed" | "diseases" | "timeline"> & {
    layer?: boolean;
    timeline?: TimelineStage[];
  },
): SpeciesProfile {
  const { layer, timeline, ...rest } = p;
  return {
    ...rest,
    family: "birds",
    feed: commonBirdFeed(layer),
    diseases: birdDiseases,
    timeline:
      timeline ?? [
        { stage: "التفريخ", age: "يوم 0", target: "كتاكيت نشطة بوزن مناسب", care: "ماء نظيف فاتر + تدفئة قبل الاستقبال" },
        { stage: "الحضّانة", age: "1 – 21 يوم", target: "نمو منتظم ونفوق أقل من 2%", care: "33°م أول أسبوع ثم خفض 2-3°م أسبوعياً" },
        { stage: "النمو", age: "3 – 8 أسابيع", target: "بناء الهيكل والعضل", care: "تهوية جيدة وعلف نامي وماء دائم" },
        { stage: "التطوير", age: "8 – 18 أسبوعاً", target: "وزن موحّد قبل الإنتاج", care: "ضبط الإضاءة وتفادي السِمنة" },
        { stage: "الإنتاج", age: "من البلوغ", target: "بيض أو لحم حسب الغرض", care: "كالسيوم كافٍ وسجل إنتاج يومي" },
        { stage: "التربية/الاستبدال", age: "نهاية الدورة", target: "اختيار أمهات أو تجديد القطيع", care: "تسجيل الأداء واستبعاد الضعيف" },
      ],
  };
}

export const speciesProfiles: SpeciesProfile[] = [
  bird({
    id: "chicken_broiler",
    nameAr: "دجاج لاحم (بيور)",
    nameEn: "Broiler chicken",
    purpose: "meat",
    breeds: ["روس 308", "كوب 500", "هبرد"],
    climate: "يتحمل الحر مع تهوية وتبريد؛ حساس للرطوبة العالية",
    housing: "عشة مغلقة أو نصف مغلقة بفرشة جافة 5-8 سم",
    spacePerHead: "0.07 – 0.1 م² للطائر",
    density: "10 – 14 طائراً/م²",
    temperatureByAge: "33°م أسبوع 1 ثم خفض 2-3°م أسبوعياً حتى 22-24°م",
    lighting: "23 ساعة إضاءة أول 3 أيام ثم 18 – 20 ساعة",
    waterPerHead: "ضعف كمية العلف تقريباً (≈ 2 مل لكل جرام علف)",
    feedingSchedule: "علف حر مع مراقبة استهلاك يومي",
    productionPeriod: "دورة تسمين 35 – 42 يوماً",
    expectedProduction: "وزن تسويقي 1.8 – 2.4 كجم بمعامل تحويل 1.6 – 1.8",
    breeding: "يُشترى ككتاكيت من أمهات متخصصة، لا يُربّى للتربية عادة",
    incubation: "21 يوماً (في مفرخ الأمهات)",
    maturity: "لا ينطبق — يُسوّق قبل البلوغ",
    cycle: "6 – 7 أسابيع + أسبوع تنظيف",
    records: "الوزن الأسبوعي، النفوق، استهلاك العلف، الأدوية وفترة التحريم",
  }),
  bird({
    id: "chicken_layer",
    layer: true,
    nameAr: "دجاج بياض",
    nameEn: "Layer chicken",
    purpose: "eggs",
    breeds: ["لوهمان براون", "هاي لاين", "إيزا براون"],
    climate: "معتدل إلى حار مع تهوية جيدة",
    housing: "عشة بأعشاش بيض (عش لكل 4-5 دجاجات) ومجاثم",
    spacePerHead: "0.15 – 0.2 م² للطائر",
    density: "6 – 8 طيور/م² أرضي",
    temperatureByAge: "حضّانة 33°م ثم بيئة إنتاج 18 – 26°م",
    lighting: "16 ساعة إضاءة يومياً خلال الإنتاج",
    waterPerHead: "200 – 250 مل يومياً",
    feedingSchedule: "وجبتان رئيسيتان صباحاً ومساءً + علف حر",
    productionPeriod: "من 18 – 20 أسبوعاً حتى 72 – 80 أسبوعاً",
    expectedProduction: "280 – 320 بيضة سنوياً للدجاجة",
    breeding: "تحتاج ديكاً واحداً لكل 8 – 10 دجاجات للبيض المُلقّح",
    incubation: "21 يوماً",
    maturity: "18 – 20 أسبوعاً",
    cycle: "دورة إنتاج ~14 شهراً",
    records: "البيض اليومي، النفوق، العلف، وزن الطائر، التحصينات",
  }),
  bird({
    id: "chicken_dual",
    layer: true,
    nameAr: "دجاج مزدوج الغرض",
    nameEn: "Dual-purpose chicken",
    purpose: "dual",
    breeds: ["رود آيلاند رد", "سَسكس", "بليموث روك"],
    climate: "يتحمل تقلبات المناخ ومناسب للتربية المنزلية",
    housing: "عشة مع ساحة خارجية مسوّرة",
    spacePerHead: "0.2 م² داخل + 1 م² ساحة",
    density: "5 – 6 طيور/م²",
    temperatureByAge: "حضّانة 33°م ثم 20 – 26°م",
    lighting: "14 – 16 ساعة",
    waterPerHead: "200 – 250 مل يومياً",
    feedingSchedule: "وجبتان + مخلفات مزرعة نظيفة",
    productionPeriod: "بيض من 22 أسبوعاً، لحم من 12 أسبوعاً",
    expectedProduction: "180 – 220 بيضة سنوياً ووزن 2 – 3 كجم",
    breeding: "تربية طبيعية ممكنة مع أمهات حاضنة",
    incubation: "21 يوماً",
    maturity: "22 – 24 أسبوعاً",
    cycle: "سنوي",
    records: "البيض، الأوزان، التحصينات، الفقس",
  }),
  bird({
    id: "chicken_local",
    layer: true,
    nameAr: "دجاج بلدي محلي",
    nameEn: "Local/indigenous chicken",
    purpose: "dual",
    breeds: ["بلدي", "فيومي", "دجاج عربي"],
    climate: "الأكثر تحمّلاً للحرارة والظروف القاسية",
    housing: "عشة بسيطة جيدة التهوية + رعي حر",
    spacePerHead: "0.2 م² داخل + رعي",
    density: "5 طيور/م²",
    temperatureByAge: "حضّانة 32°م ثم بيئة طبيعية",
    lighting: "إضاءة طبيعية + 2 ساعة إضافية شتاءً",
    waterPerHead: "150 – 200 مل يومياً",
    feedingSchedule: "وجبتان + رعي وحبوب",
    productionPeriod: "بيض موسمي على مدار السنة",
    expectedProduction: "120 – 160 بيضة سنوياً ووزن 1.2 – 1.8 كجم",
    breeding: "حضانة طبيعية 10 – 15 بيضة للأم",
    incubation: "21 يوماً",
    maturity: "24 – 28 أسبوعاً",
    cycle: "سنوي",
    records: "الفقس، النفوق، البيض، الأدوية",
  }),
  bird({
    id: "duck",
    layer: true,
    nameAr: "بط",
    nameEn: "Ducks",
    purpose: "dual",
    breeds: ["بكيني", "مسكوفي", "خاكي كامبل"],
    climate: "يفضّل الأجواء الرطبة ويحتاج ماءً للسباحة أو حوضاً",
    housing: "مأوى أرضي بفرشة سميكة + حوض ماء وتصريف جيد",
    spacePerHead: "0.25 – 0.3 م²",
    density: "4 – 6 طيور/م²",
    temperatureByAge: "30°م أسبوع 1 ثم خفض تدريجي إلى 20°م",
    lighting: "14 – 16 ساعة",
    waterPerHead: "شرب 350 – 500 مل + ماء للاستحمام",
    feedingSchedule: "علف مبلل قليلاً 2 – 3 مرات يومياً",
    productionPeriod: "بيض من 22 أسبوعاً؛ لحم 8 – 10 أسابيع",
    expectedProduction: "180 – 280 بيضة (خاكي كامبل) أو وزن 3 – 4 كجم",
    breeding: "ذكر لكل 5 إناث",
    incubation: "28 يوماً (مسكوفي 35 يوماً)",
    maturity: "22 – 26 أسبوعاً",
    cycle: "سنوي",
    records: "البيض، النفوق، العلف، جودة الماء",
  }),
  bird({
    id: "goose",
    layer: true,
    nameAr: "إوز",
    nameEn: "Geese",
    purpose: "meat",
    breeds: ["تولوز", "إمبدن", "بلدي"],
    climate: "يتحمل البرد جيداً ويحتاج ظلاً في الحر",
    housing: "مأوى بسيط + مرعى واسع وحوض ماء",
    spacePerHead: "1 م² مأوى + 5 – 10 م² مرعى",
    density: "1 – 2 طائر/م² في المأوى",
    temperatureByAge: "30°م أسبوع 1 ثم خفض حتى 18 – 20°م",
    lighting: "طبيعية + 14 ساعة في موسم البيض",
    waterPerHead: "0.5 – 1 لتر يومياً",
    feedingSchedule: "رعي + وجبة حبوب مكمّلة يومياً",
    productionPeriod: "موسم بيض ربيعي، لحم 12 – 16 أسبوعاً",
    expectedProduction: "30 – 60 بيضة موسمياً ووزن 5 – 7 كجم",
    breeding: "ذكر لكل 3 – 4 إناث",
    incubation: "28 – 32 يوماً",
    maturity: "8 – 10 أشهر",
    cycle: "موسمي سنوي",
    records: "البيض، الفقس، الأوزان، الرعي",
  }),
  bird({
    id: "quail",
    layer: true,
    nameAr: "سُمّان (فرّي)",
    nameEn: "Quail",
    purpose: "dual",
    breeds: ["ياباني (كوترنكس)", "فرعوني", "جامبو"],
    climate: "يحتاج بيئة دافئة مستقرة وحماية من التيارات",
    housing: "أقفاص بطاريات صغيرة أو صناديق بفرشة ناعمة",
    spacePerHead: "150 – 200 سم² للطائر",
    density: "50 – 60 طائراً/م²",
    temperatureByAge: "37°م أول 3 أيام ثم خفض 3°م أسبوعياً حتى 24°م",
    lighting: "16 ساعة للبيض",
    waterPerHead: "30 – 50 مل يومياً",
    feedingSchedule: "علف حر ناعم بروتين مرتفع",
    productionPeriod: "بيض من 6 – 7 أسابيع لمدة 10 – 12 شهراً",
    expectedProduction: "250 – 300 بيضة سنوياً ووزن 180 – 250 جم",
    breeding: "ذكر لكل 3 إناث",
    incubation: "17 – 18 يوماً",
    maturity: "6 – 7 أسابيع",
    cycle: "سريع — عدة دورات سنوياً",
    records: "البيض، النفوق، العلف، الحرارة",
  }),
  bird({
    id: "turkey",
    nameAr: "ديك رومي",
    nameEn: "Turkey",
    purpose: "meat",
    breeds: ["أبيض عريض الصدر", "برونز", "بلدي"],
    climate: "يحتاج ظلاً وتهوية قوية في الحر",
    housing: "عشة عالية السقف بفرشة جافة + ساحة",
    spacePerHead: "0.4 – 0.5 م²",
    density: "2 – 3 طيور/م²",
    temperatureByAge: "35°م أسبوع 1 ثم خفض 3°م أسبوعياً",
    lighting: "16 – 18 ساعة في الحضّانة ثم 14 ساعة",
    waterPerHead: "0.5 – 1 لتر يومياً",
    feedingSchedule: "علف حر بروتين مرتفع في البداية",
    productionPeriod: "تسمين 14 – 20 أسبوعاً",
    expectedProduction: "وزن 8 – 15 كجم للذكر و5 – 8 كجم للأنثى",
    breeding: "ذكر لكل 8 – 10 إناث (غالباً تلقيح صناعي في التجاري)",
    incubation: "28 يوماً",
    maturity: "30 أسبوعاً",
    cycle: "دورة 4 – 5 أشهر",
    records: "الأوزان، النفوق، العلف، التحصينات",
  }),
  bird({
    id: "pigeon",
    nameAr: "حمام",
    nameEn: "Pigeons",
    purpose: "dual",
    breeds: ["بلدي", "كنج", "حمام لاحم"],
    climate: "يتحمل الحر والجفاف بشكل ممتاز",
    housing: "برج/عيون حمام (عين لكل زوج) نظيفة وجافة",
    spacePerHead: "عين 30×30×30 سم لكل زوج",
    density: "زوج لكل عين",
    temperatureByAge: "طبيعية مع حماية الزغاليل من البرد",
    lighting: "طبيعية",
    waterPerHead: "50 – 80 مل يومياً",
    feedingSchedule: "حبوب مرتين يومياً + جريش وحصى",
    productionPeriod: "إنتاج مستمر 6 – 8 بطون سنوياً",
    expectedProduction: "زوج زغاليل كل 5 – 6 أسابيع",
    breeding: "أزواج ثابتة، يحتضن الوالدان معاً",
    incubation: "17 – 18 يوماً",
    maturity: "5 – 6 أشهر",
    cycle: "مستمر",
    records: "البطون، الفقس، النفوق، العلف",
  }),
  bird({
    id: "guinea_fowl",
    nameAr: "دجاج غينيا (الحبش الحبشي)",
    nameEn: "Guinea fowl",
    purpose: "dual",
    breeds: ["رمادي لؤلؤي", "أبيض", "بلدي"],
    climate: "يتحمل الحر والجفاف ويحب الرعي الحر",
    housing: "مأوى ليلي مغلق + رعي نهاري واسع",
    spacePerHead: "0.25 م² مأوى + رعي",
    density: "4 – 5 طيور/م²",
    temperatureByAge: "35°م أسبوع 1 ثم خفض تدريجي",
    lighting: "طبيعية",
    waterPerHead: "150 – 200 مل يومياً",
    feedingSchedule: "علف صباحي + رعي حشرات",
    productionPeriod: "موسم بيض 6 – 7 أشهر",
    expectedProduction: "80 – 120 بيضة موسمياً ووزن 1.3 – 1.6 كجم",
    breeding: "ذكر لكل 4 – 5 إناث، يفضّل تفريخ صناعي",
    incubation: "26 – 28 يوماً",
    maturity: "8 – 9 أشهر",
    cycle: "موسمي",
    records: "البيض، الفقس، النفوق، الرعي",
  }),
  {
    id: "rabbit",
    family: "small_livestock",
    nameAr: "أرانب",
    nameEn: "Rabbits",
    purpose: "fur_meat",
    breeds: ["نيوزيلندي أبيض", "كاليفورنيا", "بوسكات", "بلدي"],
    climate: "يتأثر بالحر الشديد — يحتاج تظليلاً وتبريداً فوق 28°م",
    housing: "بطاريات أو أقفاص سلكية مرتفعة بتصريف جيد",
    spacePerHead: "0.15 م² للنامي و0.5 م² للأم مع صندوق ولادة",
    density: "6 – 8 نامية/م² في القفص",
    temperatureByAge: "خلفة حديثة تحتاج 30°م داخل صندوق الولادة؛ البالغ 18 – 24°م",
    lighting: "14 – 16 ساعة للأمهات",
    waterPerHead: "250 – 500 مل يومياً (حلمات شرب)",
    feedingSchedule: "علف مركب مُحبّب + دريس بجودة عالية، وجبتان يومياً",
    productionPeriod: "من 5 أشهر حتى 3 سنوات للأم",
    expectedProduction: "5 – 8 بطون سنوياً، 6 – 9 خلفة للبطن، وزن تسويقي 2 – 2.5 كجم",
    breeding: "ذكر لكل 8 – 10 أمهات، تلقيح بعد 10 – 14 يوماً من الولادة",
    incubation: "فترة حمل 30 – 32 يوماً",
    maturity: "4.5 – 5 أشهر",
    cycle: "دورة تسمين 70 – 80 يوماً",
    records: "البطون، الفطام، النفوق، الأوزان، العلف",
    feed: [
      {
        stage: "علف نامي",
        ageRange: "الفطام – التسويق",
        gramsPerHeadPerDay: 120,
        protein: "16 – 17% بروتين + ألياف 14%",
        ingredients: ["دريس برسيم", "شعير", "ردة قمح", "كسب صويا", "حجر جيري", "ملح", "فيتامينات ومعادن"],
      },
      {
        stage: "علف أمهات مرضعة",
        ageRange: "الحمل والرضاعة",
        gramsPerHeadPerDay: 200,
        protein: "17 – 18% بروتين",
        ingredients: ["دريس برسيم", "ذرة", "كسب صويا", "ردة", "فوسفات ثنائي الكالسيوم", "ملح", "فيتامينات"],
      },
      {
        stage: "علف ذكور/صيانة",
        ageRange: "بالغ غير منتج",
        gramsPerHeadPerDay: 130,
        protein: "15 – 16% بروتين",
        ingredients: ["دريس", "شعير", "ردة", "حجر جيري", "ملح"],
      },
    ],
    timeline: [
      { stage: "الولادة", age: "يوم 0", target: "6 – 9 خلفة سليمة", care: "صندوق ولادة نظيف ودافئ وعدم إزعاج الأم" },
      { stage: "الرضاعة", age: "0 – 21 يوم", target: "زيادة وزن يومية منتظمة", care: "علف أمهات وماء دائم ومراقبة الضرع" },
      { stage: "الفطام", age: "28 – 35 يوماً", target: "وزن 600 – 800 جم", care: "انتقال تدريجي للعلف النامي لتفادي الإسهال" },
      { stage: "التسمين", age: "35 – 80 يوماً", target: "وزن 2 – 2.5 كجم", care: "تهوية وتبريد ومراقبة الكوكسيديا" },
      { stage: "البلوغ/الاستبدال", age: "4.5 – 5 أشهر", target: "اختيار أمهات بديلة", care: "تسجيل الأداء واستبعاد الضعيف" },
    ],
    diseases: [
      {
        name: "الكوكسيديا المعوية والكبدية",
        symptoms: "إسهال، انتفاخ بطن، تقزّم، نفوق بعد الفطام",
        causes: "نظافة ضعيفة ورطوبة وازدحام",
        prevention: "تنظيف الأقفاص، منع تلوث العلف بالبراز، تقليل الكثافة",
        action: "استشارة بيطري لمضاد كوكسيديا مناسب مع مراعاة فترة التحريم",
      },
      {
        name: "الجرب (حلم الأذن والجسم)",
        symptoms: "قشور في الأذن، هرش، فقدان وزن",
        causes: "حلم ينتقل بالتلامس والأقفاص الملوثة",
        prevention: "حجر الأرانب الجديدة وتطهير الأقفاص",
        action: "علاج بيطري موضعي/حقن معتمد وتطهير شامل",
      },
      {
        name: "الإسهال المخاطي (Enteritis)",
        symptoms: "إسهال مخاطي، خمول، رفض العلف",
        causes: "تغيير علف مفاجئ أو نقص ألياف أو عدوى",
        prevention: "دريس دائم وتغيير العلف تدريجياً",
        action: "ترطيب داعم وعرض على البيطري فوراً",
      },
      {
        name: "الإجهاد الحراري",
        symptoms: "لهث، رفض علف، نفوق مفاجئ صيفاً",
        causes: "حرارة فوق 30°م ورطوبة وتهوية سيئة",
        prevention: "تظليل، مراوح، ترطيب، ماء بارد دائم",
        action: "تبريد فوري وتقليل الكثافة وتغذية ليلية",
      },
    ],
  },
];

export const speciesById = Object.fromEntries(
  speciesProfiles.map((s) => [s.id, s]),
) as Record<SpeciesId, SpeciesProfile>;

export const recordKinds = [
  "mortality",
  "hatch",
  "eggs",
  "meat",
  "feed",
  "vaccination",
  "treatment",
  "sale",
  "purchase",
  "expense",
] as const;
export type RecordKind = (typeof recordKinds)[number];

export const recordKindLabels: Record<RecordKind, { ar: string; unit: string }> = {
  mortality: { ar: "نفوق", unit: "رأس" },
  hatch: { ar: "فقس/ولادة", unit: "رأس" },
  eggs: { ar: "إنتاج بيض", unit: "بيضة" },
  meat: { ar: "إنتاج لحم", unit: "كجم" },
  feed: { ar: "استهلاك علف", unit: "كجم" },
  vaccination: { ar: "تحصين", unit: "رأس" },
  treatment: { ar: "علاج", unit: "رأس" },
  sale: { ar: "بيع", unit: "رأس" },
  purchase: { ar: "شراء", unit: "رأس" },
  expense: { ar: "مصروف", unit: "-" },
};
