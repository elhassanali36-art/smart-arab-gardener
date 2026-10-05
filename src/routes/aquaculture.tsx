import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Fish, Search, AlertTriangle, X } from "lucide-react";
import hero from "@/assets/aquaculture/hero.jpg";
import { species, groupLabels, waterLabels, safetyNote, type Group, type Species, type WaterType } from "@/data/aquaculture";

export const Route = createFileRoute("/aquaculture")({
  head: () => ({
    meta: [
      { title: "المأكولات البحرية والثروة المائية | المزارع الذكي" },
      { name: "description", content: "دليل استزراع الجمبري والبلطي والسرطان والاستاكوزا والأسماك البحرية والرخويات: المياه، التغذية، الأمراض، والحصاد." },
      { property: "og:title", content: "المأكولات البحرية والثروة المائية" },
      { property: "og:description", content: "دليل عملي لاستزراع الأسماك والقشريات والرخويات بخطوات واضحة وجداول زمنية." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Aquaculture,
});

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${active ? "border-primary bg-primary text-primary-foreground" : "border-gold/30 bg-card text-foreground"}`}>
      {children}
    </button>
  );
}

function Aquaculture() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<Group | "all">("all");
  const [water, setWater] = useState<WaterType | "all">("all");
  const [open, setOpen] = useState<Species | null>(null);

  const list = useMemo(() => species.filter((s) =>
    (group === "all" || s.group === group) &&
    (water === "all" || s.water.includes(water)) &&
    (!q.trim() || `${s.name} ${s.latin} ${s.varieties} ${groupLabels[s.group]}`.toLowerCase().includes(q.trim().toLowerCase()))
  ), [q, group, water]);

  return (
    <div dir="rtl" className="mx-auto max-w-3xl px-4 pb-28 pt-4">
      <div className="relative overflow-hidden rounded-3xl">
        <img src={hero} alt="أحواض استزراع سمكي مع بلطي وجمبري" width={1280} height={720} className="h-48 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent" />
        <div className="absolute bottom-3 right-4">
          <h1 className="flex items-center gap-2 text-xl font-bold text-foreground"><Fish className="size-5 text-primary" />المأكولات البحرية والثروة المائية</h1>
          <p className="text-xs text-muted-foreground">دليل عملي للاستزراع المائي — بدون تسجيل</p>
        </div>
      </div>

      <div className="surface-card mt-4 flex items-start gap-2 p-3 text-xs text-foreground">
        <AlertTriangle className="size-4 shrink-0 text-primary" />{safetyNote}
      </div>

      <label className="mt-4 flex items-center gap-2 rounded-xl border border-gold/30 bg-background px-3 py-2">
        <Search className="size-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث: جمبري، بلطي، محار..." className="w-full bg-transparent text-sm text-foreground outline-none" />
      </label>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        <Chip active={group === "all"} onClick={() => setGroup("all")}>الكل</Chip>
        {(Object.keys(groupLabels) as Group[]).map((g) => <Chip key={g} active={group === g} onClick={() => setGroup(g)}>{groupLabels[g]}</Chip>)}
      </div>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        <Chip active={water === "all"} onClick={() => setWater("all")}>كل المياه</Chip>
        {(Object.keys(waterLabels) as WaterType[]).map((w) => <Chip key={w} active={water === w} onClick={() => setWater(w)}>{waterLabels[w]}</Chip>)}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {list.map((s) => (
          <button key={s.id} onClick={() => setOpen(s)} className="surface-card p-4 text-right">
            <p className="text-[11px] font-semibold text-primary">{groupLabels[s.group]}</p>
            <p className="mt-1 text-sm font-bold text-foreground">{s.name}</p>
            <p className="text-[11px] italic text-muted-foreground" dir="ltr">{s.latin}</p>
            <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{s.intro}</p>
            <p className="mt-2 text-[11px] text-foreground">⏱ {s.cycle} · {s.water.map((w) => waterLabels[w]).join("، ")}</p>
          </button>
        ))}
        {list.length === 0 && <p className="text-sm text-muted-foreground">لا توجد نتائج مطابقة.</p>}
      </div>

      {open && <Detail s={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function Sec({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h3 className="text-sm font-bold text-primary">{n}. {title}</h3>
      <div className="mt-1 text-sm leading-7 text-foreground">{children}</div>
    </section>
  );
}

function Detail({ s, onClose }: { s: Species; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background/80 p-3 backdrop-blur" onClick={onClose}>
      <div dir="rtl" className="surface-card mx-auto max-w-2xl p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-foreground">{s.name}</h2>
            <p className="text-xs italic text-muted-foreground" dir="ltr">{s.latin}</p>
          </div>
          <button onClick={onClose} aria-label="إغلاق"><X className="size-5 text-muted-foreground" /></button>
        </div>

        <div className="mt-4 rounded-2xl bg-primary/5 p-3">
          <p className="text-xs font-bold text-foreground">الجدول الزمني</p>
          <ol className="mt-2 space-y-2 border-r-2 border-primary/40 pr-3">
            {s.timeline.map((t) => (
              <li key={t.stage} className="text-xs"><span className="font-bold text-primary">{t.stage}</span> — <span className="text-muted-foreground">{t.time}</span><br /><span className="text-foreground">{t.detail}</span></li>
            ))}
          </ol>
        </div>

        <Sec n={1} title="التعريف والأنواع">{s.intro}<br /><b>الأنواع:</b> {s.varieties}</Sec>
        <Sec n={2} title="البيئة والمياه المناسبة">
          <ul className="list-disc pr-5">
            <li>الحرارة: {s.env.temp}</li><li>الملوحة: {s.env.salinity}</li><li>pH: {s.env.ph}</li><li>الأكسجين: {s.env.oxygen}</li><li>جودة المياه: {s.env.quality}</li>
          </ul>
        </Sec>
        <Sec n={3} title="تجهيز الأحواض أو الأقفاص">{s.system}</Sec>
        <Sec n={4} title="اختيار الزريعة وحجم البدء">{s.seed}</Sec>
        <Sec n={5} title="التغذية ومراحلها"><ul className="list-disc pr-5">{s.feeding.map((f) => <li key={f}>{f}</li>)}</ul></Sec>
        <Sec n={6} title="مراحل النمو والحجم التسويقي">{s.growth}</Sec>
        <Sec n={7} title="مدة دورة الإنتاج">{s.cycle}</Sec>
        <Sec n={8} title="الأمراض والمشاكل الشائعة وطرق التعامل">
          <div className="space-y-2">
            {s.diseases.map((d) => (
              <div key={d.name} className="rounded-xl border border-gold/30 p-3 text-xs leading-6">
                <p className="font-bold text-foreground">{d.name}</p>
                <p><b>الأعراض:</b> {d.symptoms}</p><p><b>الوقاية:</b> {d.prevention}</p><p><b>التعامل الآمن:</b> {d.handling}</p>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">⚠️ {safetyNote}</p>
          </div>
        </Sec>
        <Sec n={9} title="معدلات النمو والعوامل المؤثرة">{s.growthFactors}</Sec>
        <Sec n={10} title="الحصاد والتداول والتخزين">{s.harvest}</Sec>
        <Sec n={11} title="نصائح عملية للمزارع"><ul className="list-disc pr-5">{s.tips.map((t) => <li key={t}>{t}</li>)}</ul></Sec>
      </div>
    </div>
  );
}
