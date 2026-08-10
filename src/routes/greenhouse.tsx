import { createFileRoute } from "@tanstack/react-router";
import { Warehouse } from "lucide-react";
import { greenhouseGuide } from "@/data/guides";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/greenhouse")({
  head: () => ({
    meta: [
      { title: "زراعة البيوت المحمية — الإنشاء والفوائد | المزارع الذكي" },
      {
        name: "description",
        content:
          "دليل الزراعة في البيوت المحمية: أنواع الدفيئات، خطوات الإنشاء، إدارة الحرارة والرطوبة والتسميد، وأهم فوائد الزراعة المحمية.",
      },
      { property: "og:title", content: "زراعة البيوت المحمية: الإنشاء والفوائد" },
      {
        property: "og:description",
        content: "أنواع البيوت المحمية، خطوات بناء بيت صغير، وإدارة المحصول داخله.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Greenhouse,
});

function Greenhouse() {
  const { t, lang } = useI18n();
  const guide = greenhouseGuide[lang === "ar" ? "ar" : "en"];

  return (
    <main className="px-4 pt-8">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary/10">
        <Warehouse className="size-7 text-primary" />
      </span>
      <h1 className="mt-3 font-display text-2xl font-extrabold text-foreground">
        {t("greenhouse.title")}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("greenhouse.subtitle")}</p>

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
