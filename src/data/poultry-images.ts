/** صور واقعية لأقسام الدواجن والماشية الصغيرة */
import birdsGrid from "@/assets/poultry/birds-grid.jpg";
import smallGrid from "@/assets/poultry/small-grid.jpg";
import chicken from "@/assets/livestock/poultry.jpg";

import type { SpeciesId, PoultryFamily } from "./poultry";

export const familyImages: Record<PoultryFamily, string> = {
  birds: birdsGrid,
  small_livestock: smallGrid,
};

export const speciesImages: Record<SpeciesId, string> = {
  chicken_broiler: chicken,
  chicken_layer: chicken,
  chicken_dual: chicken,
  chicken_local: chicken,
  duck: birdsGrid,
  goose: birdsGrid,
  quail: birdsGrid,
  turkey: birdsGrid,
  pigeon: birdsGrid,
  guinea_fowl: birdsGrid,
  rabbit: smallGrid,
};
