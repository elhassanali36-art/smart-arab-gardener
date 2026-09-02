import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, Clock, Droplets, Sun, Layers, AlertTriangle, Heart, BookOpen } from "lucide-react";
import {
  getPlant,
  type Plant,
  seasonForMonth,
  seasonLabels,
  difficultyLabels,
  spaceLabels,
  categoryLabels,
  categoryOf,
} from "@/data/plants";
import { PlantPhoto } from "@/components/plant-photo";
import { useFavorites } from "@/hooks/use-app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/plants/$plantId")({
  loader: ({ params }) => {
    const plant = getPlant(params.plantId);
    if (!plant) throw notFound();
    return { plant };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "النبتة غير متوفرة | المزارع الذكي" }, { name: "robots", content: "noindex" }],
      };
    }
    const { plant } = loaderData;
    const title = `زراعة ${plant.nameAr} — دليل كامل | المزارع الذكي`;
    const description = `طريقة زراعة ${plant.nameAr} (${plant.nameEn})، الأسمدة، الأمراض الموسمية، وعلامات النضج خلال ${plant.maturityDays[0]}-${plant.maturityDays[1]} يوم.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PlantDetail,
});

function PlantDetail() {
  const { plant } = Route.useLoaderData() as { plant: Plant };
  const { ids, toggle } = useFavorites();
  const season = seasonForMonth(new Date().getMonth() + 1);
  const seasonPests = plant.pests.find((p) => p.season === season);
  const fav = ids.includes(plant.id);

  const stats = [
    { icon: Clock, label: "مدة النضج", value: `${plant.maturityDays[0]}-${plant.maturityDays[1]} يوم` },
    { icon: Droplets, label: "الري", value: plant.water },
    { icon: Sun, label: "الشمس", value: plant.sun },
    { icon: Layers, label: "التربة", value: plant.soil },
  ];

  return (
    <main className="px-4 pt-8">
      <div className="mb-4 flex items-center justify-between">
        <Link
          to="/results"
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground"
        >
          <ChevronRight className="size-4" />
          النتائج
        </Link>
        <button
          type="button"
          onClick={() => toggle(plant.id)}
          className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-card px-3 py-1.5 text-xs font-semibold"
        >
          <Heart className={cn("size-4", fav && "fill-primary text-primary")} />
          {fav ? "في المفضلة" : "أضف للمفضلة"}
        </button>
      </div>

      <div className="surface-card flex flex-col items-center px-5 py-7 text-center">
        <PlantPhoto
          id={plant.id}
          emoji={plant.emoji}
          alt={`صورة نبات ${plant.nameAr}`}
          className="h-44 w-full rounded-[18px] border border-gold/30"
          emojiClassName="text-5xl"
        />
        <h1 className="mt-4 font-display text-2xl font-extrabold text-foreground">
          {plant.nameAr}
        </h1>
        <p className="text-xs italic text-muted-foreground">{plant.scientificName}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-gold/25 px-3 py-1 text-[11px] font-bold text-gold-ink">
            {categoryLabels[categoryOf(plant)]}
          </span>
          <span className="rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold text-primary">
            {difficultyLabels[plant.difficulty]}
          </span>

          {plant.seasons.map((s) => (
            <span
              key={s}
              className="rounded-full bg-gold/20 px-3 py-1 text-[11px] font-bold text-gold-ink"
            >
              موسم {seasonLabels[s]}
            </span>
          ))}
          {plant.spaces.map((s) => (
            <span
              key={s}
              className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-secondary-foreground"
            >
              {spaceLabels[s]}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="surface-card p-3">
            <Icon className="size-4 text-primary" />
            <p className="mt-2 text-[11px] font-semibold text-muted-foreground">{label}</p>
            <p className="text-xs font-bold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      <Section title="طريقة الزراعة">
        <ol className="space-y-3">
          {plant.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="الأسمدة ومواعيد استخدامها">
        <ul className="space-y-2">
          {plant.fertilizers.map((f) => (
            <li
              key={f.name}
              className="flex items-center justify-between gap-2 rounded-2xl bg-secondary/70 px-3 py-2.5"
            >
              <span className="text-sm font-bold text-foreground">{f.name}</span>
              <span className="text-[11px] font-semibold text-muted-foreground">{f.timing}</span>
            </li>
          ))}
        </ul>
      </Section>

      <div className="mt-4 rounded-[20px] border border-gold/50 bg-warn p-4">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-warn-foreground">
          <AlertTriangle className="size-5" />
          آفات وأمراض موسم {seasonLabels[season]}
        </h2>
        <ul className="mt-3 space-y-1.5">
          {(seasonPests?.items ?? ["لا توجد تحذيرات مسجّلة لهذا الموسم."]).map((item) => (
            <li key={item} className="text-sm font-semibold text-warn-foreground">
              • {item}
            </li>
          ))}
        </ul>
      </div>

      <Section title="علامات النضج وموعد الحصاد">
        <ul className="space-y-2">
          {plant.harvest.map((h) => (
            <li key={h} className="text-sm leading-relaxed text-foreground">
              🌾 {h}
            </li>
          ))}
        </ul>
      </Section>

      {plant.facts && plant.facts.length > 0 && (
        <Section title="معلومات تثقيفية عن النبات">
          <ul className="space-y-2.5">
            {plant.facts.map((f) => (
              <li key={f} className="flex gap-2 text-sm leading-relaxed text-foreground">
                <BookOpen className="mt-0.5 size-4 shrink-0 text-gold-ink" />
                {f}
              </li>
            ))}
          </ul>
        </Section>
      )}

    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="surface-card mt-4 p-4">
      <h2 className="mb-3 font-display text-base font-bold text-foreground">{title}</h2>
      <div className="gold-divider mb-3" />
      {children}
    </section>
  );
}
