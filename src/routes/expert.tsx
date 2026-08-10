import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  Sprout,
  Search,
  Loader2,
  Bug,
  FlaskConical,
  Wheat,
  BookOpen,
  Warehouse,
  Clock,
  Droplets,
  Sun,
  Layers,
} from "lucide-react";
import { askPlantExpert } from "@/lib/plant-expert.functions";
import type { PlantGuide } from "@/lib/plant-expert.shared";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/expert")({
  head: () => ({
    meta: [
      { title: "اسأل الخبير الزراعي — دليل زراعة أي نبات | المزارع الذكي" },
      {
        name: "description",
        content:
          "اكتب اسم أي نبات لتحصل على دليل زراعة كامل: الخطوات، الأسمدة ومواعيدها، الأمراض والآفات وعلاجها، وعلامات الحصاد — بعدة لغات.",
      },
      { property: "og:title", content: "اسأل الخبير الزراعي عن أي نبات" },
      {
        property: "og:description",
        content: "دليل زراعة ذكي لأي نبات: أسمدة، أمراض وعلاجها، وحصاد.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Expert,
});

const suggestions = ["طماطم", "مانجو", "قمح", "ورد جوري", "زيتون", "نعناع"];

function Expert() {
  const { t, lang } = useI18n();
  const ask = useServerFn(askPlantExpert);
  const [query, setQuery] = useState("");

  const mutation = useMutation<PlantGuide, Error, string>({
    mutationFn: async (q: string) => (await ask({ data: { query: q, lang } })) as PlantGuide,
  });

  const submit = (q: string) => {
    const value = q.trim();
    if (!value) return;
    setQuery(value);
    mutation.mutate(value);
  };

  const guide = mutation.data;
  const errorMessage = mutation.error
    ? mutation.error.message.includes("429")
      ? t("expert.rate")
      : mutation.error.message.includes("402")
        ? t("expert.credits")
        : t("expert.error")
    : null;

  return (
    <main className="px-4 pt-8">
      <h1 className="font-display text-2xl font-extrabold text-foreground">{t("expert.title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("expert.subtitle")}</p>

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-gold/30 bg-card px-3 py-2.5 shadow-soft">
        <Search className="size-4 text-primary" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit(query)}
          placeholder={t("expert.placeholder")}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <button
        type="button"
        onClick={() => submit(query)}
        disabled={mutation.isPending}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-[18px] bg-primary py-3.5 font-display text-base font-extrabold text-primary-foreground shadow-hero disabled:opacity-60"
      >
        {mutation.isPending ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <Sprout className="size-5" />
        )}
        {mutation.isPending ? t("expert.loading") : t("expert.button")}
      </button>

      <p className="mt-5 text-xs font-bold text-foreground">{t("expert.suggestions")}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => submit(s)}
            className="rounded-full border border-gold/40 bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground"
          >
            {s}
          </button>
        ))}
      </div>

      {errorMessage && (
        <p className="mt-5 rounded-[20px] border border-gold/50 bg-warn p-4 text-sm font-semibold text-warn-foreground">
          {errorMessage}
        </p>
      )}

      {mutation.isPending && (
        <div className="mt-5 space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-[20px] bg-secondary" />
          ))}
        </div>
      )}

      {guide && (
        <div className="mt-6 space-y-4 pb-4">
          <div className="surface-card px-5 py-6 text-center">
            <span className="grid mx-auto size-20 place-items-center rounded-full bg-primary/10 text-4xl">
              🌿
            </span>
            <h2 className="mt-3 font-display text-xl font-extrabold text-foreground">
              {guide.nameLocal}
            </h2>
            <p className="text-xs text-muted-foreground">{guide.nameEnglish}</p>
            <p className="text-xs italic text-muted-foreground">{guide.scientificName}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {[guide.family, ...guide.seasons, ...guide.spaces].filter(Boolean).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gold/20 px-3 py-1 text-[11px] font-bold text-gold-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Clock, label: t("expert.days"), value: guide.daysToHarvest },
              { icon: Droplets, label: t("expert.water"), value: guide.water },
              { icon: Sun, label: t("expert.sun"), value: guide.sun },
              { icon: Layers, label: t("expert.soil"), value: guide.soil },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="surface-card p-3">
                <Icon className="size-4 text-primary" />
                <p className="mt-2 text-[11px] font-semibold text-muted-foreground">{label}</p>
                <p className="text-xs font-bold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          <Section icon={BookOpen} title={t("expert.overview")}>
            <p className="text-sm leading-relaxed text-foreground">{guide.summary}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guide.climate}</p>
          </Section>

          <Section icon={Sprout} title={t("expert.steps")}>
            <ol className="space-y-3">
              {guide.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </Section>

          <Section icon={FlaskConical} title={t("expert.fertilizers")}>
            <ul className="space-y-2">
              {guide.fertilizers.map((f, i) => (
                <li key={i} className="rounded-2xl bg-secondary/70 px-3 py-2.5">
                  <p className="text-sm font-bold text-foreground">{f.name}</p>
                  <p className="text-[11px] font-semibold text-muted-foreground">{f.timing}</p>
                  <p className="text-[11px] font-semibold text-primary">
                    {t("expert.dose")}: {f.dose}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <section className="rounded-[20px] border border-gold/50 bg-warn p-4">
            <h2 className="flex items-center gap-2 font-display text-base font-bold text-warn-foreground">
              <Bug className="size-5" />
              {t("expert.diseases")}
            </h2>
            <ul className="mt-3 space-y-3">
              {guide.diseases.map((d, i) => (
                <li key={i} className="rounded-2xl bg-card/70 p-3">
                  <p className="text-sm font-bold text-foreground">{d.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    <b className="text-foreground">{t("expert.symptoms")}: </b>
                    {d.symptoms}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    <b className="text-foreground">{t("expert.treatment")}: </b>
                    {d.treatment}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    <b className="text-foreground">{t("expert.prevention")}: </b>
                    {d.prevention}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <Section icon={Wheat} title={t("expert.harvest")}>
            <ul className="space-y-2">
              {guide.harvest.map((h, i) => (
                <li key={i} className="text-sm leading-relaxed text-foreground">
                  🌾 {h}
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={Warehouse} title={t("expert.greenhouse")}>
            <p className="text-sm leading-relaxed text-foreground">{guide.greenhouseNotes}</p>
          </Section>

          <Section icon={BookOpen} title={t("expert.facts")}>
            <ul className="space-y-2">
              {guide.facts.map((f, i) => (
                <li key={i} className="text-sm leading-relaxed text-foreground">
                  • {f}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      )}
    </main>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-card p-4">
      <h2 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-foreground">
        <Icon className="size-5 text-primary" />
        {title}
      </h2>
      <div className="gold-divider mb-3" />
      {children}
    </section>
  );
}
