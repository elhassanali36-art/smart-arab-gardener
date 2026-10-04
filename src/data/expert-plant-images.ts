import mango from "@/assets/plants/expert-mango.jpg";
import cashew from "@/assets/plants/expert-cashew.jpg";
import coffee from "@/assets/plants/expert-coffee.jpg";
import wheat from "@/assets/plants/expert-wheat.jpg";
import { plantImages } from "@/data/plant-images";
import { guideImages } from "@/data/guide-images";

function existingPlantImage(id: string): string {
  return plantImages[id] ?? guideImages.expert;
}

const aliases: Array<[string[], string]> = [
  [["mangifera indica", "mango", "مانجو", "مانجا", "المانجو", "المانجا"], mango],
  [["anacardium occidentale", "cashew", "كاجو", "الكاجو"], cashew],
  [["coffea arabica", "coffea canephora", "coffee", "قهوة", "القهوة"], coffee],
  [["triticum", "wheat", "قمح", "القمح"], wheat],
  [["rosa damascena", "damask rose", "rose", "ورد جوري", "وردة جوري", "الورد الجوري"], existingPlantImage("damask-rose")],
  [["solanum lycopersicum", "tomato", "طماطم", "الطماطم"], existingPlantImage("tomato")],
  [["olea europaea", "olive", "زيتون", "الزيتون"], existingPlantImage("olive-tree")],
  [["mentha", "mint", "نعناع", "النعناع"], existingPlantImage("mint")],
  [["citrus limon", "lemon", "ليمون", "الليمون"], existingPlantImage("lemon-tree")],
  [["ficus carica", "fig", "تين", "التين"], existingPlantImage("fig-tree")],
  [["punica granatum", "pomegranate", "رمان", "الرمان"], existingPlantImage("pomegranate")],
  [["phoenix dactylifera", "date palm", "نخيل", "نخلة", "التمر"], existingPlantImage("date-palm")],
  [["ocimum basilicum", "basil", "ريحان", "حبق"], existingPlantImage("basil")],
  [["jasminum", "jasmine", "ياسمين", "الياسمين"], existingPlantImage("jasmine")],
  [["bougainvillea", "جهنمية", "الجهنمية"], existingPlantImage("bougainvillea")],
  [["azadirachta indica", "neem", "نيم", "النيم"], existingPlantImage("neem")],
  [["fragaria", "strawberry", "فراولة", "الفراولة"], existingPlantImage("strawberry")],
  [["capsicum", "chili", "pepper", "فلفل", "شطة"], existingPlantImage("chili")],
  [["solanum melongena", "eggplant", "باذنجان", "الباذنجان"], existingPlantImage("eggplant")],
  [["cucumis sativus", "cucumber", "خيار", "الخيار"], existingPlantImage("cucumber")],
  [["abelmoschus esculentus", "okra", "بامية", "البامية"], existingPlantImage("okra")],
  [["daucus carota", "carrot", "جزر", "الجزر"], existingPlantImage("carrot")],
  [["lactuca sativa", "lettuce", "خس", "الخس"], existingPlantImage("lettuce")],
  [["spinacia oleracea", "spinach", "سبانخ", "السبانخ"], existingPlantImage("spinach")],
  [["petroselinum crispum", "parsley", "بقدونس", "البقدونس"], existingPlantImage("parsley")],
  [["eruca", "arugula", "جرجير", "الجرجير"], existingPlantImage("arugula")],
  [["raphanus sativus", "radish", "فجل", "الفجل"], existingPlantImage("radish")],
  [["allium cepa", "green onion", "بصل أخضر", "البصل الأخضر"], existingPlantImage("green-onion")],
  [["tagetes", "marigold", "قطيفة", "القطيفة"], existingPlantImage("marigold")],
  [["petunia", "بيتونيا", "البيتونيا"], existingPlantImage("petunia")],
  [["medicago sativa", "alfalfa", "برسيم", "البرسيم"], existingPlantImage("alfalfa")],
  [["sorghum", "ذرة رفيعة", "سورغم"], existingPlantImage("sorghum-fodder")],
];

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase().replace(/[أإآ]/g, "ا").replace(/ة/g, "ه");
}

export function expertPlantImage(...names: Array<string | undefined>): string {
  const searchable = normalize(names.filter(Boolean).join(" "));
  const match = aliases.find(([terms]) => terms.some((term) => searchable.includes(normalize(term))));
  return match?.[1] ?? guideImages.expert;
}