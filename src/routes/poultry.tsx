import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Egg,
  Bird,
  Rabbit,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Sparkles,
  AlertTriangle,
  Utensils,
  Eye,
  Users,
  Calculator,
  Stethoscope,
  ClipboardList,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  listPoultryGroups,
  listPoultryRecords,
  createPoultryGroup,
  updatePoultryGroup,
  deletePoultryGroup,
  addPoultryRecord,
  deletePoultryRecord,
  seedDemoFlock,
  poultryInsights,
  type PoultryGroupRow,
} from "@/lib/poultry.functions";
import {
  speciesProfiles,
  speciesById,
  recordKinds,
  recordKindLabels,
  type SpeciesId,
  type SpeciesProfile,
  type RecordKind,
  type Purpose,
} from "@/data/poultry";
import { speciesImages, familyImages } from "@/data/poultry-images";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/poultry")({
  head: () => ({
    meta: [
      { title: "الدواجن والماشية الصغيرة — إدارة القطيع والسجلات | المزارع الذكي" },
      {
        name: "description",
        content:
          "أدر قطعان الدجاج والبط والإوز والسمان والرومي والحمام والأرانب: ملفات كاملة لكل نوع، حاسبة علف، أمراض ووقاية، سجلات مزرعة ورؤى ذكية.",
      },
      { property: "og:title", content: "الدواجن والماشية الصغيرة — المزارع الذكي" },
      {
        property: "og:description",
        content: "إدارة قطعان الدواجن والأرانب مع حاسبة علف وسجلات ورؤى ذكاء اصطناعي.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PoultryPage,
});

type Strings = Record<string, string>;

const ar: Strings = {
  title: "الدواجن والماشية الصغيرة",
  subtitle: "ملفات كاملة لكل نوع، حاسبة علف، سجلات مزرعة ورؤى ذكية من بياناتك الفعلية",
  signinTitle: "سجّل الدخول لإدارة قطيعك",
  signinBody: "قسم الدواجن جزء من حسابك الحالي في المزارع الذكي — سجّل الدخول بنفس حسابك للمتابعة.",
  signin: "تسجيل الدخول",
  totalHeads: "إجمالي الرؤوس",
  groups: "المجموعات",
  eggs30: "بيض آخر 30 يوم",
  mortality30: "نفوق آخر 30 يوم",
  feed30: "علف آخر 30 يوم (كجم)",
  speciesSection: "أنواع التربية",
  birds: "الطيور",
  smallLivestock: "الماشية الصغيرة (أرانب)",
  feedCalc: "حاسبة العلف",
  feedCalcHint: "اختر النوع ومرحلة العلف والعدد لحساب الاحتياج اليومي والشهري (تقدير مرجعي).",
  stage: "مرحلة العلف",
  count: "العدد",
  perDay: "الاحتياج اليومي",
  perMonth: "الاحتياج الشهري (30 يوم)",
  kg: "كجم",
  diseases: "الأمراض والوقاية",
  diseasesHint: "معلومات إرشادية منظمة — لا تُغني عن الطبيب البيطري، والتزم بفترة التحريم قبل التسويق.",
  symptoms: "الأعراض",
  causes: "الأسباب",
  prevention: "الوقاية",
  action: "الإجراء",
  vaccine: "التحصين",
  records: "سجلات المزرعة",
  addGroup: "إضافة مجموعة",
  addRecord: "تسجيل حدث",
  empty: "لا توجد مجموعات بعد — أضف أول مجموعة أو استورد قطيعاً تجريبياً.",
  seed: "استيراد قطيع تجريبي",
  loading: "جارٍ التحميل…",
  save: "حفظ",
  cancel: "إلغاء",
  edit: "تعديل",
  del: "حذف",
  name: "اسم المجموعة",
  species: "النوع",
  breed: "السلالة",
  purpose: "الغرض",
  quantity: "العدد",
  startDate: "تاريخ البداية",
  location: "الموقع",
  notes: "ملاحظات",
  group: "المجموعة",
  kind: "نوع الحدث",
  date: "التاريخ",
  amount: "المبلغ (اختياري)",
  noRecords: "لا توجد سجلات بعد.",
  insights: "المساعد الذكي للقطيع",
  ask: "اسأل عن قطيعك — يجيب بناءً على مجموعاتك وسجلاتك الفعلية:",
  askPlaceholder: "مثال: لماذا انخفض إنتاج البيض هذا الأسبوع؟",
  askBtn: "اسأل",
  thinking: "يفكر…",
  aiError: "تعذّر الحصول على الرؤى الآن — حاول مرة أخرى.",
  purposeMeat: "لحم",
  purposeEggs: "بيض",
  purposeDual: "مزدوج",
  purposeBreeding: "تربية",
  purposeFurMeat: "لحم/فرو",
  climate: "المناخ",
  housing: "المسكن",
  density: "الكثافة",
  temperature: "الحرارة حسب العمر",
  lighting: "الإضاءة",
  water: "الماء",
  feeding: "جدول التغذية",
  production: "فترة الإنتاج",
  expected: "الإنتاج المتوقع",
  breeding: "التكاثر",
  incubation: "الحضانة/الحمل",
  maturity: "البلوغ",
  cycle: "الدورة",
  recordsKeep: "السجلات المطلوبة",
  feedStages: "مراحل العلف (تركيبات مرجعية موصى بها وليست وصفات مضمونة)",
  timeline: "مراحل الإنتاج",
  ingredients: "المكونات",
  protein: "البروتين",
  gramsDay: "جم/رأس/يوم",
  details: "الملف الكامل",
  close: "إغلاق",
};

const en: Strings = {
  title: "Poultry & Small Livestock",
  subtitle: "Full species profiles, feed calculator, farm records and AI insights from your real data",
  signinTitle: "Sign in to manage your flock",
  signinBody: "Poultry is part of your existing Smart Farm account — sign in with the same account to continue.",
  signin: "Sign in",
  totalHeads: "Total heads",
  groups: "Groups",
  eggs30: "Eggs last 30 days",
  mortality30: "Mortality last 30 days",
  feed30: "Feed last 30 days (kg)",
  speciesSection: "Species",
  birds: "Birds",
  smallLivestock: "Small livestock (rabbits)",
  feedCalc: "Feed calculator",
  feedCalcHint: "Pick species, feed stage and count for daily/monthly needs (reference estimate).",
  stage: "Feed stage",
  count: "Count",
  perDay: "Daily need",
  perMonth: "Monthly need (30 days)",
  kg: "kg",
  diseases: "Diseases & prevention",
  diseasesHint: "Organized guidance — not a substitute for a veterinarian; respect withdrawal periods.",
  symptoms: "Symptoms",
  causes: "Causes",
  prevention: "Prevention",
  action: "Action",
  vaccine: "Vaccine",
  records: "Farm records",
  addGroup: "Add group",
  addRecord: "Log event",
  empty: "No groups yet — add your first group or import a demo flock.",
  seed: "Import demo flock",
  loading: "Loading…",
  save: "Save",
  cancel: "Cancel",
  edit: "Edit",
  del: "Delete",
  name: "Group name",
  species: "Species",
  breed: "Breed",
  purpose: "Purpose",
  quantity: "Quantity",
  startDate: "Start date",
  location: "Location",
  notes: "Notes",
  group: "Group",
  kind: "Event kind",
  date: "Date",
  amount: "Amount (optional)",
  noRecords: "No records yet.",
  insights: "Smart flock assistant",
  ask: "Ask about your flock — answers use your actual groups and records:",
  askPlaceholder: "e.g. Why did egg production drop this week?",
  askBtn: "Ask",
  thinking: "Thinking…",
  aiError: "Could not get insights right now — try again.",
  purposeMeat: "Meat",
  purposeEggs: "Eggs",
  purposeDual: "Dual",
  purposeBreeding: "Breeding",
  purposeFurMeat: "Meat/fur",
  climate: "Climate",
  housing: "Housing",
  density: "Density",
  temperature: "Temperature by age",
  lighting: "Lighting",
  water: "Water",
  feeding: "Feeding schedule",
  production: "Production period",
  expected: "Expected production",
  breeding: "Breeding",
  incubation: "Incubation/pregnancy",
  maturity: "Maturity",
  cycle: "Cycle",
  recordsKeep: "Records to keep",
  feedStages: "Feed stages (recommended reference formulas, not guaranteed recipes)",
  timeline: "Production timeline",
  ingredients: "Ingredients",
  protein: "Protein",
  gramsDay: "g/head/day",
  details: "Full profile",
  close: "Close",
};

type Insight = { kind: "alert" | "feed" | "inspect" | "herd"; title: string; body: string };
const insightIcons = { alert: AlertTriangle, feed: Utensils, inspect: Eye, herd: Users } as const;

type GroupForm = {
  id?: string;
  name: string;
  species: SpeciesId;
  breed: string;
  purpose: Purpose;
  quantity: number;
  startDate: string;
  location: string;
  notes: string;
};

const emptyGroup: GroupForm = {
  name: "",
  species: "chicken_layer",
  breed: "",
  purpose: "eggs",
  quantity: 20,
  startDate: "",
  location: "",
  notes: "",
};

type RecordForm = {
  groupId: string;
  kind: RecordKind;
  quantity: number;
  amount: string;
  recordDate: string;
  notes: string;
};

const today = () => new Date().toISOString().slice(0, 10);

const emptyRecord: RecordForm = {
  groupId: "",
  kind: "eggs",
  quantity: 0,
  amount: "",
  recordDate: today(),
  notes: "",
};

function PoultryPage() {
  const { lang } = useI18n();
  const s = lang === "ar" ? ar : en;
  const qc = useQueryClient();
  const [session, setSession] = useState<"loading" | "in" | "out">("loading");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setSession(data.user ? "in" : "out"));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) =>
      setSession(sess?.user ? "in" : "out"),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const fetchGroups = useServerFn(listPoultryGroups);
  const fetchRecords = useServerFn(listPoultryRecords);
  const addGroupFn = useServerFn(createPoultryGroup);
  const editGroupFn = useServerFn(updatePoultryGroup);
  const delGroupFn = useServerFn(deletePoultryGroup);
  const addRecordFn = useServerFn(addPoultryRecord);
  const delRecordFn = useServerFn(deletePoultryRecord);
  const seedFn = useServerFn(seedDemoFlock);
  const insightsFn = useServerFn(poultryInsights);

  const groupsQuery = useQuery({
    queryKey: ["poultry-groups"],
    queryFn: () => fetchGroups() as Promise<PoultryGroupRow[]>,
    enabled: session === "in",
  });
  const recordsQuery = useQuery({
    queryKey: ["poultry-records"],
    queryFn: () => fetchRecords(),
    enabled: session === "in",
  });

  const groups = groupsQuery.data ?? [];
  const records = recordsQuery.data ?? [];
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["poultry-groups"] });
    void qc.invalidateQueries({ queryKey: ["poultry-records"] });
  };

  const [groupForm, setGroupForm] = useState<GroupForm | null>(null);
  const [recordForm, setRecordForm] = useState<RecordForm | null>(null);
  const [detail, setDetail] = useState<SpeciesProfile | null>(null);
  const [calcSpecies, setCalcSpecies] = useState<SpeciesId>("chicken_layer");
  const [calcStage, setCalcStage] = useState(0);
  const [calcCount, setCalcCount] = useState(100);
  const [question, setQuestion] = useState("");

  const saveGroup = useMutation({
    mutationFn: async (f: GroupForm) => {
      const payload = {
        name: f.name,
        species: f.species,
        breed: f.breed,
        purpose: f.purpose,
        quantity: Number(f.quantity) || 1,
        startDate: f.startDate,
        location: f.location,
        notes: f.notes || undefined,
      };
      if (f.id) return editGroupFn({ data: { ...payload, id: f.id } });
      return addGroupFn({ data: payload });
    },
    onSuccess: () => {
      setGroupForm(null);
      refresh();
    },
  });

  const removeGroup = useMutation({
    mutationFn: (id: string) => delGroupFn({ data: { id } }),
    onSuccess: refresh,
  });

  const saveRecord = useMutation({
    mutationFn: (f: RecordForm) =>
      addRecordFn({
        data: {
          groupId: f.groupId || null,
          kind: f.kind,
          quantity: Number(f.quantity) || 0,
          unit: recordKindLabels[f.kind].unit,
          amount: f.amount ? Number(f.amount) : null,
          recordDate: f.recordDate,
          notes: f.notes || undefined,
        },
      }),
    onSuccess: () => {
      setRecordForm(null);
      refresh();
    },
  });

  const removeRecord = useMutation({
    mutationFn: (id: string) => delRecordFn({ data: { id } }),
    onSuccess: refresh,
  });

  const seed = useMutation({ mutationFn: () => seedFn(), onSuccess: refresh });

  const insights = useMutation<{ summary: string; insights: Insight[] }, Error, string>({
    mutationFn: async (q: string) =>
      (await insightsFn({
        data: {
          lang,
          question: q || undefined,
          groups: groups.slice(0, 60).map((g) => ({
            name: g.name,
            species: g.species,
            breed: g.breed,
            purpose: g.purpose,
            quantity: g.quantity,
            notes: g.notes,
          })),
          records: records.slice(0, 80).map((r) => ({
            kind: r.kind,
            quantity: r.quantity,
            recordDate: r.recordDate,
            notes: r.notes,
          })),
        },
      })) as { summary: string; insights: Insight[] },
  });

  const metrics = useMemo(() => {
    const cutoff = Date.now() - 30 * 86400000;
    const recent = records.filter((r) => new Date(r.recordDate).getTime() >= cutoff);
    const sum = (kind: RecordKind) =>
      recent.filter((r) => r.kind === kind).reduce((a, r) => a + r.quantity, 0);
    return {
      heads: groups.reduce((a, g) => a + g.quantity, 0),
      groups: groups.length,
      eggs: sum("eggs"),
      mortality: sum("mortality"),
      feed: sum("feed"),
    };
  }, [groups, records]);

  const calc = useMemo(() => {
    const sp = speciesById[calcSpecies];
    const stage = sp.feed[Math.min(calcStage, sp.feed.length - 1)];
    const dailyKg = (stage.gramsPerHeadPerDay * calcCount) / 1000;
    return { stage, dailyKg, monthlyKg: dailyKg * 30 };
  }, [calcSpecies, calcStage, calcCount]);

  const purposeLabel = (p: Purpose) =>
    p === "meat" ? s.purposeMeat
    : p === "eggs" ? s.purposeEggs
    : p === "dual" ? s.purposeDual
    : p === "breeding" ? s.purposeBreeding
    : s.purposeFurMeat;

  const speciesName = (sp: SpeciesProfile) => (lang === "ar" ? sp.nameAr : sp.nameEn);

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
          <Bird className="size-7 text-primary" />
        </span>
        <h1 className="mt-3 font-display text-2xl font-extrabold text-foreground">{s.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{s.subtitle}</p>
      </header>

      {/* لوحة المؤشرات */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="surface-card p-4">
          <Users className="size-5 text-primary" />
          <p className="mt-2 text-[11px] font-semibold text-muted-foreground">{s.totalHeads}</p>
          <p className="font-display text-xl font-extrabold text-foreground">{metrics.heads}</p>
        </div>
        <div className="surface-card p-4">
          <Bird className="size-5 text-primary" />
          <p className="mt-2 text-[11px] font-semibold text-muted-foreground">{s.groups}</p>
          <p className="font-display text-xl font-extrabold text-foreground">{metrics.groups}</p>
        </div>
        <div className="surface-card p-4">
          <Egg className="size-5 text-gold-ink" />
          <p className="mt-2 text-[11px] font-semibold text-muted-foreground">{s.eggs30}</p>
          <p className="font-display text-xl font-extrabold text-gold-ink">{metrics.eggs}</p>
        </div>
        <div className="surface-card p-4">
          <AlertTriangle className="size-5 text-destructive" />
          <p className="mt-2 text-[11px] font-semibold text-muted-foreground">{s.mortality30}</p>
          <p className="font-display text-xl font-extrabold text-destructive">{metrics.mortality}</p>
        </div>
      </div>

      {/* أنواع التربية */}
      <section className="mt-6">
        <h2 className="mb-3 font-display text-base font-bold text-foreground">{s.speciesSection}</h2>
        {(["birds", "small_livestock"] as const).map((fam) => (
          <div key={fam} className="mb-4">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold text-muted-foreground">
              {fam === "birds" ? <Bird className="size-4" /> : <Rabbit className="size-4" />}
              {fam === "birds" ? s.birds : s.smallLivestock}
            </p>
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
              {speciesProfiles
                .filter((sp) => sp.family === fam)
                .map((sp) => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => setDetail(sp)}
                    className="surface-card w-32 shrink-0 overflow-hidden p-0 text-start"
                  >
                    <img
                      src={speciesImages[sp.id] ?? familyImages[fam]}
                      alt={speciesName(sp)}
                      loading="lazy"
                      width={400}
                      height={300}
                      className="h-20 w-full object-cover"
                    />
                    <span className="block px-2 py-2 text-xs font-bold text-foreground">
                      {speciesName(sp)}
                      <span className="block text-[10px] font-semibold text-muted-foreground">
                        {purposeLabel(sp.purpose)}
                      </span>
                    </span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* حاسبة العلف */}
      <section className="mt-6 surface-card p-4">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <Calculator className="size-5 text-primary" />
          {s.feedCalc}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">{s.feedCalcHint}</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <label className="text-[11px] font-semibold text-muted-foreground">
            {s.species}
            <select
              value={calcSpecies}
              onChange={(e) => {
                setCalcSpecies(e.target.value as SpeciesId);
                setCalcStage(0);
              }}
              className={inputCls}
            >
              {speciesProfiles.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {speciesName(sp)}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[11px] font-semibold text-muted-foreground">
            {s.stage}
            <select
              value={calcStage}
              onChange={(e) => setCalcStage(Number(e.target.value))}
              className={inputCls}
            >
              {speciesById[calcSpecies].feed.map((f, i) => (
                <option key={f.stage} value={i}>
                  {f.stage}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[11px] font-semibold text-muted-foreground">
            {s.count}
            <input
              type="number"
              min={1}
              value={calcCount}
              onChange={(e) => setCalcCount(Math.max(1, Number(e.target.value) || 1))}
              className={inputCls}
            />
          </label>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-primary/8 p-3 text-center">
            <p className="text-[10px] font-semibold text-muted-foreground">{s.perDay}</p>
            <p className="font-display text-lg font-extrabold text-primary">
              {calc.dailyKg.toFixed(1)} {s.kg}
            </p>
          </div>
          <div className="rounded-2xl bg-gold/15 p-3 text-center">
            <p className="text-[10px] font-semibold text-muted-foreground">{s.perMonth}</p>
            <p className="font-display text-lg font-extrabold text-gold-ink">
              {calc.monthlyKg.toFixed(0)} {s.kg}
            </p>
          </div>
        </div>
      </section>

      {/* المساعد الذكي */}
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

      {/* سجلات المزرعة */}
      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-foreground">{s.records}</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setRecordForm({ ...emptyRecord })}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-3.5 py-2 text-xs font-bold text-foreground"
            >
              <ClipboardList className="size-4" />
              {s.addRecord}
            </button>
            <button
              type="button"
              onClick={() => setGroupForm({ ...emptyGroup })}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground"
            >
              <Plus className="size-4" />
              {s.addGroup}
            </button>
          </div>
        </div>

        {groupsQuery.isLoading && <p className="mt-4 text-sm text-muted-foreground">{s.loading}</p>}

        <div className="mt-4 space-y-3">
          {groups.map((g) => {
            const sp = speciesById[g.species as SpeciesId];
            return (
              <article key={g.id} className="surface-card flex items-center gap-3 p-3">
                <img
                  src={sp ? speciesImages[sp.id] : familyImages.birds}
                  alt={g.species}
                  loading="lazy"
                  width={160}
                  height={160}
                  className="size-14 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-foreground">
                    {g.name} · {g.quantity}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {sp ? speciesName(sp) : g.species} · {g.breed} · {purposeLabel(g.purpose as Purpose)}
                    {g.location ? ` · ${g.location}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  <button
                    type="button"
                    aria-label={s.edit}
                    onClick={() =>
                      setGroupForm({
                        id: g.id,
                        name: g.name,
                        species: g.species as SpeciesId,
                        breed: g.breed,
                        purpose: g.purpose as Purpose,
                        quantity: g.quantity,
                        startDate: g.startDate,
                        location: g.location,
                        notes: g.notes ?? "",
                      })
                    }
                    className="grid size-8 place-items-center rounded-full bg-secondary text-foreground"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={s.del}
                    onClick={() => removeGroup.mutate(g.id)}
                    className="grid size-8 place-items-center rounded-full bg-destructive/10 text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </article>
            );
          })}

          {!groupsQuery.isLoading && groups.length === 0 && (
            <div className="rounded-[20px] border border-dashed border-gold/40 p-6 text-center">
              <p className="text-sm text-muted-foreground">{s.empty}</p>
              <button
                type="button"
                onClick={() => seed.mutate()}
                disabled={seed.isPending}
                className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-gold/40 px-4 py-2 text-xs font-bold text-foreground"
              >
                {seed.isPending && <Loader2 className="size-3.5 animate-spin" />}
                {s.seed}
              </button>
            </div>
          )}
        </div>

        {/* الأحداث */}
        <div className="mt-4 surface-card divide-y divide-gold/15 p-0">
          {records.map((r) => (
            <div key={r.id} className="flex items-center gap-2 px-4 py-3">
              <p className="min-w-0 flex-1 text-xs text-foreground">
                {recordKindLabels[r.kind as RecordKind]?.ar ?? r.kind} · {r.quantity}{" "}
                {r.unit !== "-" ? r.unit : ""}
                {r.amount != null ? ` · ${r.amount}` : ""}
                <span className="block text-[10px] text-muted-foreground">
                  {r.recordDate}
                  {r.notes ? ` · ${r.notes}` : ""}
                </span>
              </p>
              <button
                type="button"
                aria-label={s.del}
                onClick={() => removeRecord.mutate(r.id)}
                className="grid size-7 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
          {records.length === 0 && (
            <p className="px-4 py-3 text-xs text-muted-foreground">{s.noRecords}</p>
          )}
        </div>
      </section>

      {/* الأمراض */}
      <section className="mt-6 pb-4">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <Stethoscope className="size-5 text-destructive" />
          {s.diseases}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">{s.diseasesHint}</p>
        <div className="mt-3 space-y-3">
          {speciesById[calcSpecies].diseases.map((d) => (
            <details key={d.name} className="surface-card p-4">
              <summary className="cursor-pointer text-sm font-bold text-foreground">{d.name}</summary>
              <dl className="mt-3 space-y-2 text-xs leading-relaxed">
                <div><dt className="font-bold text-foreground">{s.symptoms}</dt><dd className="text-muted-foreground">{d.symptoms}</dd></div>
                <div><dt className="font-bold text-foreground">{s.causes}</dt><dd className="text-muted-foreground">{d.causes}</dd></div>
                <div><dt className="font-bold text-foreground">{s.prevention}</dt><dd className="text-muted-foreground">{d.prevention}</dd></div>
                <div><dt className="font-bold text-foreground">{s.action}</dt><dd className="text-muted-foreground">{d.action}</dd></div>
                {d.vaccine && (
                  <div><dt className="font-bold text-foreground">{s.vaccine}</dt><dd className="text-muted-foreground">{d.vaccine}</dd></div>
                )}
              </dl>
            </details>
          ))}
        </div>
      </section>

      {/* نموذج المجموعة */}
      {groupForm && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/40 p-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveGroup.mutate(groupForm);
            }}
            className="max-h-[88vh] w-full overflow-y-auto rounded-t-[24px] bg-card p-5"
          >
            <h3 className="font-display text-lg font-extrabold text-foreground">
              {groupForm.id ? s.edit : s.addGroup}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Field label={s.name}>
                <input
                  required
                  value={groupForm.name}
                  onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label={s.species}>
                <select
                  value={groupForm.species}
                  onChange={(e) => setGroupForm({ ...groupForm, species: e.target.value as SpeciesId })}
                  className={inputCls}
                >
                  {speciesProfiles.map((sp) => (
                    <option key={sp.id} value={sp.id}>
                      {speciesName(sp)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={s.breed}>
                <input
                  value={groupForm.breed}
                  onChange={(e) => setGroupForm({ ...groupForm, breed: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label={s.purpose}>
                <select
                  value={groupForm.purpose}
                  onChange={(e) => setGroupForm({ ...groupForm, purpose: e.target.value as Purpose })}
                  className={inputCls}
                >
                  <option value="meat">{s.purposeMeat}</option>
                  <option value="eggs">{s.purposeEggs}</option>
                  <option value="dual">{s.purposeDual}</option>
                  <option value="breeding">{s.purposeBreeding}</option>
                  <option value="fur_meat">{s.purposeFurMeat}</option>
                </select>
              </Field>
              <Field label={s.quantity}>
                <input
                  type="number"
                  min={1}
                  value={groupForm.quantity}
                  onChange={(e) => setGroupForm({ ...groupForm, quantity: Number(e.target.value) })}
                  className={inputCls}
                />
              </Field>
              <Field label={s.startDate}>
                <input
                  type="date"
                  value={groupForm.startDate}
                  onChange={(e) => setGroupForm({ ...groupForm, startDate: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <div className="col-span-2">
                <Field label={s.location}>
                  <input
                    value={groupForm.location}
                    onChange={(e) => setGroupForm({ ...groupForm, location: e.target.value })}
                    className={inputCls}
                  />
                </Field>
              </div>
              <div className="col-span-2">
                <Field label={s.notes}>
                  <textarea
                    rows={2}
                    value={groupForm.notes}
                    onChange={(e) => setGroupForm({ ...groupForm, notes: e.target.value })}
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button
                type="submit"
                disabled={saveGroup.isPending}
                className="flex-1 rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
              >
                {saveGroup.isPending ? s.loading : s.save}
              </button>
              <button
                type="button"
                onClick={() => setGroupForm(null)}
                className="flex-1 rounded-2xl border border-gold/40 py-3 text-sm font-bold text-foreground"
              >
                {s.cancel}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* نموذج الحدث */}
      {recordForm && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/40 p-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveRecord.mutate(recordForm);
            }}
            className="max-h-[88vh] w-full overflow-y-auto rounded-t-[24px] bg-card p-5"
          >
            <h3 className="font-display text-lg font-extrabold text-foreground">{s.addRecord}</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Field label={s.kind}>
                <select
                  value={recordForm.kind}
                  onChange={(e) => setRecordForm({ ...recordForm, kind: e.target.value as RecordKind })}
                  className={inputCls}
                >
                  {recordKinds.map((k) => (
                    <option key={k} value={k}>
                      {recordKindLabels[k].ar}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={s.group}>
                <select
                  value={recordForm.groupId}
                  onChange={(e) => setRecordForm({ ...recordForm, groupId: e.target.value })}
                  className={inputCls}
                >
                  <option value="">—</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={s.quantity}>
                <input
                  type="number"
                  min={0}
                  value={recordForm.quantity}
                  onChange={(e) => setRecordForm({ ...recordForm, quantity: Number(e.target.value) })}
                  className={inputCls}
                />
              </Field>
              <Field label={s.date}>
                <input
                  type="date"
                  value={recordForm.recordDate}
                  onChange={(e) => setRecordForm({ ...recordForm, recordDate: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label={s.amount}>
                <input
                  type="number"
                  min={0}
                  value={recordForm.amount}
                  onChange={(e) => setRecordForm({ ...recordForm, amount: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <div className="col-span-2">
                <Field label={s.notes}>
                  <textarea
                    rows={2}
                    value={recordForm.notes}
                    onChange={(e) => setRecordForm({ ...recordForm, notes: e.target.value })}
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button
                type="submit"
                disabled={saveRecord.isPending}
                className="flex-1 rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
              >
                {saveRecord.isPending ? s.loading : s.save}
              </button>
              <button
                type="button"
                onClick={() => setRecordForm(null)}
                className="flex-1 rounded-2xl border border-gold/40 py-3 text-sm font-bold text-foreground"
              >
                {s.cancel}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* الملف الكامل للنوع */}
      {detail && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/40">
          <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-[24px] bg-card">
            <img
              src={speciesImages[detail.id]}
              alt={speciesName(detail)}
              className="h-44 w-full rounded-t-[24px] object-cover"
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-extrabold text-foreground">
                    {speciesName(detail)}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {purposeLabel(detail.purpose)} · {detail.breeds.join("، ")}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={s.close}
                  onClick={() => setDetail(null)}
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-2 text-xs leading-relaxed">
                {([
                  [s.climate, detail.climate],
                  [s.housing, detail.housing],
                  [s.density, `${detail.spacePerHead} · ${detail.density}`],
                  [s.temperature, detail.temperatureByAge],
                  [s.lighting, detail.lighting],
                  [s.water, detail.waterPerHead],
                  [s.feeding, detail.feedingSchedule],
                  [s.production, detail.productionPeriod],
                  [s.expected, detail.expectedProduction],
                  [s.breeding, detail.breeding],
                  [s.incubation, detail.incubation],
                  [s.maturity, detail.maturity],
                  [s.cycle, detail.cycle],
                  [s.recordsKeep, detail.records],
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-primary/5 p-3">
                    <dt className="font-bold text-foreground">{k}</dt>
                    <dd className="mt-0.5 text-muted-foreground">{v}</dd>
                  </div>
                ))}
              </dl>

              <h4 className="mt-5 font-display text-sm font-bold text-foreground">{s.feedStages}</h4>
              <div className="mt-2 space-y-2">
                {detail.feed.map((f) => (
                  <div key={f.stage} className="rounded-2xl border border-gold/25 p-3 text-xs">
                    <p className="font-bold text-foreground">
                      {f.stage} · {f.ageRange} · {f.gramsPerHeadPerDay} {s.gramsDay} · {f.protein}
                    </p>
                    <p className="mt-1 text-muted-foreground">
                      {s.ingredients}: {f.ingredients.join("، ")}
                    </p>
                  </div>
                ))}
              </div>

              <h4 className="mt-5 font-display text-sm font-bold text-foreground">{s.timeline}</h4>
              <div className="mt-2 space-y-2">
                {detail.timeline.map((t) => (
                  <div key={t.stage} className="rounded-2xl bg-primary/5 p-3 text-xs">
                    <p className="font-bold text-foreground">
                      {t.stage} · {t.age}
                    </p>
                    <p className="mt-0.5 text-muted-foreground">
                      {t.target} — {t.care}
                    </p>
                  </div>
                ))}
              </div>

              <h4 className="mt-5 font-display text-sm font-bold text-foreground">{s.diseases}</h4>
              <div className="mt-2 space-y-2 pb-4">
                {detail.diseases.map((d) => (
                  <div key={d.name} className="rounded-2xl border border-gold/25 p-3 text-xs">
                    <p className="font-bold text-foreground">{d.name}</p>
                    <p className="mt-1 text-muted-foreground">
                      {s.symptoms}: {d.symptoms}
                    </p>
                    <p className="mt-0.5 text-muted-foreground">
                      {s.prevention}: {d.prevention}
                    </p>
                    <p className="mt-0.5 text-muted-foreground">
                      {s.action}: {d.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
