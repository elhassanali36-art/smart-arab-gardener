/** Educational animal knowledge, intentionally separate from farm-inventory records. */
export type LocalText = { ar: string; en: string };
export type AnimalTypeId = "cattle" | "sheep" | "goats" | "camels" | "buffalo" | "horses" | "rabbits" | "poultry" | "quail" | "pigeons" | "turkeys";
export interface AnimalTypeProfile {
 id: AnimalTypeId; name: LocalText; family: "mammals" | "birds";
 products: LocalText; environment: LocalText; feeding: LocalText;
 diseases: { name: LocalText; symptoms: LocalText; prevention: LocalText }[];
}
export interface BreedProfile {
 id: string; animalType: AnimalTypeId; name: LocalText; purpose: LocalText;
 characteristics: LocalText; production: LocalText; adaptation: LocalText;
 feedNeeds: LocalText; suitability: LocalText; management: "medium" | "high";
}
export const animalTypes: AnimalTypeProfile[] = [
  {
    "id": "cattle",
    "name": {
      "ar": "الأبقار",
      "en": "Cattle"
    },
    "family": "mammals",
    "products": {
      "ar": "حليب ولحوم حسب السلالة؛ الجلود منتج ثانوي عند الذبح النظامي.",
      "en": "Milk and meat according to breed; hides from regulated slaughter."
    },
    "environment": {
      "ar": "حظائر جافة جيدة التهوية، ظل ومياه نظيفة باستمرار؛ راقب الإجهاد الحراري خصوصاً للأبقار عالية الإدرار.",
      "en": "Dry ventilated housing, shade and continuous clean water; high-yield dairy cattle are particularly heat-sensitive."
    },
    "feeding": {
      "ar": "العجول: سرسوب مبكر وخطة رضاعة وفطام بإشراف مختص. النمو: أعلاف خشنة جيدة وتدرج في المركزات. البالغات: موازنة الألياف والطاقة والمعادن؛ الحلوب تحتاج خطة مرتبطة بالإنتاج.",
      "en": "Calves need timely colostrum and supervised weaning. Growing cattle need good forage and gradual concentrate changes. Adults need balanced fibre, energy and minerals; dairy diets depend on output."
    },
    "diseases": [
      {
        "name": {
          "ar": "التهاب الضرع",
          "en": "Mastitis"
        },
        "symptoms": {
          "ar": "تغير الحليب أو تورم الضرع؛ الحمى والخمول تستدعي فحصاً عاجلاً.",
          "en": "Abnormal milk or swollen udder; fever and lethargy need prompt assessment."
        },
        "prevention": {
          "ar": "نظافة الحلب والفرشة وفحص الضرع؛ اعزل الحليب غير الطبيعي ولا تبعه.",
          "en": "Clean milking and bedding; separate abnormal milk and do not sell it."
        }
      },
      {
        "name": {
          "ar": "العرج واضطرابات الكرش",
          "en": "Lameness and rumen disorders"
        },
        "symptoms": {
          "ar": "تعثر المشي أو توقف الاجترار أو انتفاخ البطن؛ الانتفاخ الشديد حالة طارئة.",
          "en": "Lameness, absent rumination or bloating; severe bloat is an emergency."
        },
        "prevention": {
          "ar": "رعاية الحوافر وتدرج العليقة؛ لا تغيّر العلف فجأة.",
          "en": "Hoof care and gradual diet changes; never switch feed abruptly."
        }
      }
    ]
  },
  {
    "id": "sheep",
    "name": {
      "ar": "الأغنام",
      "en": "Sheep"
    },
    "family": "mammals",
    "products": {
      "ar": "لحوم وحليب حسب السلالة، وصوف أو شعر وجلود بحسب نوع الغطاء.",
      "en": "Meat and milk by breed; wool, hair and hides depending on coat."
    },
    "environment": {
      "ar": "مأوى جاف مع تهوية دون تيارات مباشرة على المواليد؛ الظل ومياه الشرب ضروريان في الحر، والرطوبة المستمرة تزيد مشاكل الحوافر.",
      "en": "Dry shelter with ventilation but no direct drafts on lambs; shade and water in heat, dry footing in wet conditions."
    },
    "feeding": {
      "ar": "المواليد: سرسوب ورضاعة ومتابعة النمو. الحملان: تدرج من الرضاعة إلى علف نمو وألياف. النعاج: تغذية حسب الحمل والرضاعة؛ استخدم معادن مخصصة للأغنام لتجنب زيادة النحاس.",
      "en": "Lambs need colostrum and monitored growth, then gradual introduction of forage and grower feed. Ewes need pregnancy/lactation diets and sheep-specific minerals to avoid excessive copper."
    },
    "diseases": [
      {
        "name": {
          "ar": "طفيليات الجهاز الهضمي",
          "en": "Gastrointestinal parasites"
        },
        "symptoms": {
          "ar": "هزال أو إسهال أو شحوب؛ الضعف الشديد يستدعي الطبيب.",
          "en": "Weight loss, diarrhoea or pale mucosa; severe weakness needs a vet."
        },
        "prevention": {
          "ar": "إدارة المرعى وفحوص البراز وخطة مكافحة محلية؛ لا تكرر الأدوية عشوائياً.",
          "en": "Pasture management, faecal testing and a local parasite-control plan."
        }
      },
      {
        "name": {
          "ar": "تعفن القدم",
          "en": "Footrot"
        },
        "symptoms": {
          "ar": "عرج ورائحة أو التهاب بين الظلفين.",
          "en": "Lameness, odour or inflammation between claws."
        },
        "prevention": {
          "ar": "فرشة وأرضية جافة وحجر الحيوانات الجديدة؛ اعزل المصاب وافحصه بيطرياً.",
          "en": "Dry footing and quarantine; separate affected animals and seek veterinary assessment."
        }
      }
    ]
  },
  {
    "id": "goats",
    "name": {
      "ar": "الماعز",
      "en": "Goats"
    },
    "family": "mammals",
    "products": {
      "ar": "حليب ولحوم؛ شعر أو كشمير في السلالات المناسبة، وجلود كمنتج ثانوي.",
      "en": "Milk and meat; fibre in suitable breeds and hides as a by-product."
    },
    "environment": {
      "ar": "مأوى جاف مرتفع التصريف وسياج متين؛ تتحمل سلالات محلية الحر أفضل من الحلوب الأوروبية، لكن كل الماعز يحتاج ظلاً ومياهاً.",
      "en": "Dry well-drained shelter and secure fencing; local breeds often cope with heat better than European dairy goats, but all need shade and water."
    },
    "feeding": {
      "ar": "الجديان: سرسوب ورضاعة وفطام متدرج. النمو: تصفح نباتات آمنة وألياف وعلف متوازن. البالغات: موازنة الطاقة والبروتين للحمل والرضاعة وتجنب الأعلاف المتعفنة.",
      "en": "Kids need colostrum and gradual weaning. Growing goats need safe browse, fibre and balanced feed. Adult diets should match pregnancy/lactation; reject mouldy feed."
    },
    "diseases": [
      {
        "name": {
          "ar": "الكوكسيديا والطفيليات",
          "en": "Coccidiosis and parasites"
        },
        "symptoms": {
          "ar": "إسهال وضعف نمو خصوصاً للصغار؛ الجفاف يستدعي تدخلاً سريعاً.",
          "en": "Diarrhoea and poor growth, especially in kids; dehydration requires prompt care."
        },
        "prevention": {
          "ar": "نظافة المشارب وتقليل ازدحام الصغار وفحص البراز.",
          "en": "Clean drinkers, avoid overcrowding and use faecal testing."
        }
      },
      {
        "name": {
          "ar": "التهاب الضرع",
          "en": "Mastitis"
        },
        "symptoms": {
          "ar": "ألم أو تورم الضرع وحليب غير طبيعي.",
          "en": "Painful swollen udder or abnormal milk."
        },
        "prevention": {
          "ar": "نظافة الحلب ومتابعة الضرع؛ استشر الطبيب قبل العلاج أو بيع الحليب.",
          "en": "Milking hygiene and udder checks; consult a vet before treatment or selling milk."
        }
      }
    ]
  },
  {
    "id": "camels",
    "name": {
      "ar": "الإبل",
      "en": "Camels"
    },
    "family": "mammals",
    "products": {
      "ar": "حليب ولحوم ووبر؛ الاستخدام والنظام المحلي يحددان الاستفادة.",
      "en": "Milk, meat and fibre according to local production systems."
    },
    "environment": {
      "ar": "متكيفة مع الجفاف والحر، لكنها لا تستغني عن مياه نظيفة وظل ورعاية؛ تجنب الأرضية الزلقة والعزل الرطب والبرد مع البلل.",
      "en": "Adapted to dry heat but still need clean water, shade and care; avoid slippery floors and wet cold exposure."
    },
    "feeding": {
      "ar": "الحوار: سرسوب ورضاعة ومراقبة الفطام. النمو: رعي آمن وأعلاف خشنة. البالغات: دعم غذائي حسب الرعي والحمل والحليب؛ لا تقدم نباتات مجهولة أو علفاً متعفناً.",
      "en": "Calves need colostrum and monitored weaning. Growing camels need safe grazing and forage. Adults need supplementation suited to pasture, pregnancy and milk output."
    },
    "diseases": [
      {
        "name": {
          "ar": "الجرب",
          "en": "Mange"
        },
        "symptoms": {
          "ar": "حكة وتساقط وبر وقشور جلدية.",
          "en": "Itching, hair loss and crusted skin."
        },
        "prevention": {
          "ar": "حجر الوافد الجديد ونظافة المعدات؛ الطبيب يؤكد السبب ويختار العلاج.",
          "en": "Quarantine new arrivals and clean equipment; a vet must confirm the cause and treatment."
        }
      },
      {
        "name": {
          "ar": "داء المثقبيات",
          "en": "Trypanosomiasis"
        },
        "symptoms": {
          "ar": "هزال وضعف وحمى متقطعة؛ يتطلب فحصاً مخبرياً.",
          "en": "Weight loss, weakness and intermittent fever; laboratory diagnosis is needed."
        },
        "prevention": {
          "ar": "مكافحة النواقل بإرشاد محلي ومتابعة الحالة؛ لا تعالج دون تشخيص.",
          "en": "Local vector control and monitoring; do not medicate without diagnosis."
        }
      }
    ]
  },
  {
    "id": "buffalo",
    "name": {
      "ar": "الجاموس",
      "en": "Water buffalo"
    },
    "family": "mammals",
    "products": {
      "ar": "حليب غني بالدهن ولحوم وجلود؛ ليس كل جاموس مخصصاً لإنتاج الحليب.",
      "en": "Fat-rich milk, meat and hides; not all buffalo types are dairy animals."
    },
    "environment": {
      "ar": "الجاموس حساس للإجهاد الحراري رغم ارتباطه بالمناطق الدافئة؛ يحتاج ظلاً وتهوية وتبريداً نظيفاً مناسباً، مع أرضية غير زلقة وتصريف جيد.",
      "en": "Buffalo are heat-stress sensitive despite warm-region origins; provide shade, ventilation and hygienic cooling with non-slip drained flooring."
    },
    "feeding": {
      "ar": "العجول: سرسوب ورضاعة وفطام منظم. النمو: أعلاف خشنة جيدة مع دعم متوازن. الحلوب: راقب حالة الجسم وموازنة الطاقة والمعادن ولا تعتمد على تحمل العلف الرديء.",
      "en": "Calves need colostrum and planned weaning. Growers need good forage and balanced supplements. Dairy buffalo need body-condition monitoring and balanced energy/minerals."
    },
    "diseases": [
      {
        "name": {
          "ar": "التهاب الضرع",
          "en": "Mastitis"
        },
        "symptoms": {
          "ar": "تورم الضرع أو تغير الحليب أو خمول.",
          "en": "Udder swelling, abnormal milk or lethargy."
        },
        "prevention": {
          "ar": "نظافة الحلب ومياه التبريد والفرشة؛ اعزل الحليب المتغير واطلب فحصاً.",
          "en": "Clean milking, cooling water and bedding; separate abnormal milk and seek assessment."
        }
      },
      {
        "name": {
          "ar": "الطفيليات واضطرابات الحوافر",
          "en": "Parasites and hoof disorders"
        },
        "symptoms": {
          "ar": "هزال أو عرج أو تراجع الشهية.",
          "en": "Weight loss, lameness or reduced appetite."
        },
        "prevention": {
          "ar": "إدارة المرعى والتصريف وفحص الحوافر والطفيليات مع مختص.",
          "en": "Manage pasture and drainage, with professional hoof and parasite checks."
        }
      }
    ]
  },
  {
    "id": "horses",
    "name": {
      "ar": "الخيول",
      "en": "Horses"
    },
    "family": "mammals",
    "products": {
      "ar": "ركوب وعمل ورياضة وتربية؛ ليست مصنفة هنا كحيوانات لإنتاج الغذاء.",
      "en": "Riding, work, sport and breeding; not classified here as food-production animals."
    },
    "environment": {
      "ar": "إسطبل جيد التهوية دون غبار، ظل ومياه ومكان للحركة؛ الخيل العاملة تحتاج راحة وتبريداً آمناً بعد الجهد، والرطوبة والحر يرفعان الإجهاد.",
      "en": "Low-dust ventilated stables, shade, water and turnout; working horses need rest and safe cooling, especially in humid heat."
    },
    "feeding": {
      "ar": "المهر: رضاعة ونمو متوازن بإشراف. النمو: ألياف وعليقة تناسب الهيكل. البالغ: العلف الخشن أساس الغذاء والمركزات حسب الجهد؛ وجبات متدرجة وتجنب العلف المتعفن والتغير المفاجئ.",
      "en": "Foals need monitored milk intake and balanced skeletal growth. Forage is the foundation for adults; concentrates depend on work. Make gradual changes and reject mouldy feed."
    },
    "diseases": [
      {
        "name": {
          "ar": "المغص",
          "en": "Colic"
        },
        "symptoms": {
          "ar": "قلق أو تدحرج أو النظر للبطن أو توقف الروث؛ اتصل بالطبيب فوراً.",
          "en": "Restlessness, rolling, flank-watching or absent manure; call a vet immediately."
        },
        "prevention": {
          "ar": "انتظام العلف والماء والحركة؛ لا تعط أدوية أو تجبر الحصان على الأكل.",
          "en": "Consistent feed, water and exercise; do not give medication or force feeding."
        }
      },
      {
        "name": {
          "ar": "التهاب الحافر",
          "en": "Laminitis"
        },
        "symptoms": {
          "ar": "ألم الحوافر أو صعوبة الحركة؛ يحتاج فحصاً عاجلاً.",
          "en": "Painful feet or reluctance to move; urgent assessment is needed."
        },
        "prevention": {
          "ar": "تجنب السمنة والتغير السريع في المراعي الغنية؛ خطة غذاء وحوافر مع مختص.",
          "en": "Avoid obesity and sudden lush pasture access; professional diet and hoof care."
        }
      }
    ]
  },
  {
    "id": "rabbits",
    "name": {
      "ar": "الأرانب",
      "en": "Rabbits"
    },
    "family": "mammals",
    "products": {
      "ar": "لحوم وجلود؛ الصوف في سلالات الأنجورا فقط.",
      "en": "Meat and pelts; wool only in Angora breeds."
    },
    "environment": {
      "ar": "الأرانب حساسة للحر والرطوبة؛ مأوى مظلل وجاف جيد التهوية دون تيارات مباشرة، أرضية آمنة ونظافة وهدوء، ومياه متاحة باستمرار.",
      "en": "Rabbits are sensitive to heat and humidity; use shaded dry ventilated quiet housing, safe flooring and continuous water."
    },
    "feeding": {
      "ar": "الصغار: رضاعة الأم وفطام متدرج ومتابعة البراز. النمو والبالغون: علف أرانب متوازن غني بالألياف مع دريس مناسب؛ أدخل الخضرة تدريجياً ولا تستبدل العليقة ببقايا الطعام.",
      "en": "Kits need maternal milk and gradual weaning with stool monitoring. Growers and adults need balanced high-fibre rabbit feed and suitable hay; introduce greens slowly."
    },
    "diseases": [
      {
        "name": {
          "ar": "الكوكسيديا",
          "en": "Coccidiosis"
        },
        "symptoms": {
          "ar": "إسهال أو ضعف نمو أو هزال؛ الجفاف حالة عاجلة.",
          "en": "Diarrhoea, poor growth or weight loss; dehydration is urgent."
        },
        "prevention": {
          "ar": "نظافة المشارب والفرشة وفصل الأعمار؛ تشخيص بيطري قبل العلاج.",
          "en": "Clean drinkers and bedding, separate ages and obtain veterinary diagnosis."
        }
      },
      {
        "name": {
          "ar": "ركود الأمعاء والأمراض التنفسية",
          "en": "Gut stasis and respiratory disease"
        },
        "symptoms": {
          "ar": "انقطاع الأكل أو قلة الروث أو إفرازات الأنف؛ فقد الشهية يحتاج تقييماً سريعاً.",
          "en": "Not eating, little manure or nasal discharge; loss of appetite needs prompt evaluation."
        },
        "prevention": {
          "ar": "ألياف وماء وتقليل الغبار والإجهاد؛ لا تستخدم مضادات عشوائية للأرانب.",
          "en": "Fibre, water and reduced dust/stress; do not use arbitrary antibiotics in rabbits."
        }
      }
    ]
  },
  {
    "id": "poultry",
    "name": {
      "ar": "الدواجن",
      "en": "Chickens"
    },
    "family": "birds",
    "products": {
      "ar": "بيض ولحوم حسب السلالة؛ الريش منتج ثانوي يحتاج معالجة صحية.",
      "en": "Eggs and meat by breed; feathers require hygienic processing."
    },
    "environment": {
      "ar": "الصيصان تحتاج حضانة مضبوطة ومراقبة سلوكها؛ الكبار يحتاجون تهوية وفرشة جافة وظلاً، والحر يقلل الأكل ويهدد الإنتاج.",
      "en": "Chicks need controlled brooding guided by behaviour; adults need ventilation, dry litter and shade, since heat depresses intake and production."
    },
    "feeding": {
      "ar": "بادئ للصيصان ثم نامي؛ لاحم أو بياض بحسب الهدف. البياض يحتاج كالسيوم مناسباً بعد بدء الإنتاج، ولا يقدم علف البياض للصيصان؛ مياه نظيفة متاحة دائماً.",
      "en": "Use starter then grower feed, followed by purpose-specific broiler or layer diets. Layers need appropriate calcium during production; do not feed layer diets to chicks."
    },
    "diseases": [
      {
        "name": {
          "ar": "النيوكاسل وأمراض التنفس",
          "en": "Newcastle and respiratory diseases"
        },
        "symptoms": {
          "ar": "صعوبة التنفس أو أعراض عصبية أو نفوق مفاجئ؛ تواصل سريعاً مع البيطري والجهات المحلية عند الاشتباه.",
          "en": "Breathing difficulty, neurological signs or sudden deaths need prompt veterinary/local-authority advice."
        },
        "prevention": {
          "ar": "أمن حيوي وحجر الوافد وبرنامج تحصين محلي؛ لا تنقل الطيور المصابة.",
          "en": "Biosecurity, quarantine and a local vaccination plan; do not move affected birds."
        }
      },
      {
        "name": {
          "ar": "الكوكسيديا",
          "en": "Coccidiosis"
        },
        "symptoms": {
          "ar": "إسهال أو ضعف أو دم في البراز.",
          "en": "Diarrhoea, weakness or bloody droppings."
        },
        "prevention": {
          "ar": "فرشة جافة وكثافة ملائمة؛ اعزل المصاب واطلب التشخيص.",
          "en": "Dry litter and suitable stocking; separate affected birds and seek diagnosis."
        }
      }
    ]
  },
  {
    "id": "quail",
    "name": {
      "ar": "السمان",
      "en": "Quail"
    },
    "family": "birds",
    "products": {
      "ar": "بيض ولحوم في السمان الياباني؛ الأنواع ليست متطابقة في التربية.",
      "en": "Eggs and meat in Japanese quail; management differs between species."
    },
    "environment": {
      "ar": "حضانة آمنة للصغار ومأوى يمنع الهروب والإصابات الرأسية، تهوية بلا تيارات وفرشة جافة؛ الحر والازدحام والضوضاء يسببون الإجهاد.",
      "en": "Safe brooding and escape-proof housing that prevents head injuries; ventilation without drafts and dry litter; heat, crowding and noise cause stress."
    },
    "feeding": {
      "ar": "الصغار: بادئ مخصص للسمان أو طيور الصيد مع حجم حبيبات مناسب. النمو: عليقة متوازنة. البياض: علف إنتاج مناسب ومياه نظيفة؛ لا تفترض أن علف الدجاج يفي بكل الاحتياجات.",
      "en": "Use suitable quail/game-bird starter of appropriate particle size, then balanced grower and layer feeds; chicken feed may not meet all needs."
    },
    "diseases": [
      {
        "name": {
          "ar": "التهاب الأمعاء والكوكسيديا",
          "en": "Enteritis and coccidiosis"
        },
        "symptoms": {
          "ar": "إسهال وخمول وضعف نمو أو نفوق.",
          "en": "Diarrhoea, lethargy, poor growth or mortality."
        },
        "prevention": {
          "ar": "نظافة وإدارة الرطوبة وفصل الأعمار؛ استشر المختص لتأكيد السبب.",
          "en": "Hygiene, moisture control and age separation; seek professional diagnosis."
        }
      },
      {
        "name": {
          "ar": "الإصابات والإجهاد",
          "en": "Injury and stress"
        },
        "symptoms": {
          "ar": "نقر أو جروح أو تراجع البيض.",
          "en": "Pecking, wounds or falling egg output."
        },
        "prevention": {
          "ar": "كثافة ومجموعات ملائمة ومأوى آمن؛ النزف والإصابة الشديدة تتطلب رعاية.",
          "en": "Suitable group size and safe housing; bleeding or severe injury needs care."
        }
      }
    ]
  },
  {
    "id": "pigeons",
    "name": {
      "ar": "الحمام",
      "en": "Pigeons"
    },
    "family": "birds",
    "products": {
      "ar": "لحم الزغاليل في سلالات الإنتاج؛ رياضة وتربية في سلالات أخرى.",
      "en": "Squab meat in production breeds; sport and breeding in others."
    },
    "environment": {
      "ar": "مسكن جاف مرتفع جيد التهوية وأعشاش نظيفة ومساحة طيران أو حركة؛ تجنب الرطوبة والغبار والازدحام ومخالطة الطيور البرية.",
      "en": "Dry elevated ventilated lofts with clean nests and flight/exercise space; avoid moisture, dust, crowding and wild-bird contact."
    },
    "feeding": {
      "ar": "الزغاليل تعتمد على الأبوين أولاً. بعد الفطام: خلطة أو علف حمام متوازن وحبوب سليمة ومصدر معادن مناسب؛ الأزواج المنتجة تحتاج متابعة الحالة والماء المستمر.",
      "en": "Squabs initially rely on parents. After weaning use balanced pigeon feed or sound grains plus suitable minerals; monitor breeding pairs and water."
    },
    "diseases": [
      {
        "name": {
          "ar": "داء المشعرات",
          "en": "Trichomoniasis"
        },
        "symptoms": {
          "ar": "صعوبة البلع أو لويحات بالفم أو ضعف الزغاليل.",
          "en": "Swallowing difficulty, mouth plaques or weak squabs."
        },
        "prevention": {
          "ar": "نظافة المشارب وحجر الوافد؛ التشخيص مهم ولا تنزع اللويحات بالقوة.",
          "en": "Clean drinkers and quarantine; get a diagnosis and never forcibly remove plaques."
        }
      },
      {
        "name": {
          "ar": "السالمونيلا وأمراض التنفس",
          "en": "Salmonellosis and respiratory disease"
        },
        "symptoms": {
          "ar": "إسهال أو تورم مفصل أو تنفس غير طبيعي.",
          "en": "Diarrhoea, swollen joints or abnormal breathing."
        },
        "prevention": {
          "ar": "أمن حيوي وغذاء نظيف؛ اعزل الطيور واطلب فحصاً بيطرياً.",
          "en": "Biosecurity and clean feed; isolate birds and request veterinary assessment."
        }
      }
    ]
  },
  {
    "id": "turkeys",
    "name": {
      "ar": "الديك الرومي",
      "en": "Turkeys"
    },
    "family": "birds",
    "products": {
      "ar": "لحوم؛ بيض للتفريخ في قطعان التربية.",
      "en": "Meat; hatching eggs in breeding flocks."
    },
    "environment": {
      "ar": "الصغار يحتاجون حضانة دقيقة ومشارب آمنة؛ الكبار يحتاجون مساحة وحركة وفرشة جافة وتهوية، ولا يخلطون بالدجاج لتقليل مخاطر انتقال الأمراض.",
      "en": "Poults need careful brooding and safe drinkers; adults need space, dry litter and ventilation; separate from chickens to reduce disease risks."
    },
    "feeding": {
      "ar": "بادئ رومي ثم نامي ثم ناهي حسب العمر والهدف؛ الاحتياجات تختلف عن الدجاج. الأمهات تحتاج عليقة تربية متخصصة؛ ماء نظيف دون انقطاع.",
      "en": "Use turkey starter, grower and finisher feeds appropriate to age; requirements differ from chickens. Breeders need a specialised diet and continuous water."
    },
    "diseases": [
      {
        "name": {
          "ar": "مرض الرأس الأسود",
          "en": "Histomoniasis (blackhead)"
        },
        "symptoms": {
          "ar": "خمول وإسهال وهزال أو نفوق؛ يتطلب تشخيصاً عاجلاً.",
          "en": "Lethargy, diarrhoea, wasting or deaths require urgent diagnosis."
        },
        "prevention": {
          "ar": "فصل الرومي عن الدجاج وإدارة الطفيليات والفرشة بخطة محلية.",
          "en": "Separate turkeys from chickens and manage parasites/litter with local advice."
        }
      },
      {
        "name": {
          "ar": "أمراض التنفس ومشاكل الأرجل",
          "en": "Respiratory and leg problems"
        },
        "symptoms": {
          "ar": "صعوبة تنفس أو عرج وضعف الحركة.",
          "en": "Breathing difficulty, lameness or poor mobility."
        },
        "prevention": {
          "ar": "تهوية ومساحة وتغذية مناسبة للنمو؛ اطلب فحصاً عند استمرار الأعراض.",
          "en": "Ventilation, space and growth-appropriate nutrition; persistent signs need assessment."
        }
      }
    ]
  }
];
export const animalBreeds: BreedProfile[] = [
  {
    "id": "holstein",
    "animalType": "cattle",
    "name": {
      "ar": "هولشتاين فريزيان",
      "en": "Holstein Friesian"
    },
    "purpose": {
      "ar": "ألبان",
      "en": "Dairy"
    },
    "characteristics": {
      "ar": "كبيرة البنية، غالباً سوداء وبيضاء؛ انتخاب قوي لإنتاج الحليب.",
      "en": "Large, commonly black-and-white; strongly selected for milk."
    },
    "production": {
      "ar": "إمكان حليب مرتفع مع إدارة دقيقة؛ كمية الحليب ليست مضمونة.",
      "en": "High milk potential under precise management, not a guaranteed yield."
    },
    "adaptation": {
      "ar": "أشد حساسية للحر؛ يلزم تبريد وتهوية في المناخ الحار الرطب.",
      "en": "Heat-sensitive; cooling and ventilation are essential in hot humid climates."
    },
    "feedNeeds": {
      "ar": "حاجة مرتفعة لعلف عالي الجودة وموازنة دقيقة للحلوب.",
      "en": "High-quality feed and precise dairy balancing."
    },
    "suitability": {
      "ar": "مناسبة لهدف الألبان مع ماء وعلف وتبريد وخبرة يومية، وليست خياراً قليل المدخلات.",
      "en": "Fits dairy farms with water, feed, cooling and daily expertise, not low-input systems."
    },
    "management": "high"
  },
  {
    "id": "jersey",
    "animalType": "cattle",
    "name": {
      "ar": "جيرسي",
      "en": "Jersey"
    },
    "purpose": {
      "ar": "ألبان",
      "en": "Dairy"
    },
    "characteristics": {
      "ar": "أصغر من كثير من سلالات الألبان، لونها بني بدرجاته.",
      "en": "Smaller dairy cattle with a brown coat."
    },
    "production": {
      "ar": "حليب معروف بغناه بالدهن والبروتين؛ الإنتاج مرتبط بالعليقة والرعاية.",
      "en": "Known for milk solids; output depends on diet and care."
    },
    "adaptation": {
      "ar": "قد تتكيف مع الحر أفضل نسبياً من الهولشتاين، لكنها تحتاج ظل وتبريد أيضاً.",
      "en": "May cope with heat relatively better than Holstein, but still needs shade and cooling."
    },
    "feedNeeds": {
      "ar": "موازنة غذاء حسب وزنها وإنتاجها، ومتابعة المعادن حول الولادة.",
      "en": "Balance feed to size and output; monitor minerals around calving."
    },
    "suitability": {
      "ar": "خيار لألبان غنية بالمكونات ومساحة أقل نسبياً، مع سوق يقدّر جودة الحليب.",
      "en": "Useful for milk solids and relatively smaller farms with a suitable market."
    },
    "management": "medium"
  },
  {
    "id": "brown-swiss",
    "animalType": "cattle",
    "name": {
      "ar": "براون سويس",
      "en": "Brown Swiss"
    },
    "purpose": {
      "ar": "ألبان",
      "en": "Dairy"
    },
    "characteristics": {
      "ar": "بنية قوية وغطاء بني إلى رمادي، وطباع غالباً هادئة مع التعامل الجيد.",
      "en": "Sturdy brown-to-grey cattle, often calm with good handling."
    },
    "production": {
      "ar": "إنتاج ألبان مع مكونات ملائمة للتصنيع؛ النمو متوسط إلى كبير البنية.",
      "en": "Dairy output with useful processing solids; develops a substantial frame."
    },
    "adaptation": {
      "ar": "تاريخها جبلي؛ مرونة بيئية نسبية لا تلغي التبريد في الحر.",
      "en": "Mountain origins and relative adaptability do not remove heat-cooling needs."
    },
    "feedNeeds": {
      "ar": "أعلاف خشنة جيدة وموازنة الحلوب ومتابعة حالة الجسم.",
      "en": "Good forage, dairy balancing and body-condition checks."
    },
    "suitability": {
      "ar": "مناسبة لألبان وتصنيع مع إدارة متوسطة إلى مرتفعة وعلف ثابت.",
      "en": "Fits dairy/processing goals with reliable feed and moderate-to-high management."
    },
    "management": "medium"
  },
  {
    "id": "simmental",
    "animalType": "cattle",
    "name": {
      "ar": "سمنتال",
      "en": "Simmental"
    },
    "purpose": {
      "ar": "ألبان ولحوم",
      "en": "Dual purpose"
    },
    "characteristics": {
      "ar": "كبيرة، غالباً مرقطة حمراء وبيضاء؛ توجد خطوط لحم وأخرى ثنائية الغرض.",
      "en": "Large, often red-and-white; includes beef and dual-purpose lines."
    },
    "production": {
      "ar": "نمو وكتلة عضلية جيدان؛ مستوى الحليب يتوقف على الخط الوراثي.",
      "en": "Good growth and muscularity; milk depends on genetic line."
    },
    "adaptation": {
      "ar": "يفضل تكييفها تدريجياً للحر مع ظل؛ البيئة المعتدلة أسهل للإدارة.",
      "en": "Moderate climates are easier; gradual heat adaptation and shade are needed."
    },
    "feedNeeds": {
      "ar": "تحتاج علفاً كافياً للبنية الكبيرة والهدف المختار.",
      "en": "Needs enough feed for its large frame and chosen purpose."
    },
    "suitability": {
      "ar": "تلائم هدفاً مزدوجاً إذا توفرت مساحة وعلف وسوق للحليب واللحم.",
      "en": "Fits dual goals where space, feed and both markets exist."
    },
    "management": "medium"
  },
  {
    "id": "angus",
    "animalType": "cattle",
    "name": {
      "ar": "أنجس",
      "en": "Angus"
    },
    "purpose": {
      "ar": "لحوم",
      "en": "Beef"
    },
    "characteristics": {
      "ar": "بلا قرون طبيعياً غالباً، أسود أو أحمر، وبنية عضلية.",
      "en": "Usually naturally polled, black or red, with muscular build."
    },
    "production": {
      "ar": "انتخاب لجودة اللحم؛ سرعة النمو ترتبط بالمرعى والعلف.",
      "en": "Selected for beef quality; growth depends on pasture and feed."
    },
    "adaptation": {
      "ar": "الخطوط البريطانية أصلها معتدل؛ راقب الحر خصوصاً الغطاء الداكن.",
      "en": "British origins suit temperate settings; watch heat in dark-coated cattle."
    },
    "feedNeeds": {
      "ar": "مرعى جيد وألياف وتدرج في علف التسمين دون إفراط.",
      "en": "Good pasture, fibre and gradual finishing diets."
    },
    "suitability": {
      "ar": "مناسبة لقطيع لحم مع إدارة مرعى وسوق واضح؛ تحقق من التأقلم محلياً.",
      "en": "Fits beef herds with managed pasture and a market; check local adaptation."
    },
    "management": "medium"
  },
  {
    "id": "hereford",
    "animalType": "cattle",
    "name": {
      "ar": "هيرفورد",
      "en": "Hereford"
    },
    "purpose": {
      "ar": "لحوم",
      "en": "Beef"
    },
    "characteristics": {
      "ar": "غطاء أحمر ووجه أبيض؛ توجد خطوط بقرون وأخرى عديمة القرون.",
      "en": "Red coat and white face; horned and polled lines exist."
    },
    "production": {
      "ar": "قطيع لحم مناسب للرعي؛ الأداء مرتبط بجودة المرعى.",
      "en": "Pasture-oriented beef cattle; results depend on pasture quality."
    },
    "adaptation": {
      "ar": "المرعى المعتدل ملائم؛ راقب الجلد والعينين المعرضين للشمس.",
      "en": "Temperate pasture is suitable; monitor sun-exposed skin and eyes."
    },
    "feedNeeds": {
      "ar": "علف خشن ومرعى مع مكملات وفق حالة الجسم.",
      "en": "Forage/pasture with supplements based on body condition."
    },
    "suitability": {
      "ar": "خيار لحم للمزارع ذات المرعى؛ يلزم ظل وفحص عين وحوافر.",
      "en": "A beef option for pasture farms, with shade and eye/hoof checks."
    },
    "management": "medium"
  },
  {
    "id": "charolais",
    "animalType": "cattle",
    "name": {
      "ar": "شاروليه",
      "en": "Charolais"
    },
    "purpose": {
      "ar": "لحوم",
      "en": "Beef"
    },
    "characteristics": {
      "ar": "كبيرة فاتحة اللون وذات عضلات واضحة.",
      "en": "Large light-coloured muscular cattle."
    },
    "production": {
      "ar": "نمو عضلي قوي؛ إدارة الولادة واختيار الأب مهمان.",
      "en": "Strong muscular growth; calving management and sire selection matter."
    },
    "adaptation": {
      "ar": "ظل وتهوية في الحر وحماية من البلل والبرد للصغار.",
      "en": "Shade/ventilation in heat and protection from wet cold for calves."
    },
    "feedNeeds": {
      "ar": "احتياج كافٍ للطاقة والبروتين للنمو الكبير، بتدرج آمن.",
      "en": "Adequate balanced energy/protein for large growth, introduced gradually."
    },
    "suitability": {
      "ar": "تناسب إنتاج اللحم مع علف وفير وخبرة في الولادة، لا نظاماً شحيح المدخلات.",
      "en": "Fits beef production with ample feed and calving expertise, not sparse-input farms."
    },
    "management": "high"
  },
  {
    "id": "limousin",
    "animalType": "cattle",
    "name": {
      "ar": "ليموزين",
      "en": "Limousin"
    },
    "purpose": {
      "ar": "لحوم",
      "en": "Beef"
    },
    "characteristics": {
      "ar": "بنية عضلية ولون ذهبي محمر غالباً.",
      "en": "Muscular build, commonly golden-red."
    },
    "production": {
      "ar": "انتخاب للحم ونمو عضلي؛ يختلف الأداء بين الخطوط.",
      "en": "Selected for beef and muscular growth; lines vary."
    },
    "adaptation": {
      "ar": "تحتاج تأقلماً وظلاً في المناطق الحارة؛ تجنب الإجهاد أثناء النقل.",
      "en": "Needs acclimation and shade in heat; avoid transport stress."
    },
    "feedNeeds": {
      "ar": "علف خشن جيد وخطة نمو/تسمين ملائمة لحالة الجسم.",
      "en": "Good forage and a growth/finishing plan matched to condition."
    },
    "suitability": {
      "ar": "تلائم هدف اللحم مع تعامل آمن وسياج مناسب وتغذية منتظمة.",
      "en": "Fits beef goals with safe handling, sound fencing and reliable feed."
    },
    "management": "medium"
  },
  {
    "id": "najdi",
    "animalType": "sheep",
    "name": {
      "ar": "نجدي",
      "en": "Najdi"
    },
    "purpose": {
      "ar": "لحوم",
      "en": "Meat"
    },
    "characteristics": {
      "ar": "طويلة البنية سوداء غالباً مع رأس أبيض وشعر طويل.",
      "en": "Tall, usually black with a white head and long hair."
    },
    "production": {
      "ar": "تربية لحم وأمهات؛ النمو بحسب الخط والتغذية.",
      "en": "Meat and breeding flock; growth depends on line and feed."
    },
    "adaptation": {
      "ar": "متكيفة مع بيئات الجزيرة الجافة؛ تحتاج ظل وتصريفاً في الرطوبة.",
      "en": "Adapted to dry Arabian environments; needs shade and drainage in humidity."
    },
    "feedNeeds": {
      "ar": "راعِ احتياجات النعاج والرضاعة وأليافاً كافية.",
      "en": "Meet ewe/lactation needs with adequate fibre."
    },
    "suitability": {
      "ar": "تلائم بيئة جافة وسوقاً محلياً للنجدي مع علف وماء ثابتين.",
      "en": "Fits dry settings and a local Najdi market with reliable feed/water."
    },
    "management": "medium"
  },
  {
    "id": "awassi",
    "animalType": "sheep",
    "name": {
      "ar": "عواسي / نعيمي",
      "en": "Awassi"
    },
    "purpose": {
      "ar": "ألبان ولحوم",
      "en": "Dual purpose"
    },
    "characteristics": {
      "ar": "ذيل دهني ورأس بني غالباً وصوف فاتح.",
      "en": "Fat-tailed, often brown-headed with light wool."
    },
    "production": {
      "ar": "خطوط حليب ولحم؛ لا تعمم أداء الخط المحسن على كل القطيع.",
      "en": "Dairy and meat lines; improved-line output does not apply to every flock."
    },
    "adaptation": {
      "ar": "تأقلم معروف مع الجفاف، لكن الحلوب تحتاج دعماً أثناء الحر.",
      "en": "Known dry-region adaptation; dairy ewes still need heat support."
    },
    "feedNeeds": {
      "ar": "موازنة الحمل والرضاعة ومرعى آمن وأعلاف خشنة.",
      "en": "Balance pregnancy/lactation with safe pasture and forage."
    },
    "suitability": {
      "ar": "خيار مزدوج حيث يوجد سوق للحليب وعلف كافٍ ومتابعة حلب.",
      "en": "Dual option with a milk market, sufficient feed and milking care."
    },
    "management": "medium"
  },
  {
    "id": "dorper",
    "animalType": "sheep",
    "name": {
      "ar": "دوربر",
      "en": "Dorper"
    },
    "purpose": {
      "ar": "لحوم",
      "en": "Meat"
    },
    "characteristics": {
      "ar": "بنية لحمية، رأس أسود أو أبيض وغطاء شعر/صوف قصير.",
      "en": "Meaty build, black or white head and short hair/wool coat."
    },
    "production": {
      "ar": "انتخاب للحم؛ التكيف والنمو مرتبطان بالمرعى.",
      "en": "Selected for meat; adaptation and growth depend on grazing."
    },
    "adaptation": {
      "ar": "متكيفة نسبياً مع مناطق جافة؛ الرطوبة والطفيليات تحتاج متابعة.",
      "en": "Relatively adapted to dry regions; wet-climate parasites need attention."
    },
    "feedNeeds": {
      "ar": "مرعى متوازن ومكملات عند نقص العلف، مع معادن الأغنام.",
      "en": "Balanced pasture, supplements when needed and sheep minerals."
    },
    "suitability": {
      "ar": "تلائم هدف اللحم مع إدارة مرعى وطفيليات جيدة.",
      "en": "Fits meat goals with pasture and parasite management."
    },
    "management": "medium"
  },
  {
    "id": "shami",
    "animalType": "goats",
    "name": {
      "ar": "شامي / دمشقي",
      "en": "Damascus goat"
    },
    "purpose": {
      "ar": "ألبان ولحوم",
      "en": "Dual purpose"
    },
    "characteristics": {
      "ar": "كبيرة بأذنين طويلتين وملامح رأس مميزة.",
      "en": "Large, long-eared with distinctive head shape."
    },
    "production": {
      "ar": "ألبان وتربية؛ الأداء يعتمد على الانتخاب وإدارة الرضاعة.",
      "en": "Dairy and breeding; output depends on selection and lactation care."
    },
    "adaptation": {
      "ar": "تتأقلم مع بيئة شرق المتوسط؛ تحتاج حماية في الحر الرطب.",
      "en": "Adapted to eastern Mediterranean settings; protect from humid heat."
    },
    "feedNeeds": {
      "ar": "علف جيد للحلوب وفحص حالة الجسم والمعادن.",
      "en": "Good dairy feed and condition/mineral monitoring."
    },
    "suitability": {
      "ar": "مناسبة للحليب والتربية مع خبرة حلب وتوفر علف.",
      "en": "Fits milk and breeding with milking experience and feed availability."
    },
    "management": "medium"
  },
  {
    "id": "saanen",
    "animalType": "goats",
    "name": {
      "ar": "سانين",
      "en": "Saanen"
    },
    "purpose": {
      "ar": "ألبان",
      "en": "Dairy"
    },
    "characteristics": {
      "ar": "بيضاء غالباً، كبيرة نسبياً ومنتخبة للألبان.",
      "en": "Usually white, relatively large and dairy-selected."
    },
    "production": {
      "ar": "حليب جيد بالإدارة المناسبة، دون ضمان أرقام.",
      "en": "Good milk potential under suitable care, without guaranteed figures."
    },
    "adaptation": {
      "ar": "يفضل مناخاً معتدلاً؛ حساس للشمس والحر ويحتاج ظل وتبريد.",
      "en": "Prefers moderate climates; sensitive to sun/heat, requiring shade and cooling."
    },
    "feedNeeds": {
      "ar": "عليقة ألبان متوازنة وألياف ومياه كافية.",
      "en": "Balanced dairy diet, fibre and ample water."
    },
    "suitability": {
      "ar": "خيار للألبان المكثفة مع بيئة مضبوطة؛ ليس الأفضل للحر بلا تبريد.",
      "en": "Fits managed dairy environments, not uncooled hot conditions."
    },
    "management": "high"
  },
  {
    "id": "boer",
    "animalType": "goats",
    "name": {
      "ar": "بور",
      "en": "Boer"
    },
    "purpose": {
      "ar": "لحوم",
      "en": "Meat"
    },
    "characteristics": {
      "ar": "بيضاء بجسم ممتلئ ورأس بني غالباً.",
      "en": "Stocky white body with a commonly brown head."
    },
    "production": {
      "ar": "سلالة لحم عضلية؛ زيادة الوزن مرتبطة بالعليقة والصحة.",
      "en": "Muscular meat breed; gain depends on nutrition and health."
    },
    "adaptation": {
      "ar": "تتحمل بيئات دافئة نسبياً؛ الرطوبة والطفيليات قد تحد الإنتاج.",
      "en": "Relatively suited to warmth; humidity and parasites may limit performance."
    },
    "feedNeeds": {
      "ar": "علف نمو متوازن ومرعى آمن وتجنب التسمين المفرط.",
      "en": "Balanced grower feed and safe browse; avoid over-fattening."
    },
    "suitability": {
      "ar": "مناسبة لهدف اللحم مع سوق وإدارة طفيليات وتغذية.",
      "en": "Fits meat goals with a market, parasite management and nutrition."
    },
    "management": "medium"
  },
  {
    "id": "majaheem",
    "animalType": "camels",
    "name": {
      "ar": "مجاهيم",
      "en": "Majaheem"
    },
    "purpose": {
      "ar": "ألبان ولحوم",
      "en": "Dual purpose"
    },
    "characteristics": {
      "ar": "إبل عربية داكنة كبيرة البنية غالباً.",
      "en": "Usually large dark Arabian dromedaries."
    },
    "production": {
      "ar": "تستخدم للألبان والتربية؛ الإنتاج يختلف بين القطعان.",
      "en": "Used for milk and breeding; output varies among herds."
    },
    "adaptation": {
      "ar": "بيئة جافة ملائمة؛ راقب الحر مع اللون الداكن ولا تحجب الماء.",
      "en": "Dry settings suit them; monitor heat in dark coats and never withhold water."
    },
    "feedNeeds": {
      "ar": "رعي وألياف مع دعم للحلوب حسب الحالة.",
      "en": "Grazing and fibre with condition-based dairy support."
    },
    "suitability": {
      "ar": "مناسبة لبيئة جافة ومساحة ورعاية متخصصة بالإبل.",
      "en": "Fits dry environments with space and camel-specific expertise."
    },
    "management": "medium"
  },
  {
    "id": "wadha",
    "animalType": "camels",
    "name": {
      "ar": "وضح",
      "en": "Wadha"
    },
    "purpose": {
      "ar": "ألبان ولحوم",
      "en": "Dual purpose"
    },
    "characteristics": {
      "ar": "إبل عربية فاتحة اللون؛ تصنيف محلي لا يضمن إنتاجاً ثابتاً.",
      "en": "Light-coloured Arabian dromedaries; a local type, not a fixed-output guarantee."
    },
    "production": {
      "ar": "حليب ولحم وتربية بحسب القطيع والهدف.",
      "en": "Milk, meat and breeding according to herd and goal."
    },
    "adaptation": {
      "ar": "تحتاج ظلاً وحماية من البرد الرطب رغم تأقلمها الصحراوي.",
      "en": "Needs shade and wet-cold protection despite desert adaptation."
    },
    "feedNeeds": {
      "ar": "رعي آمن وعلف خشن وموازنة للحمل والرضاعة.",
      "en": "Safe grazing, forage and pregnancy/lactation balancing."
    },
    "suitability": {
      "ar": "خيار محلي إذا توفرت مساحة وماء وخبرة مع الإبل.",
      "en": "A local option with space, water and camel-handling expertise."
    },
    "management": "medium"
  },
  {
    "id": "murrah",
    "animalType": "buffalo",
    "name": {
      "ar": "مورا",
      "en": "Murrah"
    },
    "purpose": {
      "ar": "ألبان",
      "en": "Dairy"
    },
    "characteristics": {
      "ar": "جاموس نهري داكن وقرون ملتفة قصيرة غالباً.",
      "en": "Dark river buffalo, often with short curled horns."
    },
    "production": {
      "ar": "معروف بانتخاب الألبان والحليب الغني بالدهن.",
      "en": "Known for dairy selection and fat-rich milk."
    },
    "adaptation": {
      "ar": "تبريد نظيف وظل ضروريان؛ لا يكفي المناخ الدافئ وحده.",
      "en": "Hygienic cooling and shade are essential, not warmth alone."
    },
    "feedNeeds": {
      "ar": "أعلاف خشنة جيدة وعليقة للحلوب حسب الإنتاج.",
      "en": "Good forage and output-matched dairy diets."
    },
    "suitability": {
      "ar": "مناسب للألبان مع ماء وتبريد وحلب منتظم وسوق للحليب.",
      "en": "Fits dairy with water, cooling, regular milking and a market."
    },
    "management": "high"
  },
  {
    "id": "mediterranean",
    "animalType": "buffalo",
    "name": {
      "ar": "جاموس البحر المتوسط",
      "en": "Mediterranean buffalo"
    },
    "purpose": {
      "ar": "ألبان",
      "en": "Dairy"
    },
    "characteristics": {
      "ar": "جاموس نهري قوي البنية داكن اللون.",
      "en": "Strong dark river buffalo."
    },
    "production": {
      "ar": "منتخب للحليب والتصنيع؛ تختلف الخطوط المحلية.",
      "en": "Selected for milk/processing; local lines differ."
    },
    "adaptation": {
      "ar": "يلزم ضبط الحر والرطوبة وفرشة جافة حتى في المناطق المعتدلة.",
      "en": "Manage heat/humidity and dry bedding even in temperate regions."
    },
    "feedNeeds": {
      "ar": "موازنة طاقة ومعادن الحلوب ومتابعة حالة الجسم.",
      "en": "Balance dairy energy/minerals and monitor condition."
    },
    "suitability": {
      "ar": "يلائم إنتاج الألبان والتصنيع مع إدارة متقدمة ومورد علف.",
      "en": "Fits dairy/processing with skilled care and reliable feed."
    },
    "management": "high"
  },
  {
    "id": "arabian",
    "animalType": "horses",
    "name": {
      "ar": "عربي أصيل",
      "en": "Arabian horse"
    },
    "purpose": {
      "ar": "ركوب وتحمل وتربية",
      "en": "Riding, endurance and breeding"
    },
    "characteristics": {
      "ar": "رأس مميز وبنية خفيفة نسبياً ونشاط واستجابة للتعامل.",
      "en": "Distinctive head and relatively light, responsive athletic build."
    },
    "production": {
      "ar": "تحمل ورياضية؛ التدريب والصحة يحددان الأداء.",
      "en": "Endurance and athletic use; training and health determine performance."
    },
    "adaptation": {
      "ar": "تاريخ تأقلم مع الجفاف؛ الجهد في الحر يحتاج ماء وراحة وتبريداً.",
      "en": "Dry-region origins; work in heat still requires water, rest and cooling."
    },
    "feedNeeds": {
      "ar": "علف خشن أساس الغذاء ومركزات وفق الجهد، لا وفق الشكل فقط.",
      "en": "Forage foundation and concentrates matched to work, not appearance."
    },
    "suitability": {
      "ar": "مناسب لركوب وتحمل مع تدريب وتعامل خبير ومساحة حركة.",
      "en": "Fits riding/endurance with skilled training and turnout space."
    },
    "management": "high"
  },
  {
    "id": "thoroughbred",
    "animalType": "horses",
    "name": {
      "ar": "ثوروبريد / إنجليزي أصيل",
      "en": "Thoroughbred"
    },
    "purpose": {
      "ar": "رياضة وركوب",
      "en": "Sport and riding"
    },
    "characteristics": {
      "ar": "طويل ورشيق ومنتخب للأداء الرياضي.",
      "en": "Tall, lean and selected for athletic performance."
    },
    "production": {
      "ar": "سرعة ورياضة؛ ليس إنتاجاً غذائياً.",
      "en": "Speed and sport, not food output."
    },
    "adaptation": {
      "ar": "يحتاج إدارة إجهاد وتبريد وفرشة آمنة؛ تجنب الحر وقت التدريب.",
      "en": "Needs stress management, cooling and safe bedding; avoid training in heat."
    },
    "feedNeeds": {
      "ar": "خطة حسب الجهد وحالة الجسم مع ألياف كافية.",
      "en": "Work/condition-matched diet with adequate fibre."
    },
    "suitability": {
      "ar": "يلائم إدارة رياضية خبيرة ورعاية حوافر وبيطرة منتظمة.",
      "en": "Fits skilled sport management with regular hoof/veterinary care."
    },
    "management": "high"
  },
  {
    "id": "new-zealand",
    "animalType": "rabbits",
    "name": {
      "ar": "نيوزيلندي أبيض",
      "en": "New Zealand White"
    },
    "purpose": {
      "ar": "لحوم",
      "en": "Meat"
    },
    "characteristics": {
      "ar": "أبيض متوسط إلى كبير البنية؛ خط إنتاج وليس ضمان وزن.",
      "en": "White, medium-to-large meat type, not a guaranteed weight."
    },
    "production": {
      "ar": "منتخب للنمو وإنتاج اللحم؛ الأداء يتأثر بحرارة المسكن.",
      "en": "Selected for growth/meat; housing heat affects results."
    },
    "adaptation": {
      "ar": "الحر والرطوبة خطران؛ يحتاج تهوية وتظليلاً وتبريداً آمناً.",
      "en": "Heat/humidity are risks; needs ventilation, shade and safe cooling."
    },
    "feedNeeds": {
      "ar": "علف أرانب غني بالألياف وتدرج عند الفطام.",
      "en": "High-fibre rabbit feed and gradual weaning."
    },
    "suitability": {
      "ar": "خيار لحم مع مسكن بارد نسبياً وإدارة نظافة وفطام جيدة.",
      "en": "Meat option with relatively cool housing and good hygiene/weaning."
    },
    "management": "medium"
  },
  {
    "id": "californian",
    "animalType": "rabbits",
    "name": {
      "ar": "كاليفورني",
      "en": "Californian"
    },
    "purpose": {
      "ar": "لحوم",
      "en": "Meat"
    },
    "characteristics": {
      "ar": "جسم فاتح وأطراف وأنف وأذنان داكنة عادةً.",
      "en": "Light body with typically dark points, nose and ears."
    },
    "production": {
      "ar": "لحم وخطوط تهجين؛ النمو وفق الرعاية والعليقة.",
      "en": "Meat and crossbreeding; growth depends on care/feed."
    },
    "adaptation": {
      "ar": "لا يتحمل حر المسكن الشديد رغم منشئه؛ وفر تهوية وظلاً.",
      "en": "Origin does not imply extreme-heat tolerance; provide ventilation/shade."
    },
    "feedNeeds": {
      "ar": "ألياف وعلف متوازن وماء نظيف ومراقبة الهضم.",
      "en": "Fibre, balanced feed, clean water and digestive monitoring."
    },
    "suitability": {
      "ar": "مناسب لإنتاج اللحم مع ضبط المناخ وسوق محلي.",
      "en": "Fits meat production with climate control and a local market."
    },
    "management": "medium"
  },
  {
    "id": "angora",
    "animalType": "rabbits",
    "name": {
      "ar": "أنجورا",
      "en": "Angora rabbit"
    },
    "purpose": {
      "ar": "صوف وتربية",
      "en": "Wool and breeding"
    },
    "characteristics": {
      "ar": "غطاء صوفي طويل يحتاج تمشيطاً وعناية منتظمة.",
      "en": "Long wool coat requiring regular grooming."
    },
    "production": {
      "ar": "إنتاج صوف لا يقاس كاللحم؛ النظافة والجمع الآمن مهمان.",
      "en": "Wool production, not beef-style comparison; hygiene/safe collection matter."
    },
    "adaptation": {
      "ar": "الغطاء الطويل يزيد عبء الحر؛ يحتاج بيئة جافة وباردة نسبياً.",
      "en": "Long coat increases heat burden; needs relatively cool dry housing."
    },
    "feedNeeds": {
      "ar": "ألياف وعلف أرانب متوازن مع متابعة الجلد والهضم.",
      "en": "Fibre/balanced rabbit feed with skin/digestion checks."
    },
    "suitability": {
      "ar": "لمن يملك وقتاً للعناية بالصوف وسوقاً له، لا لمزرعة قليلة المتابعة.",
      "en": "For keepers with grooming time and a wool market, not minimal-care farms."
    },
    "management": "high"
  },
  {
    "id": "ross-308",
    "animalType": "poultry",
    "name": {
      "ar": "روس 308 — هجين لاحم",
      "en": "Ross 308 — broiler hybrid"
    },
    "purpose": {
      "ar": "لحوم دواجن",
      "en": "Poultry meat"
    },
    "characteristics": {
      "ar": "هجين تجاري لاحم؛ ليس سلالة نقية ثابتة عند التكاثر.",
      "en": "Commercial broiler hybrid, not a true-breeding pure breed."
    },
    "production": {
      "ar": "نمو سريع بالإدارة المناسبة؛ لا يضمن وزناً أو موعد حصاد.",
      "en": "Rapid growth under suitable management, without guaranteed harvest weight/date."
    },
    "adaptation": {
      "ar": "النمو السريع يزيد مخاطر الحر؛ تهوية وتبريد وفرشة جافة.",
      "en": "Fast growth increases heat risk; use ventilation/cooling and dry litter."
    },
    "feedNeeds": {
      "ar": "مراحل بادئ ونامي وناهي حسب دليل المورد ومختص تغذية.",
      "en": "Starter/grower/finisher following supplier guidance and a nutritionist."
    },
    "suitability": {
      "ar": "يلائم إنتاج اللحم مع إدارة دقيقة وعلف منتظم وسوق حصاد.",
      "en": "Fits meat production with precise care, reliable feed and harvest market."
    },
    "management": "high"
  },
  {
    "id": "lohmann-brown",
    "animalType": "poultry",
    "name": {
      "ar": "لوهمان براون — هجين بياض",
      "en": "Lohmann Brown — layer hybrid"
    },
    "purpose": {
      "ar": "بيض",
      "en": "Eggs"
    },
    "characteristics": {
      "ar": "هجين بياض بني؛ شراء مصدر موثوق يحافظ على هوية الخط.",
      "en": "Brown layer hybrid; reliable sourcing preserves line identity."
    },
    "production": {
      "ar": "انتخاب لإنتاج البيض؛ المستوى يعتمد على العمر والإضاءة والتغذية.",
      "en": "Egg-selected; output depends on age, light and feed."
    },
    "adaptation": {
      "ar": "الحر يؤثر على استهلاك العلف وقشرة البيض؛ راقب الماء والتهوية.",
      "en": "Heat affects intake and shells; monitor water and ventilation."
    },
    "feedNeeds": {
      "ar": "تربية نامي ثم بياض وكالسيوم مناسب عند الإنتاج فقط.",
      "en": "Grower then layer feeding with appropriate calcium only for production."
    },
    "suitability": {
      "ar": "لإنتاج البيض مع متابعة يومية وجودة ماء وسوق منتظم.",
      "en": "Fits egg production with daily care, good water and a steady market."
    },
    "management": "medium"
  },
  {
    "id": "rhode-island",
    "animalType": "poultry",
    "name": {
      "ar": "رود آيلاند الأحمر",
      "en": "Rhode Island Red"
    },
    "purpose": {
      "ar": "بيض ولحوم",
      "en": "Dual purpose"
    },
    "characteristics": {
      "ar": "ريش أحمر بني وبنية أقوى من بعض البياض المتخصص.",
      "en": "Red-brown feathers and a sturdier frame than some specialised layers."
    },
    "production": {
      "ar": "ثنائي الغرض؛ ليس بسرعة هجين اللاحم أو إنتاج هجين البياض المتخصص.",
      "en": "Dual-purpose, not equivalent to specialised broiler growth or layer output."
    },
    "adaptation": {
      "ar": "مرونة نسبية مع مأوى جاف وظل؛ الحضانة للصغار ضرورية.",
      "en": "Relative adaptability with dry shelter/shade; chicks still need brooding."
    },
    "feedNeeds": {
      "ar": "علف بحسب العمر والبيض مع رعي تكميلي آمن لا يستبدل التوازن.",
      "en": "Age/egg-matched feed; safe supplemental ranging does not replace balance."
    },
    "suitability": {
      "ar": "يناسب المزارع الصغيرة ذات الهدف المزدوج وتوقعات معتدلة.",
      "en": "Fits small dual-purpose farms with moderate expectations."
    },
    "management": "medium"
  },
  {
    "id": "local-chicken",
    "animalType": "poultry",
    "name": {
      "ar": "دجاج بلدي — خطوط محلية",
      "en": "Local chicken — regional lines"
    },
    "purpose": {
      "ar": "بيض ولحوم",
      "en": "Dual purpose"
    },
    "characteristics": {
      "ar": "أشكال وألوان مختلفة؛ ليس سلالة واحدة محددة.",
      "en": "Variable forms/colours; not a single defined breed."
    },
    "production": {
      "ar": "إنتاج متباين ونمو أبطأ غالباً من الهجن التجارية.",
      "en": "Variable production, often slower growth than commercial hybrids."
    },
    "adaptation": {
      "ar": "قد تتأقلم الخطوط المحلية مع بيئتها؛ تحقق من مصدرها وحالتها الصحية.",
      "en": "Local lines may suit their environment; verify origin and health."
    },
    "feedNeeds": {
      "ar": "لا تعتمد على بقايا المطبخ فقط؛ غذاء متوازن ومياه وألياف مناسبة.",
      "en": "Do not rely solely on scraps; provide balanced feed and clean water."
    },
    "suitability": {
      "ar": "خيار صغير مرن عند وجود خط محلي موثوق وسوق مناسب.",
      "en": "Flexible small-farm option with trusted local stock and a suitable market."
    },
    "management": "medium"
  },
  {
    "id": "japanese-quail",
    "animalType": "quail",
    "name": {
      "ar": "سمان ياباني",
      "en": "Japanese quail"
    },
    "purpose": {
      "ar": "بيض ولحوم",
      "en": "Eggs and meat"
    },
    "characteristics": {
      "ar": "طائر صغير؛ توجد خطوط للبيض وخطوط أثقل للحم.",
      "en": "Small bird with egg lines and heavier meat lines."
    },
    "production": {
      "ar": "نضج وإنتاج مبكران نسبياً؛ النتائج حسب الخط والإدارة.",
      "en": "Relatively early maturity/output, depending on line and care."
    },
    "adaptation": {
      "ar": "حساس للتيارات والإجهاد؛ مأوى آمن وتهوية وحضانة مضبوطة.",
      "en": "Sensitive to drafts/stress; needs safe ventilated housing and controlled brooding."
    },
    "feedNeeds": {
      "ar": "علف سمان بحسب المرحلة وحبيبات مناسبة للصغار.",
      "en": "Stage-specific quail feed and chick-appropriate particles."
    },
    "suitability": {
      "ar": "يناسب مساحة صغيرة مع دقة حضانة ونظافة وسوق للبيض أو اللحم.",
      "en": "Fits small spaces with careful brooding, hygiene and a market."
    },
    "management": "medium"
  },
  {
    "id": "jumbo-quail",
    "animalType": "quail",
    "name": {
      "ar": "سمان ياباني جامبو — خط أثقل",
      "en": "Jumbo Japanese quail — heavier line"
    },
    "purpose": {
      "ar": "لحوم وبيض",
      "en": "Meat and eggs"
    },
    "characteristics": {
      "ar": "خطوط منتخبة لحجم أكبر ضمن السمان الياباني وليست نوعاً منفصلاً.",
      "en": "Heavier selected Japanese-quail lines, not a separate species."
    },
    "production": {
      "ar": "نمو أثقل نسبياً؛ اسم جامبو وحده لا يثبت الإنتاج.",
      "en": "Relatively heavier growth; the Jumbo label alone does not verify output."
    },
    "adaptation": {
      "ar": "مساحة وتهوية مناسبة للوزن وتجنب الحر والازدحام.",
      "en": "Space/ventilation matched to size; avoid heat and crowding."
    },
    "feedNeeds": {
      "ar": "علف نمو مخصص وموازنة الإنتاج حسب الخط.",
      "en": "Specialist grower feed and line-appropriate production balancing."
    },
    "suitability": {
      "ar": "لمن يستهدف اللحم مع مورد موثوق وقياس نمو فعلي.",
      "en": "For meat goals with trusted sourcing and measured growth."
    },
    "management": "medium"
  },
  {
    "id": "king",
    "animalType": "pigeons",
    "name": {
      "ar": "كينج",
      "en": "King pigeon"
    },
    "purpose": {
      "ar": "لحم الزغاليل",
      "en": "Squab meat"
    },
    "characteristics": {
      "ar": "بنية كبيرة ممتلئة؛ تختلف خطوط العرض عن الإنتاج.",
      "en": "Large stocky build; show lines differ from production lines."
    },
    "production": {
      "ar": "زغاليل للحم في خطوط الإنتاج؛ التكاثر والرعاية الأبوية مهمان.",
      "en": "Squab meat in production lines; breeding and parental care matter."
    },
    "adaptation": {
      "ar": "أعشاش جافة ومساحة للأزواج وتهوية دون تيارات.",
      "en": "Dry nests, pair space and ventilation without drafts."
    },
    "feedNeeds": {
      "ar": "غذاء حمام متوازن يدعم الأبوين والزغاليل وماء نظيف.",
      "en": "Balanced pigeon feed supporting parents/squabs, with clean water."
    },
    "suitability": {
      "ar": "خيار لحم الزغاليل مع متابعة الأزواج وسوق ومصدر إنتاج موثوق.",
      "en": "Squab option with pair monitoring, market and trusted production stock."
    },
    "management": "medium"
  },
  {
    "id": "racing-homer",
    "animalType": "pigeons",
    "name": {
      "ar": "حمام زاجل",
      "en": "Racing Homer"
    },
    "purpose": {
      "ar": "رياضة وتربية",
      "en": "Sport and breeding"
    },
    "characteristics": {
      "ar": "منتخب للملاحة والطيران؛ ألوان وبنى متعددة.",
      "en": "Selected for navigation/flight; varied colours/builds."
    },
    "production": {
      "ar": "أداء رياضي وتربية، لا يعامل كسلالة لحم متخصصة.",
      "en": "Sport/breeding performance, not a specialised meat line."
    },
    "adaptation": {
      "ar": "تهوية ومكان تدريب آمن؛ الطيران في الحر الشديد خطر.",
      "en": "Ventilation and safe training space; extreme-heat flight is risky."
    },
    "feedNeeds": {
      "ar": "غذاء متوازن بحسب التدريب دون منشطات أو خلطات مجهولة.",
      "en": "Training-matched balanced feed, no stimulants or unknown mixtures."
    },
    "suitability": {
      "ar": "للهواة ذوي خبرة تدريب وموقع مناسب، لا لهدف اللحم وحده.",
      "en": "For experienced sport keepers with a suitable location, not meat-only goals."
    },
    "management": "high"
  },
  {
    "id": "broad-white",
    "animalType": "turkeys",
    "name": {
      "ar": "أبيض عريض الصدر",
      "en": "Broad Breasted White"
    },
    "purpose": {
      "ar": "لحوم",
      "en": "Meat"
    },
    "characteristics": {
      "ar": "رومي تجاري أبيض ثقيل؛ التكاثر غالباً يحتاج إدارة متخصصة.",
      "en": "Heavy white commercial turkey; reproduction often needs specialist management."
    },
    "production": {
      "ar": "انتخاب للنمو واللحم مع متابعة الأرجل والحركة.",
      "en": "Selected for growth/meat, requiring leg/mobility monitoring."
    },
    "adaptation": {
      "ar": "حساس للحر والازدحام مع وزنه الكبير؛ مساحة وتهوية وتبريد.",
      "en": "Heavy size increases heat/crowding risk; needs space, ventilation/cooling."
    },
    "feedNeeds": {
      "ar": "علف رومي متدرج وليس علف دجاج افتراضياً.",
      "en": "Staged turkey feed, not chicken feed by default."
    },
    "suitability": {
      "ar": "يناسب إنتاجاً منظماً بعلف وإدارة متقدمة، لا تكاثراً بسيطاً بلا خبرة.",
      "en": "Fits organised production with feed and skilled management, not simple breeding."
    },
    "management": "high"
  },
  {
    "id": "bronze",
    "animalType": "turkeys",
    "name": {
      "ar": "برونزي",
      "en": "Bronze turkey"
    },
    "purpose": {
      "ar": "لحوم وتربية",
      "en": "Meat and breeding"
    },
    "characteristics": {
      "ar": "ريش برونزي داكن؛ توجد خطوط تراثية وأخرى تجارية مختلفة.",
      "en": "Dark bronze feathers; heritage and commercial lines differ."
    },
    "production": {
      "ar": "اللحم والتكاثر بحسب الخط؛ تحقق من القدرة على التزاوج الطبيعي.",
      "en": "Meat/breeding depend on line; verify natural mating ability."
    },
    "adaptation": {
      "ar": "مأوى جاف ومساحة وحماية للصغار، وفصل عن الدجاج.",
      "en": "Dry shelter, space and poult protection; separate from chickens."
    },
    "feedNeeds": {
      "ar": "علف رومي حسب العمر والهدف ومياه نظيفة.",
      "en": "Age/purpose-specific turkey feed and clean water."
    },
    "suitability": {
      "ar": "خيار للتربية الصغيرة إذا كان خطاً موثوقاً ملائماً للتكاثر المحلي.",
      "en": "Small-farm option when a trusted line suits local breeding."
    },
    "management": "medium"
  }
];
export function localText(value: LocalText, lang: string) { return lang === "ar" ? value.ar : value.en; }
export function breedsForType(type: AnimalTypeId) { return animalBreeds.filter(b => b.animalType === type); }
export function normalizeAnimalSearch(value: string) {
 return value.toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").trim();
}
export function matchesAnimalName(name: LocalText, query: string) {
 const q = normalizeAnimalSearch(query);
 return !q || normalizeAnimalSearch(`${name.ar} ${name.en}`).includes(q);
}
export function comparableBreeds(type: AnimalTypeId, ids: string[]) {
 return breedsForType(type).filter(b => ids.includes(b.id));
}
export type AnimalKnowledgeSearch = { view?: "farm"; type?: AnimalTypeId; breed?: string; compare?: string };
export function validateAnimalKnowledgeSearch(input: Record<string, unknown>): AnimalKnowledgeSearch {
 if (input.view === "farm") return { view: "farm" };
 const type = animalTypes.find(t => t.id === input.type);
 if (!type) return {};
 const breed = breedsForType(type.id).find(b => b.id === input.breed);
 const compare = typeof input.compare === "string" ? comparableBreeds(type.id, input.compare.split(",")).map(b => b.id).join(",") : "";
 return { type: type.id, ...(breed ? { breed: breed.id } : {}), ...(compare ? { compare } : {}) };
}
export const animalReferenceNote: LocalText = {
 ar: "معلومات تعليمية وقيم إرشادية عامة قد تختلف حسب السلالة والعمر ونظام التربية والظروف المحلية. يُنصح بمراجعة طبيب بيطري أو مهندس إنتاج حيواني محلي قبل تطبيق القرارات العلاجية أو التغذوية.",
 en: "Educational guidance, not guaranteed farm results. Performance varies by breed, age, system and local conditions. Consult a local veterinarian or animal-production specialist before treatment or diet decisions."
};
export const animalTreatmentSafety: LocalText = {
 ar: "يجب استشارة طبيب بيطري لتأكيد التشخيص واختيار العلاج المناسب والجرعة وفترة السحب قبل استخدام المنتجات الحيوانية. تُحترم فترة السحب المحددة من الطبيب ونشرة المنتج قبل استهلاك أو بيع الحليب واللحوم والبيض؛ لا تُقدَّم هنا جرعات أو فترات سحب مفترضة. اعزل المصاب بأمان، وفر ماءً نظيفاً وبيئة مناسبة، واطلب مساعدة عاجلة عند صعوبة التنفس أو النزف أو فقد الشهية الشديد أو النفوق المفاجئ.",
 en: "A veterinarian must confirm the diagnosis and choose treatment, dose and withdrawal period. Follow veterinary advice and the product label before consuming or selling milk, meat or eggs. No assumed doses or withdrawal periods are supplied here. Safely isolate sick animals, provide clean water and suitable housing, and seek urgent help for breathing difficulty, bleeding, severe loss of appetite or sudden deaths."
};
export const animalKnowledgeSources = [
 { name: "FAO — Animal production and health", url: "https://www.fao.org/animal-production/en/" },
 { name: "MSD Veterinary Manual — management and nutrition", url: "https://www.msdvetmanual.com/management-and-nutrition" },
 { name: "FAO DAD-IS — breed information", url: "https://www.fao.org/dad-is/en/" }
];
