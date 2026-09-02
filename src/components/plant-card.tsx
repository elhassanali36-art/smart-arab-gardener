import { Link } from "@tanstack/react-router";
import { Clock, Heart } from "lucide-react";
import { difficultyLabels, type Plant } from "@/data/plants";
import { PlantPhoto } from "@/components/plant-photo";
import { cn } from "@/lib/utils";

export function PlantCard({
  plant,
  isFavorite,
  onToggleFavorite,
}: {
  plant: Plant;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}) {
  return (
    <div className="relative flex items-center gap-4 rounded-[20px] border border-gold/25 bg-card p-4 shadow-soft transition-shadow hover:shadow-lifted">
      <Link
        to="/plants/$plantId"
        params={{ plantId: plant.id }}
        className="flex flex-1 items-center gap-4"
      >
        <PlantPhoto
          id={plant.id}
          emoji={plant.emoji}
          alt={`صورة ${plant.nameAr}`}
          className="size-16 shrink-0 rounded-2xl"
          emojiClassName="text-3xl"
        />
        <span className="flex-1">
          <span className="block text-base font-bold text-foreground">{plant.nameAr}</span>
          <span className="block text-xs text-muted-foreground">{plant.nameEn}</span>
          <span className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
              <Clock className="size-3" />
              {plant.maturityDays[0]}-{plant.maturityDays[1]} يوم
            </span>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-bold",
                plant.difficulty === "easy"
                  ? "bg-primary/12 text-primary"
                  : "bg-gold/20 text-gold-ink",
              )}
            >
              {difficultyLabels[plant.difficulty]}
            </span>
          </span>
        </span>
      </Link>
      {onToggleFavorite && (
        <button
          type="button"
          aria-label="إضافة إلى المفضلة"
          onClick={() => onToggleFavorite(plant.id)}
          className="self-start rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary"
        >
          <Heart className={cn("size-5", isFavorite && "fill-primary text-primary")} />
        </button>
      )}
    </div>
  );
}
