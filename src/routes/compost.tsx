import { createFileRoute } from "@tanstack/react-router";
import { Recycle } from "lucide-react";
import { compostGuide } from "@/data/guides";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/compost")({
  head: () => ({
    meta: [
      { title: "صناعة الكمبوست — المواد والخطوات | المزارع الذكي" },
      {
        name: "description",
        content:
          "طريقة تحضير الكمبوست المنزلي: المواد البنية والخضراء المطلوبة، الممنوعات، خطوات بناء الكومة والتقليب، علامات النضج، وحل المشكلات.",
      },
      { property: "og:title", content: "صناعة الكمبوست: المواد وخطوات التحضير" },
      {
        property: "og:description",
        content: "دليل عملي لتحويل مخلفات المطبخ والحديقة إلى سماد عضوي غني.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Compost,
});

function Compost() {
  const { t, lang } = useI18n();
  const guide = compostGuide[lang === "ar" ? "ar" : "en"];

  return (
    <main className="px-4 pt-8">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary/10">
        <Recycle className="size-7 text-primary" />
      </span>
      <h1 className="mt-3 font-display text-2xl font-extrabold text-foreground">
        {t("compost.title")}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("compost.subtitle")}</p>

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
