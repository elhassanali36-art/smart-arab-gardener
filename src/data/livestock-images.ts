import cattle from "@/assets/livestock/cattle.jpg";
import sheep from "@/assets/livestock/sheep.jpg";
import goats from "@/assets/livestock/goats.jpg";
import camels from "@/assets/livestock/camels.jpg";
import poultry from "@/assets/livestock/poultry.jpg";
import type { LivestockCategory } from "./livestock";

/** صور حقيقية لكل تصنيف حيواني (بدل الرموز التعبيرية) */
export const livestockImages: Record<LivestockCategory, string> = {
  cattle,
  sheep,
  goats,
  camels,
  poultry,
};
