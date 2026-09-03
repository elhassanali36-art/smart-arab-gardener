/**
 * وحدة الثروة الحيوانية — تخزين حقيقي في قاعدة البيانات + رؤى ذكاء اصطناعي.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateJson } from "./ai-json.server";
import { languageNames } from "./plant-expert.shared";

export interface AnimalRow {
  id: string;
  tag: string;
  category: string;
  breed: string;
  gender: string;
  ageMonths: number;
  health: string;
  location: string;
  notes: string | null;
  createdAt: string;
}

const animalInput = z.object({
  tag: z.string().min(1).max(40),
  category: z.enum(["cattle", "sheep", "goats", "camels", "poultry"]),
  breed: z.string().max(80).default(""),
  gender: z.enum(["male", "female"]),
  ageMonths: z.number().int().min(0).max(400),
  health: z.enum(["healthy", "attention", "sick"]),
  location: z.string().max(80).default(""),
  notes: z.string().max(400).optional(),
});

type Row = {
  id: string;
  tag: string;
  category: string;
  breed: string;
  gender: string;
  age_months: number;
  health: string;
  location: string;
  notes: string | null;
  created_at: string;
};

function toAnimal(r: Row): AnimalRow {
  return {
    id: r.id,
    tag: r.tag,
    category: r.category,
    breed: r.breed,
    gender: r.gender,
    ageMonths: r.age_months,
    health: r.health,
    location: r.location,
    notes: r.notes,
    createdAt: r.created_at,
  };
}

export const listAnimals = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("animals")
      .select("id, tag, category, breed, gender, age_months, health, location, notes, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => toAnimal(r as Row));
  });

export const createAnimal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => animalInput.parse(input))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("animals")
      .insert({
        user_id: context.userId,
        tag: data.tag,
        category: data.category,
        breed: data.breed,
        gender: data.gender,
        age_months: data.ageMonths,
        health: data.health,
        location: data.location,
        notes: data.notes ?? null,
      })
      .select("id, tag, category, breed, gender, age_months, health, location, notes, created_at")
      .single();
    if (error) throw new Error(error.message);
    await context.supabase
      .from("livestock_activities")
      .insert({ user_id: context.userId, text: `أُضيف الحيوان ${data.tag}` });
    return toAnimal(row as Row);
  });

export const updateAnimal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    animalInput.extend({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { id, ...rest } = data;
    const { error } = await context.supabase
      .from("animals")
      .update({
        tag: rest.tag,
        category: rest.category,
        breed: rest.breed,
        gender: rest.gender,
        age_months: rest.ageMonths,
        health: rest.health,
        location: rest.location,
        notes: rest.notes ?? null,
      })
      .eq("id", id);
    if (error) throw new Error(error.message);
    await context.supabase
      .from("livestock_activities")
      .insert({ user_id: context.userId, text: `تحديث بيانات ${rest.tag}` });
    return { ok: true };
  });

export const deleteAnimal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("animals").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listActivities = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("livestock_activities")
      .select("id, text, created_at")
      .order("created_at", { ascending: false })
      .limit(8);
    if (error) throw new Error(error.message);
    return (data ?? []) as { id: string; text: string; created_at: string }[];
  });

/** استيراد قطيع تجريبي واقعي لبداية سريعة */
export const seedDemoHerd = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const demo = [
      ["CT-1001", "cattle", "هولشتاين", "female", 42, "healthy", "الحوش الشمالي", "إنتاج حليب جيد"],
      ["CT-1002", "cattle", "فريزيان", "male", 18, "attention", "الحوش الشمالي", "نقص وزن طفيف"],
      ["SH-2001", "sheep", "نجدي", "female", 24, "healthy", "مظلة الأغنام", null],
      ["SH-2002", "sheep", "نعيمي", "male", 10, "sick", "الحجر الصحي", "أعراض تنفسية"],
      ["GT-3001", "goats", "عارضي", "female", 30, "healthy", "الحوش الشرقي", null],
      ["GT-3002", "goats", "شامي", "female", 15, "attention", "الحوش الشرقي", "فحص حوافر"],
      ["CM-4001", "camels", "مجاهيم", "female", 84, "healthy", "المرعى المفتوح", null],
      ["PL-5001", "poultry", "دجاج بياض", "female", 8, "healthy", "العشة الأولى", "معدل بيض مستقر"],
    ] as const;
    const rows = demo.map((d) => ({
      user_id: context.userId,
      tag: d[0],
      category: d[1],
      breed: d[2],
      gender: d[3],
      age_months: d[4],
      health: d[5],
      location: d[6],
      notes: d[7],
    }));
    const { error } = await context.supabase.from("animals").insert(rows);
    if (error) throw new Error(error.message);
    return { inserted: rows.length };
  });

/** رؤى الذكاء الاصطناعي: صحة الحيوانات والعناية بها بلغة المستخدم */
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

export const livestockInsights = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        lang: z.string().min(2),
        question: z.string().max(400).optional(),
        herd: z
          .array(
            z.object({
              tag: z.string(),
              category: z.string(),
              breed: z.string(),
              gender: z.string(),
              ageMonths: z.number(),
              health: z.string(),
              notes: z.string().nullable().optional(),
            }),
          )
          .max(60),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const language = languageNames[data.lang] ?? "English";
    return generateJson({
      schema: insightShape,
      system: [
        "You are an experienced livestock veterinarian and animal husbandry advisor",
        "for smallholder farms (cattle, sheep, goats, camels, poultry).",
        `Write EVERY text value in ${language}.`,
        "Give practical, safe, actionable advice on animal health, disease signs, isolation,",
        "vaccination timing, feeding, water, housing/ventilation, hygiene and body condition.",
        "Reference specific animal tags from the herd data when relevant.",
        "Return 3-5 insights. Recommend a veterinarian for prescription medicines.",
      ].join(" "),
      prompt: JSON.stringify({
        herd: data.herd,
        question: data.question ?? "Give a general herd health and care review.",
      }),
    });
  });

/** ترجمة حزمة نصوص واجهة إلى لغة المستخدم */
export const translateStrings = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ lang: z.string().min(2), strings: z.record(z.string(), z.string()) }).parse(input),
  )
  .handler(async ({ data }) => {
    const language = languageNames[data.lang] ?? "English";
    return generateJson({
      schema: z.record(z.string(), z.string()),
      system: [
        `You are a UI localizer. Translate every JSON value into ${language}.`,
        "Keep the SAME keys, same order, no extra keys. Keep translations short (UI labels).",
        "These are labels for a livestock/farm management app.",
      ].join(" "),
      prompt: JSON.stringify(data.strings),
    });
  });
