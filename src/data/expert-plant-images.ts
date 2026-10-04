import mango from "@/assets/plants/expert-mango.jpg";
import cashew from "@/assets/plants/expert-cashew.jpg";
import coffee from "@/assets/plants/expert-coffee.jpg";
import wheat from "@/assets/plants/expert-wheat.jpg";
import { plantImages } from "@/data/plant-images";
import { guideImages } from "@/data/guide-images";

const aliases: Array<[string[], string]> = [
  [["mangifera indica", "mango", "مانجو", "مانجا", "المانجو", "المانجا"], mango],
  [["anacardium occidentale", "cashew", "كاجو", "الكاجو"], cashew],
  [["coffea arabica", "coffea canephora", "coffee", "قهوة", "القهوة"], coffee],
  [["triticum", "wheat", "قمح", "القمح"], wheat],
  [["rosa damascena", "damask rose", "rose", "ورد جوري", "وردة جوري", "الورد الجوري"], plantImages["damask-rose"]],
  [["solanum lycopersicum", "tomato", "طماطم", "الطماطم"], plantImages.tomato],
  [["olea europaea", "olive", "زيتون", "الزيتون"], plantImages["olive-tree"]],
  [["mentha", "mint", "نعناع", "النعناع"], plantImages.mint],
  [["citrus limon", "lemon", "ليمون", "الليمون"], plantImages["lemon-tree"]],
  [["ficus carica", "fig", "تين", "التين"], plantImages["fig-tree"]],
  [["punica granatum", "pomegranate", "رمان", "الرمان"], plantImages.pomegranate],
  [["phoenix dactylifera", "date palm", "نخيل", "نخلة", "التمر"], plantImages["date-palm"]],
  [["ocimum basilicum", "basil", "ريحان", "حبق"], plantImages.basil],
  [["jasminum", "jasmine", "ياسمين", "الياسمين"], plantImages.jasmine],
  [["bougainvillea", "جهنمية", "الجهنمية"], plantImages.bougainvillea],
  [["azadirachta indica", "neem", "نيم", "النيم"], plantImages.neem],
  [["fragaria", "strawberry", "فراولة", "الفراولة"], plantImages.strawberry],
  [["capsicum", "chili", "pepper", "فلفل", "شطة"], plantImages.chili],
  [["solanum melongena", "eggplant", "باذنجان", "الباذنجان"], plantImages.eggplant],
  [["cucumis sativus", "cucumber", "خيار", "الخيار"], plantImages.cucumber],
  [["abelmoschus esculentus", "okra", "بامية", "البامية"], plantImages.okra],
  [["daucus carota", "carrot", "جزر", "الجزر"], plantImages.carrot],
  [["lactuca sativa", "lettuce", "خس", "الخس"], plantImages.lettuce],
  [["spinacia oleracea", "spinach", "سبانخ", "السبانخ"], plantImages.spinach],
  [["petroselinum crispum", "parsley", "بقدونس", "البقدونس"], plantImages.parsley],
  [["eruca", "arugula", "جرجير", "الجرجير"], plantImages.arugula],
  [["raphanus sativus", "radish", "فجل", "الفجل"], plantImages.radish],
  [["allium cepa", "green onion", "بصل أخضر", "البصل الأخضر"], plantImages["green-onion"]],
  [["tagetes", "marigold", "قطيفة", "القطيفة"], plantImages.marigold],
  [["petunia", "بيتونيا", "البيتونيا"], plantImages.petunia],
  [["medicago sativa", "alfalfa", "برسيم", "البرسيم"], plantImages.alfalfa],
  [["sorghum", "ذرة رفيعة", "سورغم"], plantImages["sorghum-fodder"]],
];

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase().replace(/[أإآ]/g, "ا").replace(/ة/g, "ه");
}

export function expertPlantImage(...names: Array<string | undefined>): string {
  const searchable = normalize(names.filter(Boolean).join(" "));
  const match = aliases.find(([terms]) => terms.some((term) => searchable.includes(normalize(term))));
  return match?.[1] ?? guideImages.expert;
}