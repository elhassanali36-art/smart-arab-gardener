// Real photographs of each plant (Wikimedia Commons, hosted on CDN).
// To add a photo for a new plant: upload the image and add its pointer import here.

import alfalfaImg from "@/assets/plants/alfalfa.jpg.asset.json";
import arugulaImg from "@/assets/plants/arugula.jpg.asset.json";
import basilImg from "@/assets/plants/basil.jpg.asset.json";
import bougainvilleaImg from "@/assets/plants/bougainvillea.jpg.asset.json";
import carrotImg from "@/assets/plants/carrot.jpg.asset.json";
import chiliImg from "@/assets/plants/chili.jpg.asset.json";
import cucumberImg from "@/assets/plants/cucumber.jpg.asset.json";
import damask_roseImg from "@/assets/plants/damask-rose.jpg.asset.json";
import date_palmImg from "@/assets/plants/date-palm.jpg.asset.json";
import eggplantImg from "@/assets/plants/eggplant.jpg.asset.json";
import ficus_nitidaImg from "@/assets/plants/ficus-nitida.jpg.asset.json";
import fig_treeImg from "@/assets/plants/fig-tree.jpg.asset.json";
import ghafImg from "@/assets/plants/ghaf.jpg.asset.json";
import green_onionImg from "@/assets/plants/green-onion.jpg.asset.json";
import jasmineImg from "@/assets/plants/jasmine.jpg.asset.json";
import lemon_treeImg from "@/assets/plants/lemon-tree.jpg.asset.json";
import lettuceImg from "@/assets/plants/lettuce.jpg.asset.json";
import marigoldImg from "@/assets/plants/marigold.jpg.asset.json";
import mintImg from "@/assets/plants/mint.jpg.asset.json";
import neemImg from "@/assets/plants/neem.jpg.asset.json";
import okraImg from "@/assets/plants/okra.jpg.asset.json";
import olive_treeImg from "@/assets/plants/olive-tree.jpg.asset.json";
import parsleyImg from "@/assets/plants/parsley.jpg.asset.json";
import petuniaImg from "@/assets/plants/petunia.jpg.asset.json";
import pomegranateImg from "@/assets/plants/pomegranate.jpg.asset.json";
import radishImg from "@/assets/plants/radish.jpg.asset.json";
import rhodes_grassImg from "@/assets/plants/rhodes-grass.jpg.asset.json";
import sorghum_fodderImg from "@/assets/plants/sorghum-fodder.jpg.asset.json";
import spinachImg from "@/assets/plants/spinach.jpg.asset.json";
import strawberryImg from "@/assets/plants/strawberry.jpg.asset.json";
import tomatoImg from "@/assets/plants/tomato.jpg.asset.json";

export const plantImages: Record<string, string> = {
  "alfalfa": alfalfaImg.url,
  "arugula": arugulaImg.url,
  "basil": basilImg.url,
  "bougainvillea": bougainvilleaImg.url,
  "carrot": carrotImg.url,
  "chili": chiliImg.url,
  "cucumber": cucumberImg.url,
  "damask-rose": damask_roseImg.url,
  "date-palm": date_palmImg.url,
  "eggplant": eggplantImg.url,
  "ficus-nitida": ficus_nitidaImg.url,
  "fig-tree": fig_treeImg.url,
  "ghaf": ghafImg.url,
  "green-onion": green_onionImg.url,
  "jasmine": jasmineImg.url,
  "lemon-tree": lemon_treeImg.url,
  "lettuce": lettuceImg.url,
  "marigold": marigoldImg.url,
  "mint": mintImg.url,
  "neem": neemImg.url,
  "okra": okraImg.url,
  "olive-tree": olive_treeImg.url,
  "parsley": parsleyImg.url,
  "petunia": petuniaImg.url,
  "pomegranate": pomegranateImg.url,
  "radish": radishImg.url,
  "rhodes-grass": rhodes_grassImg.url,
  "sorghum-fodder": sorghum_fodderImg.url,
  "spinach": spinachImg.url,
  "strawberry": strawberryImg.url,
  "tomato": tomatoImg.url,
};

export function plantImage(id: string): string | undefined {
  return plantImages[id];
}
