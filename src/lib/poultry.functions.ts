/**
 * وحدة الدواجن والماشية الصغيرة — تخزين حقيقي في قاعدة البيانات + رؤى ذكاء اصطناعي.
 * تستخدم نفس جلسة المصادقة الحالية (requireSupabaseAuth) — لا نظام حسابات منفصل.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateJson } from "./ai-json.server";
import { languageNames } from "./plant-expert.shared";
import { poultrySpeciesIds, recordKinds } from "@/data/poultry";

export interface PoultryGroupRow {
  id: string;
  name: string;
  species: string;
  breed: string;
  purpose: string;
  quantity: number;
  startDate: string;
  location: string;
  notes: string | null;
  createdAt: string;
}

export interface PoultryRecordRow {
  id: string;
  groupId: string | null;
  kind: string;
  quantity: number;
  unit: string;
  amount: number | null;
  recordDate: string;
  notes: string | null;
  createdAt: string;
}

const groupInput = z.object({
  name: z.string().min(1).max(60),
  species: z.enum(poultrySpeciesIds),
  breed: z.string().max(80).default(""),
  purpose: z.enum(["meat", "eggs", "dual", "breeding", "fur_meat"]),
  quantity: z.number().int().min(1).max(100000),
  startDate: z.string().max(20).default(""),
  location: z.string().max(80).default(""),
  notes: z.string().max(400).optional(),
});

const recordInput = z.object({
  groupId: z.string().uuid().nullable().optional(),
  kind: z.enum(recordKinds),
  quantity: z.number().min(0).max(1000000),
  unit: z.string().max(20).default(""),
  amount: z.number().min(0).max(100000000).nullable().optional(),
  recordDate: z.string().max(20),
  notes: z.string().max(400).optional(),
});

type GroupDb = {
  id: string;
  name: string;
  species: string;
  breed: string;
  purpose: string;
  quantity: number;
  start_date: string;
  location: string;
  notes: string | null;
  created_at: string;
};

type RecordDb = {
  id: string;
  group_id: string | null;
  kind: string;
  quantity: number;
  unit: string;
  amount: number | null;
  record_date: string;
  notes: string | null;
  created_at: string;
};

const toGroup = (r: GroupDb): PoultryGroupRow => ({
  id: r.id,
  name: r.name,
  species: r.species,
  breed: r.breed,
  purpose: r.purpose,
  quantity: r.quantity,
  startDate: r.start_date,
  location: r.location,
  notes: r.notes,
  createdAt: r.created_at,
});

const toRecord = (r: RecordDb): PoultryRecordRow => ({
  id: r.id,
  groupId: r.group_id,
  kind: r.kind,
  quantity: r.quantity,
  unit: r.unit,
  amount: r.amount,
  recordDate: r.record_date,
  notes: r.notes,
  createdAt: r.created_at,
});

const GROUP_COLS = "id, name, species, breed, purpose, quantity, start_date, location, notes, created_at";
const RECORD_COLS = "id, group_id, kind, quantity, unit, amount, record_date, notes, created_at";

export const listPoultryGroups = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("poultry_groups")
      .select(GROUP_COLS)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => toGroup(r as GroupDb));
  });

export const createPoultryGroup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => groupInput.parse(input))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("poultry_groups")
      .insert({
        user_id: context.userId,
        name: data.name,
        species: data.species,
        breed: data.breed,
        purpose: data.purpose,
        quantity: data.quantity,
        start_date: data.startDate || "",
        location: data.location,
        notes: data.notes ?? null,
      })
      .select(GROUP_COLS)
      .single();
    if (error) throw new Error(error.message);
    return toGroup(row as GroupDb);
  });

export const updatePoultryGroup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    groupInput.extend({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { id, ...rest } = data;
    const { error } = await context.supabase
      .from("poultry_groups")
      .update({
        name: rest.name,
        species: rest.species,
        breed: rest.breed,
        purpose: rest.purpose,
        quantity: rest.quantity,
        start_date: rest.startDate || "",
        location: rest.location,
        notes: rest.notes ?? null,
      })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deletePoultryGroup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("poultry_groups").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listPoultryRecords = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("poultry_records")
      .select(RECORD_COLS)
      .order("record_date", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => toRecord(r as RecordDb));
  });

export const addPoultryRecord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => recordInput.parse(input))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("poultry_records")
      .insert({
        user_id: context.userId,
        ...(data.groupId ? { group_id: data.groupId } : {}),
        kind: data.kind,
        quantity: data.quantity,
        unit: data.unit,
        amount: data.amount ?? undefined,
        record_date: data.recordDate,
        notes: data.notes ?? null,
      })
      .select(RECORD_COLS)
      .single();
    if (error) throw new Error(error.message);
    return toRecord(row as RecordDb);
  });

export const deletePoultryRecord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("poultry_records").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** استيراد قطيع تجريبي لبداية سريعة */
export const seedDemoFlock = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const today = new Date().toISOString().slice(0, 10);
    const demo = [
      { name: "قطيع البياض الأول", species: "chicken_layer", breed: "لوهمان براون", purpose: "eggs", quantity: 50, location: "العشة الأولى", notes: "بداية الإنتاج" },
      { name: "دورة لاحم ١", species: "chicken_broiler", breed: "روس 308", purpose: "meat", quantity: 100, location: "العشة الثانية", notes: null },
      { name: "أرانب التسمين", species: "rabbit", breed: "نيوزيلندي أبيض", purpose: "fur_meat", quantity: 12, location: "بطارية الأرانب", notes: null },
    ] as const;
    const rows = demo.map((d) => ({
      user_id: context.userId,
      name: d.name,
      species: d.species,
      breed: d.breed,
      purpose: d.purpose,
      quantity: d.quantity,
      start_date: today,
      location: d.location,
      notes: d.notes,
    }));
    const { error } = await context.supabase.from("poultry_groups").insert(rows);
    if (error) throw new Error(error.message);
    return { inserted: rows.length };
  });

/** رؤى الذكاء الاصطناعي بناءً على بيانات المزرعة الفعلية */
const insightShape = z.object({
  summary: z.string(),
  insights: z.array(
    z.object({
      kind: z.enum(["alert", "feed", "inspect", "herd"]),
      title: z.string(),
      body: z.string(),
    }),
  ),
});

export const poultryInsights = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        lang: z.string().min(2),
        question: z.string().max(400).optional(),
        groups: z
          .array(
            z.object({
              name: z.string(),
              species: z.string(),
              breed: z.string(),
              purpose: z.string(),
              quantity: z.number(),
              notes: z.string().nullable().optional(),
            }),
          )
          .max(60),
        records: z
          .array(
            z.object({
              kind: z.string(),
              quantity: z.number(),
              recordDate: z.string(),
              notes: z.string().nullable().optional(),
            }),
          )
          .max(80),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const language = languageNames[data.lang] ?? "English";
    return generateJson({
      schema: insightShape,
      system: [
        "You are an experienced poultry veterinarian and small-livestock advisor",
        "(chickens, ducks, geese, quail, turkeys, pigeons, guinea fowl, rabbits).",
        `Write EVERY text value in ${language}.`,
        "Base your advice on the farmer's ACTUAL flock groups and farm records provided.",
        "Give practical, safe, actionable advice on health, vaccination timing, feeding stages,",
        "water, housing/ventilation, density, hygiene, egg/meat production and mortality trends.",
        "Always mention withdrawal periods before marketing when treatments are discussed,",
        "and recommend consulting a licensed veterinarian for prescription medicines.",
        "Return 3-5 insights.",
      ].join(" "),
      prompt: JSON.stringify({
        groups: data.groups,
        recentRecords: data.records,
        question: data.question ?? "Give a general flock health and production review.",
      }),
    });
  });
