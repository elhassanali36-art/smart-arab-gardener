/**
 * Static educational content for modern growing methods:
 * hydroponics (soil-less) and vertical / column farming.
 * Arabic is the base language; English is the fallback for other languages.
 */

import type { LongGuide } from "./guides";

export const hydroponicsGuide: Record<"ar" | "en", LongGuide> = {
  ar: {
    intro:
      "الزراعة المائية (Hydroponics) هي زراعة النبات بدون تربة، حيث تُغذّى الجذور بمحلول مائي يحتوي كل العناصر الغذائية. توفّر حتى 90% من المياه، وتعطي نمواً أسرع بنسبة 30-50%، وتناسب البيوت والأسطح والبيوت المحمية في المناخ الحار.",
    sections: [
      {
        title: "فوائد الزراعة المائية",
        items: [
          "توفير 80-90% من مياه الري لأن المحلول يعاد تدويره.",
          "نمو أسرع وإنتاج أعلى لأن الجذور تحصل على الغذاء والأكسجين بشكل مباشر.",
          "لا حشائش ولا أمراض تربة (النيماتودا والفيوزاريوم)، ومبيدات أقل بكثير.",
          "إمكانية الزراعة في أي مكان: شرفة، سطح، مستودع، أو بيت محمي.",
          "تحكم كامل ودقيق في التغذية عبر قياس EC و pH.",
          "محصول نظيف جاهز للأكل بدون طين أو تلوث.",
        ],
      },
      {
        title: "أنظمة الزراعة المائية الشائعة",
        items: [
          "نظام الفتيلة (Wick): الأبسط والأرخص للمبتدئين والأعشاب الصغيرة.",
          "نظام الماء الراكد المهوّى (DWC): الجذور في خزان محلول مع مضخة هواء — ممتاز للخس والورقيات.",
          "نظام الغشاء المغذي (NFT): طبقة رقيقة من المحلول تسيل في مواسير مائلة — الأكثر استخداماً تجارياً للورقيات.",
          "نظام الغمر والتصريف (Ebb & Flow): يغمر المهد دورياً ثم يصرّف — مناسب للفلفل والفراولة.",
          "نظام التنقيط على وسط زراعي (بيرلايت/كوكوبيت/صوف صخري): الأفضل للطماطم والخيار والفلفل.",
          "الضباب الهوائي (Aeroponics): رش الجذور بضباب مغذٍّ — أعلى إنتاجية وأعلى تكلفة.",
          "الأكوابونيك (Aquaponics): دمج أحواض الأسماك مع النبات لتغذية عضوية متكاملة.",
        ],
      },
      {
        title: "خطوات إنشاء وحدة مائية منزلية",
        items: [
          "اختر مكاناً يستقبل 6 ساعات شمس أو أضف إضاءة LED نمو (12-16 ساعة يومياً).",
          "جهّز خزاناً معتماً 40-100 لتر لمنع نمو الطحالب، ومضخة ماء صغيرة ومضخة هواء.",
          "ركّب مواسير PVC 4 بوصة أو أحواضاً، واعمل فتحات كل 20 سم لأكواب الشتلات.",
          "أنبت البذور في إسفنج أو صوف صخري أو كوكوبيت حتى يظهر ورقتان حقيقيتان.",
          "حضّر المحلول المغذي: سماد مائي متكامل A+B حسب نشرة المنتج (مثال ورقيات EC 1.2-1.6).",
          "اضبط pH بين 5.5 و 6.5 باستخدام محلول رفع/خفض، وقس بجهاز pH رخيص.",
          "شغّل المضخة 15 دقيقة كل ساعة (أو باستمرار في NFT) وحافظ على حرارة المحلول 18-24°م.",
          "غيّر المحلول كل 10-14 يوماً، واغسل الخزان والمواسير بين الدورات.",
        ],
      },
      {
        title: "أفضل المحاصيل ومشكلات شائعة",
        items: [
          "الأنسب: خس، جرجير، سبانخ، ريحان، نعناع، بقدونس، كرفس، فراولة، طماطم كرزية، فلفل، خيار.",
          "غير مناسب عادة: الجذريات مثل الجزر والبطاطس والنباتات الكبيرة جداً.",
          "اصفرار الأوراق الحديثة = نقص حديد؛ استخدم حديد مخلّب EDDHA واضبط pH.",
          "جذور بنية ولزجة = نقص أكسجين أو حرارة عالية؛ زد التهوية وبرّد المحلول.",
          "طحالب خضراء = ضوء يصل للمحلول؛ اعزل الخزان والفتحات.",
          "ملوحة متزايدة (EC مرتفع) = تبخر؛ أضف ماءً عذباً فقط لتعويض النقص.",
          "احتفظ بمولّد كهرباء أو بطارية احتياطية: توقّف المضخة ساعات في الحرارة يقتل الجذور.",
        ],
      },
    ],
  },
  en: {
    intro:
      "Hydroponics is growing plants without soil: roots are fed a water solution carrying every nutrient. It saves up to 90% of irrigation water, grows crops 30-50% faster, and fits balconies, rooftops and greenhouses in hot climates.",
    sections: [
      {
        title: "Benefits of hydroponics",
        items: [
          "Saves 80-90% of water because the nutrient solution is recirculated.",
          "Faster growth and higher yield: roots get nutrients and oxygen directly.",
          "No weeds and no soil-borne disease (nematodes, fusarium), so far fewer pesticides.",
          "Grow anywhere: balcony, rooftop, warehouse or greenhouse.",
          "Precise nutrition control by measuring EC and pH.",
          "Clean, ready-to-eat produce with no soil contamination.",
        ],
      },
      {
        title: "Common hydroponic systems",
        items: [
          "Wick system: simplest and cheapest, good for herbs and beginners.",
          "Deep Water Culture (DWC): roots in an aerated reservoir — excellent for lettuce and greens.",
          "Nutrient Film Technique (NFT): thin film flowing through sloped channels — the commercial standard for greens.",
          "Ebb & Flow: floods the tray then drains — suits peppers and strawberries.",
          "Drip into media (perlite, coco coir, rockwool): best for tomato, cucumber and pepper.",
          "Aeroponics: roots misted with nutrient fog — highest yield, highest cost.",
          "Aquaponics: fish tanks feed the plants for a closed organic loop.",
        ],
      },
      {
        title: "Building a home hydroponic unit",
        items: [
          "Pick a spot with 6 hours of sun, or add LED grow lights for 12-16 hours a day.",
          "Use an opaque 40-100 L reservoir to stop algae, plus a small water pump and an air pump.",
          "Install 4-inch PVC pipes or trays with net-cup holes every 20 cm.",
          "Germinate seeds in sponge, rockwool or coco until two true leaves appear.",
          "Mix a complete A+B hydroponic nutrient per label (leafy greens around EC 1.2-1.6).",
          "Keep pH between 5.5 and 6.5 with pH up/down and a cheap pH meter.",
          "Run the pump 15 minutes per hour (continuous for NFT) and hold solution temperature at 18-24 C.",
          "Replace the solution every 10-14 days and clean the reservoir between cycles.",
        ],
      },
      {
        title: "Best crops and common problems",
        items: [
          "Best: lettuce, arugula, spinach, basil, mint, parsley, celery, strawberry, cherry tomato, pepper, cucumber.",
          "Usually unsuitable: root crops such as carrot and potato, and very large plants.",
          "Yellow new leaves = iron deficiency; use EDDHA chelated iron and fix pH.",
          "Brown slimy roots = low oxygen or high temperature; increase aeration and cool the solution.",
          "Green algae = light reaching the solution; shade the reservoir and openings.",
          "Rising EC = evaporation; top up with plain water only.",
          "Keep a battery or generator backup: a few hours without the pump kills roots in heat.",
        ],
      },
    ],
  },
};

export const verticalGuide: Record<"ar" | "en", LongGuide> = {
  ar: {
    intro:
      "الزراعة العمودية أو الزراعة في أعمدة تستغل الارتفاع بدل المساحة: أعمدة أو أبراج أو جيوب معلّقة تحمل عشرات النباتات في متر مربع واحد. مثالية للشرفات والأسطح والمساحات الصغيرة في المدن.",
    sections: [
      {
        title: "لماذا الزراعة العمودية؟",
        items: [
          "إنتاج 5-10 أضعاف لكل متر مربع مقارنة بالزراعة الأفقية.",
          "مناسبة تماماً للشرفة الصغيرة أو سطح المنزل أو جدار المطبخ.",
          "ري مركزي من الأعلى ينزل بالجاذبية = مياه وجهد أقل.",
          "حصاد مريح على مستوى النظر بدون انحناء، وأنسب لكبار السن.",
          "تقليل أمراض التربة والرشح، ونظافة أعلى للمحصول.",
          "قيمة جمالية: جدار أخضر يبرّد المكان ويقلل الغبار.",
        ],
      },
      {
        title: "أنواع الأنظمة العمودية",
        items: [
          "عمود من مواسير PVC 6 بوصة بفتحات جانبية معبّأ بالكوكوبيت والبيرلايت.",
          "برج أصص مكدّسة (Stacked pots): الأسهل والأرخص لبدء التجربة.",
          "جيوب قماشية معلّقة على الجدار (Wall pockets) للأعشاب والورقيات.",
          "برج مائي دوّار أو ثابت مع مضخة صغيرة وخزان في القاعدة (Hydro tower).",
          "أرفف متعددة الطوابق مع إضاءة LED للزراعة داخل المنزل.",
          "شبك أو تعريشة رأسية (Trellis) لتربية الخيار والفاصولياء واليقطين عمودياً.",
        ],
      },
      {
        title: "خطوات بناء عمود زراعي",
        items: [
          "اختر ماسورة PVC بطول 1.5-2 م وقطر 6 بوصة، وثبّتها في قاعدة إسمنتية أو حاوية مملوءة رملاً.",
          "افتح فتحات بقطر 6-8 سم على شكل حلزوني كل 25 سم لتوزيع الشمس على كل النباتات.",
          "سخّن حواف الفتحات وشكّلها كجيوب مائلة للأعلى لتثبيت الجذور والوسط الزراعي.",
          "ضع ماسورة ري رقيقة مثقّبة في منتصف العمود لتوزيع الماء من الأعلى للأسفل.",
          "املأ بمزيج خفيف: 50% كوكوبيت + 30% بيرلايت + 20% كمبوست ناضج.",
          "اشتل من الأسفل للأعلى، وضع المحاصيل الأكثر احتياجاً للشمس في الجيوب العلوية.",
          "أضف صرفاً في القاعدة أو خزاناً يجمع الفاقد لإعادة استخدامه.",
          "أدر العمود ربع دورة أسبوعياً (إن كان متحركاً) لتوازن النمو.",
        ],
      },
      {
        title: "الإدارة والمحاصيل المناسبة",
        items: [
          "الأنسب: فراولة، خس، جرجير، سبانخ، نعناع، ريحان، بقدونس، بصل أخضر، فجل، زهور موسمية.",
          "للتعريشة الرأسية: خيار، فاصولياء، بازلاء، لوف، وطماطم غير محدودة النمو.",
          "سمّد أسبوعياً بسماد سائل مخفف لأن حجم الوسط الزراعي صغير ويفقد العناصر سريعاً.",
          "راقب الجيوب السفلية: تبقى أرطب؛ قلّل الري لتجنب تعفّن الجذور.",
          "في الصيف الحار ظلّل الوجه الغربي بشبك 30-50% وارو مرتين يومياً.",
          "افحص البق الدقيقي والمن أسفل الأوراق، وعالج بالصابون البوتاسي أو زيت النيم.",
          "جدّد الوسط الزراعي كل موسمين وأضف كمبوستاً جديداً.",
        ],
      },
    ],
  },
  en: {
    intro:
      "Vertical or column farming uses height instead of ground area: pipes, towers and hanging pockets carry dozens of plants per square metre. Ideal for balconies, rooftops and small urban spaces.",
    sections: [
      {
        title: "Why grow vertically",
        items: [
          "5-10x more production per square metre than flat beds.",
          "Perfect for a small balcony, rooftop or kitchen wall.",
          "One feed point at the top drips down by gravity — less water and less work.",
          "Comfortable harvesting at eye level, friendly for older growers.",
          "Fewer soil diseases and splash, cleaner produce.",
          "A green wall also cools the space and cuts dust.",
        ],
      },
      {
        title: "Types of vertical systems",
        items: [
          "6-inch PVC column with side pockets filled with coco coir and perlite.",
          "Stacked pot tower: the cheapest and easiest way to start.",
          "Fabric wall pockets for herbs and leafy greens.",
          "Hydroponic tower with a small pump and base reservoir.",
          "Multi-tier shelves with LED lights for indoor growing.",
          "Vertical trellis for cucumber, beans and squash.",
        ],
      },
      {
        title: "Building a growing column",
        items: [
          "Take a 1.5-2 m, 6-inch PVC pipe and anchor it in concrete or a sand-filled container.",
          "Cut 6-8 cm holes in a spiral every 25 cm so every plant gets sun.",
          "Heat and shape the hole edges into upward pockets to hold roots and media.",
          "Run a perforated thin irrigation pipe down the centre to feed from top to bottom.",
          "Fill with a light mix: 50% coco coir, 30% perlite, 20% mature compost.",
          "Plant from the bottom up and put the most sun-hungry crops in the top pockets.",
          "Add drainage at the base or a tank to collect and reuse runoff.",
          "Rotate the column a quarter turn weekly (if movable) for even growth.",
        ],
      },
      {
        title: "Management and suitable crops",
        items: [
          "Best: strawberry, lettuce, arugula, spinach, mint, basil, parsley, green onion, radish, seasonal flowers.",
          "For trellises: cucumber, beans, peas, gourds and indeterminate tomato.",
          "Feed weekly with dilute liquid fertilizer — small media volume loses nutrients fast.",
          "Lower pockets stay wetter; water them less to avoid root rot.",
          "In hot summers shade the west face with 30-50% net and water twice a day.",
          "Check for mealybugs and aphids under leaves; treat with potassium soap or neem oil.",
          "Refresh the growing media every two seasons and add fresh compost.",
        ],
      },
    ],
  },
};
