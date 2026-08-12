/**
 * دليل الأعلاف: أنواع محاصيل العلف، الشعير المستنبت، الحش والتخزين.
 * العربية هي اللغة الأساسية، والإنجليزية هي المرجع للترجمة لبقية اللغات.
 */

import type { LongGuide } from "./guides";

export const fodderGuide: Record<"ar" | "en", LongGuide> = {
  ar: {
    intro:
      "الأعلاف الخضراء هي عصب تربية الحيوان: بروتين رخيص وطاقة عالية تُخفّض تكلفة التغذية 40-60% مقارنة بالأعلاف المركّزة. تشمل محاصيل حقلية مثل البرسيم الحجازي والذرة العلفية والشعير، إضافة إلى الشعير المستنبت الذي يُنتج علفاً أخضر داخل غرفة صغيرة في 7-9 أيام فقط.",
    sections: [
      {
        title: "أهم محاصيل الأعلاف",
        items: [
          "البرسيم الحجازي (Alfalfa): معمّر 4-6 سنوات، 8-12 حشة سنوياً، بروتين 18-22% — سيد الأعلاف.",
          "البرسيم المصري (الجت/Berseem): علف شتوي سريع، 4-6 حشات، ممتاز للأبقار الحلوب.",
          "الذرة العلفية: أعلى إنتاج مادة جافة للسيلاج، تُحش عند مرحلة العجين اللبني.",
          "الشعير والشوفان: أعلاف شتوية تتحمل الملوحة والبرد، مناسبة للرعي والحش.",
          "حشيشة السودان والدخن العلفي: صيفية سريعة النمو ومتحمّلة للحرارة والجفاف.",
          "الرودس جراس (Rhodes): مقاوم للملوحة والحرارة، مثالي للخليج والمناطق الجافة.",
          "الأعلاف البقولية الشجرية: اللوسيانا والمورينجا والغاف — أوراق عالية البروتين وظل للحيوان.",
        ],
      },
      {
        title: "زراعة البرسيم الحجازي خطوة بخطوة",
        items: [
          "اختر أرضاً جيدة الصرف، pH بين 6.5 و 7.5، وحرّثها جيداً ونظّفها من الحشائش المعمّرة.",
          "أضف 20-30 م³ سماد بلدي متحلل للهكتار مع سوبر فوسفات قبل الزراعة.",
          "معدل البذر: 20-25 كجم/هكتار نثراً أو 15-18 كجم بالسطور مع تغطية سطحية 1 سم فقط.",
          "ازرع في الخريف (سبتمبر-نوفمبر) أو الربيع المبكر، ورُشّ رياً خفيفاً متكرراً حتى الإنبات.",
          "الري كل 7-10 أيام صيفاً و 15-20 يوماً شتاءً، مع تعطيش خفيف قبل كل حشة.",
          "أول حشة بعد 70-90 يوماً، ثم كل 25-35 يوماً عند بداية التزهير (10% إزهار).",
          "اترك 5-7 سم من قواعد النبات عند الحش للحفاظ على تجدد النمو.",
        ],
      },
      {
        title: "الشعير المستنبت (علف أخضر في 8 أيام)",
        items: [
          "اغسل بذور شعير سليمة ثم انقعها 8-12 ساعة في ماء مع قليل من كلور مخفّف للتعقيم.",
          "صفّها في صواني بسماكة 1.5-2 سم (تقريباً 1.5 كجم بذر لصينية 40×60 سم).",
          "ارصف الصواني على أرفف داخل غرفة مظللة حرارتها 18-24°م ورطوبتها 60-70%.",
          "رُشّ بالماء 4-6 مرات يومياً بضباب خفيف مع تصريف كامل لمنع التعفّن.",
          "بعد 7-9 أيام يصل الارتفاع 15-20 سم — كل 1 كجم بذر يعطي 6-8 كجم علف أخضر.",
          "قدّمه كاملاً (الجذور والحصير) للأغنام والأبقار مع تدريج التقديم أول أسبوع.",
          "استخدم تهوية جيدة ونظّف الصواني بالكلور بين الدورات لمنع العفن الأخضر.",
        ],
      },
      {
        title: "التسميد وإدارة الحش",
        items: [
          "البقوليات (البرسيم) تثبّت النيتروجين: قلّل اليوريا وركّز على الفوسفور والبوتاسيوم.",
          "النجيليات (ذرة/شعير/رودس) تحتاج 40-60 كجم N للهكتار بعد كل حشة.",
          "أضف الكبريت والزنك والبورون في الأراضي الجيرية لرفع البروتين والنمو.",
          "لا تحش أثناء الحرارة الشديدة نهاراً؛ الحش الصباحي يحفظ القيمة الغذائية.",
          "جدّد حقل البرسيم كل 4-5 سنوات أو عند انخفاض الكثافة تحت 60%.",
        ],
      },
      {
        title: "التجفيف والتخزين والسيلاج",
        items: [
          "للدريس: جفّف حتى تصل الرطوبة 15-18% ثم اربطه في بالات وخزّنه في مكان مظلل جاف.",
          "للسيلاج: احش الذرة عند 30-35% مادة جافة، فرّمها 1-2 سم، اكبسها جيداً واعزلها هوائياً.",
          "أضف مولاس 2-3% للسيلاج الفقير بالسكريات لتحسين التخمّر.",
          "لا تقدّم علفاً متعفّناً أو ساخناً؛ العفن يسبّب إسقاط الحمل وأمراض الكبد.",
          "احذر انتفاخ الكرش عند الرعي المفاجئ للبرسيم الطري — قدّم تبناً جافاً قبل الرعي.",
        ],
      },
      {
        title: "مشكلات شائعة وحلولها",
        items: [
          "اصفرار البرسيم: نقص كبريت أو حديد، أو غدق التربة — حسّن الصرف ورُشّ مخلّب حديد.",
          "دودة ورق القطن وحفّار الساق: مصائد فرمونية وBt حيوي، وتجنّب المبيدات قبل الحش بأسبوعين.",
          "المن على البرسيم: رُشّ صابون بوتاسي أو زيت نيم وشجّع أبو العيد.",
          "تعفّن الشعير المستنبت: زيادة الرطوبة وسوء التهوية — قلّل الرش وزد التصريف.",
          "ملوحة الماء: اختر الرودس أو الشعير، واغسل التربة بجرعة ري زائدة 20%.",
        ],
      },
    ],
  },
  en: {
    intro:
      "Green fodder is the backbone of livestock farming: cheap protein and energy that cut feed cost by 40-60% versus concentrates. It covers field crops such as alfalfa, fodder maize and barley, plus hydroponic barley fodder that yields fresh green feed in a small room in only 7-9 days.",
    sections: [
      {
        title: "Main fodder crops",
        items: [
          "Alfalfa: perennial for 4-6 years, 8-12 cuts a year, 18-22% protein — the king of fodder.",
          "Berseem clover: fast winter fodder, 4-6 cuts, excellent for dairy cows.",
          "Fodder maize: highest dry-matter yield for silage; cut at the milky-dough stage.",
          "Barley and oats: winter fodders tolerant of cold and salinity, good for grazing and cutting.",
          "Sudan grass and fodder millet: fast summer crops tolerant of heat and drought.",
          "Rhodes grass: salt and heat tolerant, ideal for Gulf and arid regions.",
          "Fodder trees and legumes: leucaena, moringa and ghaf — high-protein leaves plus shade.",
        ],
      },
      {
        title: "Growing alfalfa step by step",
        items: [
          "Pick well-drained land with pH 6.5-7.5, plough deeply and clear perennial weeds.",
          "Apply 20-30 m³/ha of well-rotted manure plus superphosphate before sowing.",
          "Seed rate: 20-25 kg/ha broadcast or 15-18 kg/ha in rows, covered by only 1 cm of soil.",
          "Sow in autumn (September-November) or early spring; irrigate lightly and often until emergence.",
          "Irrigate every 7-10 days in summer and 15-20 days in winter, with a slight dry-down before each cut.",
          "First cut after 70-90 days, then every 25-35 days at 10% bloom.",
          "Leave 5-7 cm of stubble when cutting so regrowth stays vigorous.",
        ],
      },
      {
        title: "Hydroponic barley fodder (green feed in 8 days)",
        items: [
          "Wash sound barley seed, then soak 8-12 hours in water with a little diluted chlorine to sanitize.",
          "Spread it in trays 1.5-2 cm deep (about 1.5 kg of seed per 40x60 cm tray).",
          "Stack trays on shelves in a shaded room at 18-24°C and 60-70% humidity.",
          "Mist 4-6 times a day with full drainage to prevent rot.",
          "After 7-9 days the mat reaches 15-20 cm — each 1 kg of seed gives 6-8 kg of green fodder.",
          "Feed the whole mat (roots included) to sheep and cattle, introducing it gradually the first week.",
          "Keep airflow strong and disinfect trays between cycles to stop green mould.",
        ],
      },
      {
        title: "Fertilizing and cutting management",
        items: [
          "Legumes fix nitrogen: cut back urea and focus on phosphorus and potassium.",
          "Grasses (maize, barley, Rhodes) need 40-60 kg N/ha after every cut.",
          "Add sulphur, zinc and boron on calcareous soils to raise protein and growth.",
          "Avoid cutting during peak midday heat; morning cuts preserve feed value.",
          "Renew an alfalfa stand every 4-5 years or when density drops below 60%.",
        ],
      },
      {
        title: "Drying, storage and silage",
        items: [
          "For hay: dry to 15-18% moisture, bale it and store dry and shaded.",
          "For silage: cut maize at 30-35% dry matter, chop to 1-2 cm, compact hard and seal airtight.",
          "Add 2-3% molasses to low-sugar silage to improve fermentation.",
          "Never feed mouldy or hot fodder — mould causes abortion and liver disease.",
          "Beware of bloat when animals suddenly graze lush clover; offer dry hay before grazing.",
        ],
      },
      {
        title: "Common problems and fixes",
        items: [
          "Yellow alfalfa: sulphur or iron deficiency, or waterlogging — improve drainage and spray chelated iron.",
          "Armyworm and stem borer: pheromone traps and biological Bt; avoid pesticides within two weeks of cutting.",
          "Aphids on alfalfa: spray potassium soap or neem oil and encourage ladybirds.",
          "Rotting barley mats: too much moisture and poor airflow — mist less and drain more.",
          "Saline water: choose Rhodes grass or barley and leach the soil with 20% extra irrigation.",
        ],
      },
    ],
  },
};
