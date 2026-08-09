import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { EnvStrip } from "@/components/env-strip";
import { PlantCard } from "@/components/plant-card";
import {
  plantsForMonth,
  categoryLabels,
  categoryOf,
  type SpaceType,
  type Category,
} from "@/data/plants";
import { useFavorites } from "@/hooks/use-app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "النباتات المناسبة للزراعة الآن | المزارع الذكي" },
      {
        name: "description",
        content:
          "قائمة النباتات التي يمكن زراعتها في شهرك الحالي حسب المناخ، مقسّمة بين الأصص والشرفات والحديقة المفتوحة.",
      },
      { property: "og:title", content: "النباتات المناسبة للزراعة الآن" },
      {
        property: "og:description",
        content: "نتائج مخصصة حسب موقعك وتاريخ اليوم ومناخ موسمك.",
      },
    ],
  }),
  component: Results,
});

const tabs = [
  { key: "all", label: "الكل" },
  { key: "pots", label: "أصص وشرفات" },
  { key: "garden", label: "حديقة مفتوحة" },
] as const;

function Results() {
  const [tab, setTab] = useState<"all" | SpaceType>("all");
  const [cat, setCat] = useState<Category | "any">("any");
  const { ids, toggle } = useFavorites();

  // يعتمد على تاريخ اليوم الفعلي في المتصفح
  const month = new Date().getMonth() + 1;
  const list = plantsForMonth(month).filter(
    (p) =>
      (tab === "all" || p.spaces.includes(tab as SpaceType)) &&
      (cat === "any" || categoryOf(p) === cat),
  );


  return (
    <main className="px-4 pt-8">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground"
      >
        <ChevronRight className="size-4" />
        الرئيسية
      </Link>

      <h1 className="font-display text-2xl font-extrabold text-foreground">
        يمكنك زراعة {list.length} نبتة الآن
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        اختيارات مناسبة لمناخ موسمك الحالي.
      </p>

      <div className="mt-4">
        <EnvStrip />
      </div>

      <div className="mt-5 flex gap-2 rounded-full bg-secondary p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "flex-1 rounded-full px-3 py-2 text-xs font-bold transition-colors",
              tab === t.key
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-3 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {(["any", ...(Object.keys(categoryLabels) as Category[])] as (Category | "any")[]).map(
          (k) => (
            <button
              key={k}
              type="button"
              onClick={() => setCat(k)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                cat === k
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-gold/40 bg-card text-foreground",
              )}
            >
              {k === "any" ? "كل التصنيفات" : categoryLabels[k]}
            </button>
          ),
        )}
      </div>



      <div className="mt-4 space-y-3">
        {list.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            isFavorite={ids.includes(plant.id)}
            onToggleFavorite={toggle}
          />
        ))}
        {list.length === 0 && (
          <p className="rounded-[20px] border border-dashed border-gold/40 p-6 text-center text-sm text-muted-foreground">
            لا توجد نباتات مناسبة لهذا الاختيار حالياً.
          </p>
        )}
      </div>
    </main>
  );
}
