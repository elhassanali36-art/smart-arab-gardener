/**
 * Static educational content for the greenhouse and compost sections.
 * Arabic is the base language; English is the fallback for other languages.
 */

export type GuideSection = { title: string; items: string[] };
export type LongGuide = { intro: string; sections: GuideSection[] };

export const greenhouseGuide: Record<"ar" | "en", LongGuide> = {
  ar: {
    intro:
      "البيت المحمي (الدفيئة) غلاف شفاف يحفظ الحرارة والرطوبة ويحمي المحصول من الرياح والغبار والحشرات، فيمنحك موسماً زراعياً ممتداً على مدار السنة وإنتاجاً أعلى بمياه أقل.",
    sections: [
      {
        title: "فوائد الزراعة المحمية",
        items: [
          "إنتاج على مدار السنة خارج المواسم الطبيعية وبأسعار بيع أفضل.",
          "توفير 40-60% من مياه الري بفضل تقليل التبخر واستخدام التنقيط.",
          "حماية من الرياح والغبار والأمطار والصقيع وموجات الحرارة.",
          "تقليل الآفات والأمراض، وبالتالي تقليل المبيدات وتحسين جودة المحصول.",
          "إنتاجية أعلى 3-10 أضعاف للمتر المربع مقارنة بالحقل المكشوف.",
          "إمكانية التحكم الكامل في التسميد عبر الري (Fertigation).",
        ],
      },
      {
        title: "أنواع البيوت المحمية",
        items: [
          "بيت بلاستيكي نفقي (Tunnel): الأرخص والأسهل، مناسب للمبتدئين.",
          "بيت مغطى بالبولي كربونات: أطول عمراً وأفضل عزلاً، تكلفة أعلى.",
          "البيت الزجاجي: احترافي وعمره طويل، مناسب للمشاريع التجارية.",
          "بيت شبكي (Net house): للمناخ الحار جداً، يوفر تظليلاً وحماية من الحشرات.",
        ],
      },
      {
        title: "خطوات إنشاء بيت محمي صغير",
        items: [
          "اختر موقعاً مشمساً مستوياً بعيداً عن ظل المباني، ووجّه الطول من الشمال إلى الجنوب.",
          "جهّز هيكلاً من مواسير معدنية مجلفنة أو PVC بارتفاع 2.5-3 م لتصريف الحرارة.",
          "غطِّ بشريحة بولي إثيلين 200 ميكرون مقاومة للأشعة فوق البنفسجية، وثبّتها بمجرى وسلك زجزاج.",
          "اترك فتحات تهوية جانبية وسقفية مع شبك مانع للحشرات 50 ميش.",
          "أضف نظام ري بالتنقيط مع فلتر وخزان سماد سائل، وغطِّ الأرض بالملش (البلاستيك الأسود).",
          "ثبّت ترمومتر ومقياس رطوبة، وأضف مراوح شفط أو خلايا تبريد (Pad & Fan) في المناخ الحار.",
          "عقّم التربة أو استخدم أكياس البيتموس/البيرلايت للزراعة بدون تربة.",
        ],
      },
      {
        title: "إدارة الزراعة داخل البيت المحمي",
        items: [
          "الحرارة المثالية للخضروات 18-28°م نهاراً و14-18°م ليلاً؛ افتح التهوية عند التجاوز.",
          "الرطوبة النسبية 60-70%؛ الرطوبة العالية تسبب البياض والعفن الرمادي.",
          "استخدم التربية العمودية (خيوط ودعامات) للطماطم والخيار والفلفل لزيادة الإنتاج.",
          "ساعد التلقيح بالرجّ اليدوي أو بمراوح أو بخلايا نحل الطنان للطماطم.",
          "أفضل المحاصيل المحمية: طماطم، خيار، فلفل ملوّن، باذنجان، فراولة، شتلات، ورقيات وأعشاب.",
          "تابع الأمراض أسبوعياً واستخدم المصائد اللاصقة الصفراء والزرقاء للكشف المبكر.",
          "دورة زراعية ونظافة صارمة: إزالة بقايا النبات ومنع دخول الأحذية الملوثة.",
        ],
      },
    ],
  },
  en: {
    intro:
      "A greenhouse is a transparent shelter that holds heat and humidity and protects the crop from wind, dust and insects, giving you a year-round season with higher yields and less water.",
    sections: [
      {
        title: "Benefits of protected cultivation",
        items: [
          "Year-round, off-season production with better market prices.",
          "Saves 40-60% of irrigation water thanks to less evaporation and drip lines.",
          "Protection from wind, dust, rain, frost and heat waves.",
          "Fewer pests and diseases, so fewer pesticides and better quality.",
          "3-10x higher yield per square metre than open field.",
          "Full control of nutrition through fertigation.",
        ],
      },
      {
        title: "Greenhouse types",
        items: [
          "Plastic tunnel: cheapest and easiest, ideal for beginners.",
          "Polycarbonate house: longer life and better insulation, higher cost.",
          "Glass house: professional, long lasting, best for commercial projects.",
          "Net house: for very hot climates — shading plus insect protection.",
        ],
      },
      {
        title: "Building a small greenhouse",
        items: [
          "Pick a sunny, level site away from building shade and orient it north-south.",
          "Build a galvanised steel or PVC frame 2.5-3 m high so heat can rise.",
          "Cover with 200-micron UV-stabilised polyethylene fixed with a channel and zigzag wire.",
          "Leave side and roof vents fitted with 50-mesh insect netting.",
          "Install drip irrigation with a filter and liquid fertilizer tank; mulch the ground.",
          "Add a thermometer and hygrometer, plus exhaust fans or a pad-and-fan cooler in hot climates.",
          "Sterilise the soil or grow in peat/perlite bags for a soilless system.",
        ],
      },
      {
        title: "Managing the crop inside",
        items: [
          "Target 18-28°C by day and 14-18°C at night; vent when it goes higher.",
          "Keep relative humidity at 60-70%; high humidity causes mildew and grey mould.",
          "Train tomato, cucumber and pepper vertically on strings for higher yield.",
          "Assist pollination by hand shaking, fans or bumblebees for tomato.",
          "Best crops: tomato, cucumber, coloured pepper, eggplant, strawberry, seedlings, leafy greens and herbs.",
          "Scout weekly and use yellow and blue sticky traps for early detection.",
          "Rotate crops and keep strict hygiene: remove plant debris, avoid contaminated footwear.",
        ],
      },
    ],
  },
};

export const compostGuide: Record<"ar" | "en", LongGuide> = {
  ar: {
    intro:
      "الكمبوست سماد عضوي ناتج عن تخمّر مخلفات النبات والمطبخ بفعل الكائنات الدقيقة. يحسّن بنية التربة ويزيد قدرتها على حفظ الماء والعناصر، ويغنيك عن جزء كبير من الأسمدة الكيميائية.",
    sections: [
      {
        title: "المواد المطلوبة",
        items: [
          "مواد بنية غنية بالكربون: قش، أوراق جافة، نشارة خشب، كرتون ممزق، قشور نخيل وسعف مفروم.",
          "مواد خضراء غنية بالنيتروجين: بقايا خضار وفواكه، تفل قهوة وشاي، عشب مقصوص، روث حيوانات نباتية (أبقار/دواجن معتّق).",
          "ماء لترطيب الكومة، وهواء (تقليب) لتهوية الأكسجين.",
          "أدوات: مذراة أو مجرفة، صندوق كمبوست أو شبك دائري، ترمومتر كومة (اختياري)، حفنة تربة أو كمبوست جاهز كبادئ ميكروبي.",
        ],
      },
      {
        title: "ممنوع إضافته",
        items: [
          "اللحوم والعظام والأسماك ومنتجات الحليب والزيوت (تجذب الحشرات والقوارض وتنشر الروائح).",
          "فضلات الكلاب والقطط والإنسان (مسببات أمراض).",
          "النباتات المصابة بأمراض والأعشاب المزهرة بالبذور.",
          "الجرائد الملونة، الفحم المستعمل، والمواد المعالجة كيميائياً أو الخشب المطلي.",
        ],
      },
      {
        title: "خطوات التحضير",
        items: [
          "اختر مكاناً مظللاً على الأرض بمساحة لا تقل عن 1×1 م وبارتفاع 1 م للحصول على حرارة كافية.",
          "ابدأ بطبقة خشنة (أغصان صغيرة) بسماكة 10 سم للتصريف والتهوية.",
          "أضف طبقات متبادلة: طبقة بنية 10 سم ثم طبقة خضراء 5 سم، بنسبة تقريبية 2-3 بني : 1 أخضر.",
          "رشّ حفنة تربة أو كمبوست قديم بين الطبقات لإدخال الميكروبات.",
          "بلّل كل طبقة حتى تصبح رطوبتها كإسفنجة معصورة (50-60%) بلا ماء راكد.",
          "غطِّ الكومة بخيش أو بلاستيك مثقّب لحفظ الحرارة والرطوبة.",
          "قلّب الكومة كل 5-7 أيام في الأسبوعين الأولين، ثم كل 10-14 يوماً.",
          "راقب الحرارة: 55-65°م في مرحلة النشاط تقتل البذور والمسببات المرضية.",
        ],
      },
      {
        title: "علامات النضج والاستخدام",
        items: [
          "الكمبوست جاهز بعد 6-10 أسابيع صيفاً و3-4 أشهر شتاءً.",
          "لونه بني غامق، هش، رائحته كرائحة تراب الغابة، وحرارته عادت لحرارة الجو.",
          "نخّله واستخدم الخشن كملش سطحي والناعم في خلطات الشتلات.",
          "المعدل: 3-5 كجم لكل متر مربع سنوياً، أو 20-30% من حجم خلطة الأصص.",
          "يمكن تصنيع شاي الكمبوست: كيس كمبوست في 10 لتر ماء 24-48 ساعة مع تهوية، ثم الرش أو السقي.",
        ],
      },
      {
        title: "حل المشكلات الشائعة",
        items: [
          "رائحة عفنة كالأمونيا؟ زد المواد البنية وقلّب الكومة لزيادة الأكسجين.",
          "الكومة باردة ولا تتحلل؟ زد المواد الخضراء والرطوبة، وكبّر حجم الكومة.",
          "ذباب وحشرات؟ غطِّ بقايا المطبخ بطبقة بنية دائماً.",
          "الكومة جافة؟ بلّلها أثناء التقليب طبقة بطبقة.",
        ],
      },
    ],
  },
  en: {
    intro:
      "Compost is organic fertilizer made by microbes breaking down plant and kitchen waste. It improves soil structure, water and nutrient holding, and replaces a large share of chemical fertilizer.",
    sections: [
      {
        title: "Materials you need",
        items: [
          "Brown, carbon-rich matter: straw, dry leaves, sawdust, shredded cardboard, chopped palm fronds.",
          "Green, nitrogen-rich matter: vegetable and fruit scraps, coffee and tea grounds, grass clippings, aged herbivore manure.",
          "Water to moisten the pile and air (turning) to keep it aerobic.",
          "Tools: fork or shovel, compost bin or wire cylinder, optional pile thermometer, a handful of soil or finished compost as a microbial starter.",
        ],
      },
      {
        title: "Never add",
        items: [
          "Meat, bones, fish, dairy and oils — they attract pests and smell.",
          "Dog, cat or human waste — pathogens.",
          "Diseased plants and weeds that have gone to seed.",
          "Glossy printed paper, used charcoal, chemically treated or painted wood.",
        ],
      },
      {
        title: "How to build the pile",
        items: [
          "Choose a shaded spot on bare ground, at least 1x1 m and 1 m high to hold heat.",
          "Start with a 10 cm coarse layer of twigs for drainage and airflow.",
          "Alternate layers: 10 cm brown then 5 cm green, roughly 2-3 browns to 1 green.",
          "Sprinkle a handful of soil or old compost between layers to inoculate microbes.",
          "Wet each layer to the moisture of a wrung-out sponge (50-60%), never waterlogged.",
          "Cover with burlap or perforated plastic to hold heat and moisture.",
          "Turn every 5-7 days for the first two weeks, then every 10-14 days.",
          "Watch temperature: 55-65°C in the active phase kills weed seeds and pathogens.",
        ],
      },
      {
        title: "Maturity and use",
        items: [
          "Ready in 6-10 weeks in summer, 3-4 months in winter.",
          "Dark brown, crumbly, smells like forest soil, and back to ambient temperature.",
          "Sieve it: coarse fraction as surface mulch, fine fraction in seedling mixes.",
          "Rate: 3-5 kg per square metre per year, or 20-30% of a potting mix.",
          "Compost tea: steep a bag of compost in 10 L water for 24-48 h with aeration, then spray or drench.",
        ],
      },
      {
        title: "Troubleshooting",
        items: [
          "Ammonia or rotten smell? Add browns and turn the pile for oxygen.",
          "Cold pile, no breakdown? Add greens and moisture, and make the pile bigger.",
          "Flies and pests? Always bury kitchen scraps under a brown layer.",
          "Too dry? Water layer by layer while turning.",
        ],
      },
    ],
  },
};
