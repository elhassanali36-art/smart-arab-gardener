import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PlantCard } from "@/components/plant-card";
import { plants } from "@/data/plants";
import { useFavorites } from "@/hooks/use-app-store";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "نباتاتي المفضلة | المزارع الذكي" },
      {
        name: "description",
        content: "كل النباتات التي حفظتها لمتابعة زراعتها ومواعيد ريّها وحصادها.",
      },
      { property: "og:title", content: "نباتاتي المفضلة" },
      { property: "og:description", content: "قائمتك المحفوظة من النباتات في المزارع الذكي." },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const { ids, toggle } = useFavorites();
  const list = plants.filter((p) => ids.includes(p.id));

  return (
    <main className="px-4 pt-8">
      <h1 className="font-display text-2xl font-extrabold text-foreground">مفضلتي</h1>
      <p className="mt-1 text-sm text-muted-foreground">النباتات التي حفظتها للمتابعة.</p>

      <div className="mt-5 space-y-3">
        {list.map((p) => (
          <PlantCard key={p.id} plant={p} isFavorite onToggleFavorite={toggle} />
        ))}
        {list.length === 0 && (
          <div className="surface-card flex flex-col items-center gap-3 p-8 text-center">
            <Heart className="size-8 text-gold" />
            <p className="text-sm text-muted-foreground">
              لم تُضف أي نبتة بعد. استكشف النباتات واحفظ ما يعجبك.
            </p>
            <Link
              to="/explore"
              className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
            >
              استكشف النباتات
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
