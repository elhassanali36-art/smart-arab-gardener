import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import { PlantCard } from "@/components/plant-card";
import {
  plants,
  spaceLabels,
  difficultyLabels,
  categoryLabels,
  categoryOf,
  seasonLabels,
  type SpaceType,
  type Difficulty,
  type Category,
  type Season,
} from "@/data/plants";
import { useFavorites } from "@/hooks/use-app-store";
import { cn } from "@/lib/utils";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/explore")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "بحث متقدم عن النباتات والأشجار | المزارع الذكي" },
      {
        name: "description",
        content:
          "بحث متقدم بين الخضروات والأشجار المثمرة والزينة والظليلة والأعلاف والزهور، مع فلاتر المساحة والموسم ومدة النضج والصعوبة.",
      },
      { property: "og:title", content: "بحث متقدم عن النباتات والأشجار" },
      {
        property: "og:description",
        content: "فلاتر ذكية: تصنيف النبات، نوع المساحة، الموسم، مدة النضج، والصعوبة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Explore,
});

type MaturityKey = "any" | "fast" | "mid" | "slow" | "perennial";
type SortKey = "relevance" | "fastest" | "slowest" | "name";

const maturityOptions: { key: MaturityKey; label: string }[] = [
  { key: "any", label: "الكل" },
  { key: "fast", label: "أقل من 45 يوم" },
  { key: "mid", label: "45 - 80 يوم" },
  { key: "slow", label: "أكثر من 80 يوم" },
  { key: "perennial", label: "أشجار ومعمّرات" },
];

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "الأنسب" },
  { key: "fastest", label: "الأسرع نضجاً" },
  { key: "slowest", label: "الأطول نضجاً" },
  { key: "name", label: "أبجدي" },
];

function Explore() {
  const navigate = useNavigate();
  const { q } = Route.useSearch();
  const { ids, toggle } = useFavorites();

  const [query, setQuery] = useState(q ?? "");
  const [category, setCategory] = useState<Category | "any">("any");
  const [space, setSpace] = useState<SpaceType | "any">("any");
  const [season, setSeason] = useState<Season | "any">("any");
  const [maturity, setMaturity] = useState<MaturityKey>("any");
  const [difficulty, setDifficulty] = useState<Difficulty | "any">("any");
  const [sort, setSort] = useState<SortKey>("relevance");
  const [applied, setApplied] = useState(0);

  const results = useMemo(() => {
    const term = (q ?? "").trim().toLowerCase();
    const list = plants.filter((p) => {
      if (
        term &&
        !p.nameAr.includes(term) &&
        !p.nameEn.toLowerCase().includes(term) &&
        !p.scientificName.toLowerCase().includes(term) &&
        !categoryLabels[categoryOf(p)].includes(term)
      )
        return false;
      if (category !== "any" && categoryOf(p) !== category) return false;
      if (space !== "any" && !p.spaces.includes(space)) return false;
      if (season !== "any" && !p.seasons.includes(season)) return false;
      if (difficulty !== "any" && p.difficulty !== difficulty) return false;
      const avg = (p.maturityDays[0] + p.maturityDays[1]) / 2;
      if (maturity === "fast" && avg >= 45) return false;
      if (maturity === "mid" && (avg < 45 || avg > 80)) return false;
      if (maturity === "slow" && (avg <= 80 || avg > 365)) return false;
      if (maturity === "perennial" && avg <= 365) return false;
      return true;
    });

    const sorted = [...list];
    if (sort === "fastest") sorted.sort((a, b) => a.maturityDays[0] - b.maturityDays[0]);
    if (sort === "slowest") sorted.sort((a, b) => b.maturityDays[1] - a.maturityDays[1]);
    if (sort === "name") sorted.sort((a, b) => a.nameAr.localeCompare(b.nameAr, "ar"));
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, applied, sort]);


  const apply = () => {
    navigate({ to: "/explore", search: query ? { q: query } : {} });
    setApplied((n) => n + 1);
  };

  return (
    <main className="px-4 pt-8">
      <h1 className="font-display text-2xl font-extrabold text-foreground">البحث المتقدم</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        خضروات، أشجار مثمرة وزينة وظليلة، أعلاف، وزهور — كلها في مكان واحد.
      </p>

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-gold/30 bg-card px-3 py-2.5 shadow-soft">
        <Search className="size-4 text-primary" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          placeholder="ابحث… طماطم، نخيل، ورد الطائف، برسيم"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <FilterGroup label="تصنيف النبات">
        <Chip active={category === "any"} onClick={() => setCategory("any")}>
          الكل
        </Chip>
        {(Object.keys(categoryLabels) as Category[]).map((k) => (
          <Chip key={k} active={category === k} onClick={() => setCategory(k)}>
            {categoryLabels[k]}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="نوع المساحة">
        <Chip active={space === "any"} onClick={() => setSpace("any")}>
          الكل
        </Chip>
        {(Object.keys(spaceLabels) as SpaceType[]).map((k) => (
          <Chip key={k} active={space === k} onClick={() => setSpace(k)}>
            {spaceLabels[k]}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="الموسم">
        <Chip active={season === "any"} onClick={() => setSeason("any")}>
          الكل
        </Chip>
        {(Object.keys(seasonLabels) as Season[]).map((k) => (
          <Chip key={k} active={season === k} onClick={() => setSeason(k)}>
            {seasonLabels[k]}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="مدة النضج">
        {maturityOptions.map((o) => (
          <Chip key={o.key} active={maturity === o.key} onClick={() => setMaturity(o.key)}>
            {o.label}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="مستوى الصعوبة">
        <Chip active={difficulty === "any"} onClick={() => setDifficulty("any")}>
          الكل
        </Chip>
        {(Object.keys(difficultyLabels) as Difficulty[]).map((k) => (
          <Chip key={k} active={difficulty === k} onClick={() => setDifficulty(k)}>
            {difficultyLabels[k]}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="ترتيب النتائج">
        {sortOptions.map((o) => (
          <Chip key={o.key} active={sort === o.key} onClick={() => setSort(o.key)}>
            {o.label}
          </Chip>
        ))}
      </FilterGroup>

      <button
        type="button"
        onClick={apply}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-[18px] bg-primary py-3.5 font-display text-base font-extrabold text-primary-foreground shadow-hero"
      >
        <SlidersHorizontal className="size-5" />
        تطبيق الفلاتر
      </button>

      <p className="mt-6 text-xs font-semibold text-muted-foreground">
        {results.length} نتيجة
      </p>
      <div className="mt-3 space-y-3">
        {results.map((p) => (
          <PlantCard key={p.id} plant={p} isFavorite={ids.includes(p.id)} onToggleFavorite={toggle} />
        ))}
        {results.length === 0 && (
          <p className="rounded-[20px] border border-dashed border-gold/40 p-6 text-center text-sm text-muted-foreground">
            لا توجد نتائج مطابقة. جرّب تعديل الفلاتر.
          </p>
        )}
      </div>
    </main>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-xs font-bold text-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-gold/40 bg-card text-foreground",
      )}
    >
      {children}
    </button>
  );
}
