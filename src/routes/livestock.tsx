import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Beef,
  HeartPulse,
  Stethoscope,
  Activity,
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  Sparkles,
  AlertTriangle,
  Utensils,
  Eye,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  listAnimals,
  listActivities,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  seedDemoHerd,
  livestockInsights,
  type AnimalRow,
} from "@/lib/livestock.functions";
import { livestockImages } from "@/data/livestock-images";
import {
  livestockCategories,
  healthStatuses,
  type LivestockCategory,
  type HealthStatus,
  type Gender,
} from "@/data/livestock";
import { useLivestockStrings } from "@/hooks/use-livestock-strings";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/livestock")({
  head: () => ({
    meta: [
      { title: "الثروة الحيوانية — سجل الحيوانات ورؤى ذكية | المزارع الذكي" },
      {
        name: "description",
        content:
          "سجّل أبقارك وأغنامك وماعزك وإبلك ودواجنك في قاعدة بيانات آمنة، تابع حالتها الصحية، واحصل على توصيات ذكية للرعاية والتغذية.",
      },
      { property: "og:title", content: "الثروة الحيوانية — المزارع الذكي" },
      {
        property: "og:description",
        content: "سجل حيوانات آمن مع متابعة صحية ورؤى ذكاء اصطناعي للرعاية والتغذية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LivestockPage,
});

type FormState = {
  id?: string;
  tag: string;
  category: LivestockCategory;
  breed: string;
  gender: Gender;
  ageMonths: number;
  health: HealthStatus;
  location: string;
  notes: string;
};

const emptyForm: FormState = {
  tag: "",
  category: "cattle",
  breed: "",
  gender: "female",
  ageMonths: 12,
  health: "healthy",
  location: "",
  notes: "",
};

type Insight = { kind: "alert" | "feed" | "inspect" | "herd"; title: string; body: string };
const insightIcons = { alert: AlertTriangle, feed: Utensils, inspect: Eye, herd: Users } as const;

function LivestockPage() {
  const { s } = useLivestockStrings();
  const { lang } = useI18n();
  const qc = useQueryClient();
  const [session, setSession] = useState<"loading" | "in" | "out">("loading");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setSession(data.user ? "in" : "out"));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) =>
      setSession(sess?.user ? "in" : "out"),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const fetchAnimals = useServerFn(listAnimals);
  const fetchActivities = useServerFn(listActivities);
  const addFn = useServerFn(createAnimal);
  const editFn = useServerFn(updateAnimal);
  const delFn = useServerFn(deleteAnimal);
  const seedFn = useServerFn(seedDemoHerd);
  const insightsFn = useServerFn(livestockInsights);

  const animalsQuery = useQuery({
    queryKey: ["animals"],
    queryFn: () => fetchAnimals() as Promise<AnimalRow[]>,
    enabled: session === "in",
  });
  const activitiesQuery = useQuery({
    queryKey: ["ls-activities"],
    queryFn: () => fetchActivities(),
    enabled: session === "in",
  });

  const animals = animalsQuery.data ?? [];
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["animals"] });
    void qc.invalidateQueries({ queryKey: ["ls-activities"] });
  };

  const [form, setForm] = useState<FormState | null>(null);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<LivestockCategory | "all">("all");
  const [health, setHealth] = useState<HealthStatus | "all">("all");
  const [question, setQuestion] = useState("");

  const save = useMutation({
    mutationFn: async (f: FormState) => {
      const payload = {
        tag: f.tag,
        category: f.category,
        breed: f.breed,
        gender: f.gender,
        ageMonths: Number(f.ageMonths) || 0,
        health: f.health,
        location: f.location,
        notes: f.notes || undefined,
      };
      if (f.id) return editFn({ data: { ...payload, id: f.id } });
      return addFn({ data: payload });
    },
    onSuccess: () => {
      setForm(null);
      refresh();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: refresh,
  });

  const seed = useMutation({ mutationFn: () => seedFn(), onSuccess: refresh });

  const insights = useMutation<{ summary: string; insights: Insight[] }, Error, string>({
    mutationFn: async (q: string) =>
      (await insightsFn({
        data: {
          lang,
          question: q || undefined,
          herd: animals.slice(0, 60).map((a) => ({
            tag: a.tag,
            category: a.category,
            breed: a.breed,
            gender: a.gender,
            ageMonths: a.ageMonths,
            health: a.health,
            notes: a.notes,
          })),
        },
      })) as { summary: string; insights: Insight[] },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return animals.filter(
      (a) =>
        (cat === "all" || a.category === cat) &&
        (health === "all" || a.health === health) &&
        (!q || a.tag.toLowerCase().includes(q) || a.breed.toLowerCase().includes(q)),
    );
  }, [animals, cat, health, search]);

  const counts = {
    total: animals.length,
    healthy: animals.filter((a) => a.health === "healthy").length,
    attention: animals.filter((a) => a.health === "attention").length,
    sick: animals.filter((a) => a.health === "sick").length,
  };

  const catLabel = (c: LivestockCategory) => s[c];

  if (session === "loading") {
    return (
      <main className="grid min-h-[60vh] place-items-center px-4">
        <Loader2 className="size-6 animate-spin text-primary" />
      </main>
    );
  }

  if (session === "out") {
    return (
      <main className="px-4 pt-10">
        <h1 className="font-display text-2xl font-extrabold text-foreground">{s.signinTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{s.signinBody}</p>
        <Link
          to="/auth"
          className="mt-5 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-hero"
        >
          {s.signin}
        </Link>
      </main>
    );
  }

  return (
    <main className="px-4 pt-8">
      <header>
        <span className="grid size-14 place-items-center rounded-2xl bg-primary/10">
          <Beef className="size-7 text-primary" />
        </span>
        <h1 className="mt-3 font-display text-2xl font-extrabold text-foreground">{s.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{s.subtitle}</p>
      </header>

      {/* بطاقات نظرة عامة */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="surface-card p-4">
          <Activity className="size-5 text-primary" />
          <p className="mt-2 text-[11px] font-semibold text-muted-foreground">{s.total}</p>
          <p className="font-display text-xl font-extrabold text-foreground">{counts.total}</p>
        </div>
        <div className="surface-card p-4">
          <HeartPulse className="size-5 text-primary" />
          <p className="mt-2 text-[11px] font-semibold text-muted-foreground">{s.healthy}</p>
          <p className="font-display text-xl font-extrabold text-primary">{counts.healthy}</p>
        </div>
        <div className="surface-card p-4">
          <AlertTriangle className="size-5 text-gold-ink" />
          <p className="mt-2 text-[11px] font-semibold text-muted-foreground">{s.attention}</p>
          <p className="font-display text-xl font-extrabold text-gold-ink">{counts.attention}</p>
        </div>
        <div className="surface-card p-4">
          <Stethoscope className="size-5 text-destructive" />
          <p className="mt-2 text-[11px] font-semibold text-muted-foreground">{s.sick}</p>
          <p className="font-display text-xl font-extrabold text-destructive">{counts.sick}</p>
        </div>
      </div>

      {/* التصنيفات بصور حقيقية */}
      <section className="mt-6">
        <h2 className="mb-3 font-display text-base font-bold text-foreground">{s.categories}</h2>
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
          {livestockCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(cat === c ? "all" : c)}
              className={cn(
                "surface-card w-28 shrink-0 overflow-hidden p-0 text-start",
                cat === c && "ring-2 ring-primary",
              )}
            >
              <img
                src={livestockImages[c]}
                alt={catLabel(c)}
                loading="lazy"
                width={400}
                height={300}
                className="h-20 w-full object-cover"
              />
              <span className="block px-2 py-2 text-xs font-bold text-foreground">
                {catLabel(c)}
                <span className="block text-[10px] font-semibold text-muted-foreground">
                  {animals.filter((a) => a.category === c).length}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* رؤى الذكاء الاصطناعي */}
      <section className="mt-6 surface-card p-4">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <Sparkles className="size-5 text-gold-ink" />
          {s.insights}
        </h2>
        <div className="gold-divider my-3" />
        <p className="text-xs font-semibold text-muted-foreground">{s.ask}</p>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={s.askPlaceholder}
          rows={2}
          className="mt-2 w-full rounded-2xl border border-gold/30 bg-card p-3 text-sm text-foreground outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={() => insights.mutate(question)}
          disabled={insights.isPending}
          className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60"
        >
          {insights.isPending && <Loader2 className="size-4 animate-spin" />}
          {insights.isPending ? s.thinking : s.askBtn}
        </button>

        {insights.error && <p className="mt-3 text-xs text-destructive">{s.aiError}</p>}
        {insights.data && (
          <div className="mt-4 space-y-3">
            <p className="text-sm leading-relaxed text-foreground">{insights.data.summary}</p>
            {insights.data.insights.map((i) => {
              const Icon = insightIcons[i.kind] ?? Sparkles;
              return (
                <div key={i.title} className="rounded-2xl border border-gold/25 bg-primary/5 p-3">
                  <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <Icon className="size-4 text-primary" />
                    {i.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{i.body}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* سجل الحيوانات */}
      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-foreground">{s.records}</h2>
          <button
            type="button"
            onClick={() => setForm({ ...emptyForm })}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground"
          >
            <Plus className="size-4" />
            {s.add}
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-gold/30 bg-card px-3 py-2.5 shadow-soft">
          <Search className="size-4 text-primary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={s.search}
            className="w-full bg-transparent text-sm text-foreground outline-none"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {(["all", ...healthStatuses] as (HealthStatus | "all")[]).map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setHealth(h)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold",
                health === h
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-gold/40 bg-card text-foreground",
              )}
            >
              {h === "all" ? s.all : h === "healthy" ? s.healthy : h === "attention" ? s.attention : s.sick}
            </button>
          ))}
        </div>

        {animalsQuery.isLoading && (
          <p className="mt-4 text-sm text-muted-foreground">{s.loading}</p>
        )}

        <div className="mt-4 space-y-3">
          {filtered.map((a) => (
            <article key={a.id} className="surface-card flex items-center gap-3 p-3">
              <img
                src={livestockImages[a.category as LivestockCategory] ?? livestockImages.cattle}
                alt={a.category}
                loading="lazy"
                width={160}
                height={160}
                className="size-14 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">
                  {a.tag} · {catLabel(a.category as LivestockCategory)}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {a.breed} · {a.gender === "male" ? s.male : s.female} · {a.ageMonths} {s.months}
                  {a.location ? ` · ${a.location}` : ""}
                </p>
                <span
                  className={cn(
                    "mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold",
                    a.health === "healthy"
                      ? "bg-primary/12 text-primary"
                      : a.health === "attention"
                        ? "bg-gold/25 text-gold-ink"
                        : "bg-destructive/12 text-destructive",
                  )}
                >
                  {a.health === "healthy" ? s.healthy : a.health === "attention" ? s.attention : s.sick}
                </span>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <button
                  type="button"
                  aria-label={s.edit}
                  onClick={() =>
                    setForm({
                      id: a.id,
                      tag: a.tag,
                      category: a.category as LivestockCategory,
                      breed: a.breed,
                      gender: a.gender as Gender,
                      ageMonths: a.ageMonths,
                      health: a.health as HealthStatus,
                      location: a.location,
                      notes: a.notes ?? "",
                    })
                  }
                  className="grid size-8 place-items-center rounded-full bg-secondary text-foreground"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label={s.del}
                  onClick={() => remove.mutate(a.id)}
                  className="grid size-8 place-items-center rounded-full bg-destructive/10 text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </article>
          ))}

          {!animalsQuery.isLoading && filtered.length === 0 && (
            <div className="rounded-[20px] border border-dashed border-gold/40 p-6 text-center">
              <p className="text-sm text-muted-foreground">{s.empty}</p>
              {animals.length === 0 && (
                <button
                  type="button"
                  onClick={() => seed.mutate()}
                  disabled={seed.isPending}
                  className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-gold/40 px-4 py-2 text-xs font-bold text-foreground"
                >
                  {seed.isPending && <Loader2 className="size-3.5 animate-spin" />}
                  {s.seed}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* أنشطة حديثة */}
      <section className="mt-6 pb-4">
        <h2 className="mb-3 font-display text-base font-bold text-foreground">{s.activities}</h2>
        <div className="surface-card divide-y divide-gold/15 p-0">
          {(activitiesQuery.data ?? []).map((act) => (
            <p key={act.id} className="px-4 py-3 text-xs text-foreground">
              {act.text}
              <span className="block text-[10px] text-muted-foreground">
                {new Date(act.created_at).toLocaleString()}
              </span>
            </p>
          ))}
          {(activitiesQuery.data ?? []).length === 0 && (
            <p className="px-4 py-3 text-xs text-muted-foreground">{s.noActivities}</p>
          )}
        </div>
      </section>

      {/* نموذج الإضافة / التعديل */}
      {form && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/40 p-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate(form);
            }}
            className="max-h-[88vh] w-full overflow-y-auto rounded-t-[24px] bg-card p-5"
          >
            <h3 className="font-display text-lg font-extrabold text-foreground">
              {form.id ? s.edit : s.add}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Field label={s.tag}>
                <input
                  required
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label={s.category}>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value as LivestockCategory })
                  }
                  className={inputCls}
                >
                  {livestockCategories.map((c) => (
                    <option key={c} value={c}>
                      {catLabel(c)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={s.breed}>
                <input
                  value={form.breed}
                  onChange={(e) => setForm({ ...form, breed: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label={s.gender}>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value as Gender })}
                  className={inputCls}
                >
                  <option value="female">{s.female}</option>
                  <option value="male">{s.male}</option>
                </select>
              </Field>
              <Field label={s.age}>
                <input
                  type="number"
                  min={0}
                  max={400}
                  value={form.ageMonths}
                  onChange={(e) => setForm({ ...form, ageMonths: Number(e.target.value) })}
                  className={inputCls}
                />
              </Field>
              <Field label={s.health}>
                <select
                  value={form.health}
                  onChange={(e) => setForm({ ...form, health: e.target.value as HealthStatus })}
                  className={inputCls}
                >
                  <option value="healthy">{s.healthy}</option>
                  <option value="attention">{s.attention}</option>
                  <option value="sick">{s.sick}</option>
                </select>
              </Field>
              <div className="col-span-2">
                <Field label={s.location}>
                  <input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className={inputCls}
                  />
                </Field>
              </div>
              <div className="col-span-2">
                <Field label={s.notes}>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="submit"
                disabled={save.isPending}
                className="flex-1 rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
              >
                {save.isPending ? s.loading : s.save}
              </button>
              <button
                type="button"
                onClick={() => setForm(null)}
                className="flex-1 rounded-2xl border border-gold/40 py-3 text-sm font-bold text-foreground"
              >
                {s.cancel}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

const inputCls =
  "mt-1 w-full rounded-xl border border-gold/30 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-semibold text-muted-foreground">
      {label}
      {children}
    </label>
  );
}
