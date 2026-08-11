import { createFileRoute } from "@tanstack/react-router";
import { Columns3 } from "lucide-react";
import { verticalGuide } from "@/data/guides-modern";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/vertical")({
  head: () => ({
    meta: [
      { title: "الزراعة العمودية وفي أعمدة — دليل كامل | المزارع الذكي" },
      {
        name: "description",
        content:
          "دليل الزراعة العمودية: أنواع الأعمدة والأبراج والجيوب الجدارية، خطوات بناء عمود PVC، الوسط الزراعي المناسب، وأفضل المحاصيل للشرفات والأسطح.",
      },
      { property: "og:title", content: "الزراعة العمودية وفي أعمدة" },
      {
        property: "og:description",
        content: "استغل الارتفاع: أبراج وأعمدة زراعية تنتج أضعاف المساحة الأفقية.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Vertical;
});

function Vertical() {
  const { t, lang } = useI18n();
  const guide = verticalGuide[lang === "ar" ? "ar" : "en"];

  return (
    <main className="px-4 pt-8">
      <span className="grid size-14 place-items-center rounded-2xl bg-gold/20">
        <Columns3 className="size-7 text-gold-ink" />
      </span>
      <h1 className="mt-3 font-display text-2xl font-extrabold text-foreground">
        {t("vertical.title")}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("vertical.subtitle")}</p>

      <p className="surface-card mt-4 p-4 text-sm leading-relaxed text-foreground">{guide.intro}</p>

      <div className="mt-4 space-y-4 pb-4">
        {guide.sections.map((section) => (
          <section key={section.title} className="surface-card p-4">
            <h2 className="mb-3 font-display text-base font-bold text-foreground">
              {section.title}
            </h2>
            <div className="gold-divider mb-3" />
            <ul className="space-y-2.5">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
