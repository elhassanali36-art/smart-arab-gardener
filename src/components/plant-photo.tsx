import { useState } from "react";
import { plantImage } from "@/data/plant-images";
import { cn } from "@/lib/utils";

/**
 * Real photograph of a plant, with the emoji kept only as a fallback
 * when no photo exists yet (or fails to load).
 */
export function PlantPhoto({
  id,
  emoji,
  alt,
  className,
  imgClassName,
  emojiClassName,
}: {
  id: string;
  emoji: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  emojiClassName?: string;
}) {
  const src = plantImage(id);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        className={cn(
          "grid place-items-center bg-primary/10",
          className,
          emojiClassName,
        )}
        aria-hidden="true"
      >
        {emoji}
      </span>
    );
  }

  return (
    <span className={cn("relative block overflow-hidden bg-primary/10", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={cn("size-full object-cover", imgClassName)}
      />
    </span>
  );
}
