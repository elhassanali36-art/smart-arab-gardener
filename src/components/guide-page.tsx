import type { ReactNode } from "react";
import { Loader2, PlayCircle } from "lucide-react";
import type { LongGuide } from "@/data/guides";
import type { GuideVideo } from "@/data/videos";
import { useTranslatedGuide } from "@/hooks/use-translated-guide";
import { useI18n } from "@/lib/i18n";

/** صفحة دليل تعليمي: مقدمة + أقسام + فيديوهات، مترجمة تلقائياً بلغة المستخدم */
export function GuidePage({
  cacheKey,
  guides,
  icon,
  title,
  subtitle,
  videos,
}: {
  cacheKey: string;
  guides: Record<"ar" | "en", LongGuide>;
  icon: ReactNode;
  title: string;
  subtitle: string;
  videos?: GuideVideo[];
  /** صورة فوتوغرافية حقيقية تظهر أعلى الدليل */
  heroImage?: string;
}) {
  const { t, lang } = useI18n();
  const { guide, isTranslating } = useTranslatedGuide(cacheKey, guides);

  return (
    <main className="px-4 pt-8">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary/10">{icon}</span>
      <h1 className="mt-3 font-display text-2xl font-extrabold text-foreground">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>

      {isTranslating && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-muted-foreground">
          <Loader2 className="size-3.5 animate-spin" />
          {t("guide.translating")}
        </p>
      )}

      <p className="surface-card mt-4 p-4 text-sm leading-relaxed text-foreground">{guide.intro}</p>

      <div className="mt-4 space-y-4">
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

      {videos && videos.length > 0 && (
        <section className="mt-6 pb-4">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
            <PlayCircle className="size-5 text-primary" />
            {t("guide.videos")}
          </h2>
          <div className="gold-divider mb-3 mt-2" />
          <div className="space-y-4">
            {videos.map((v) => (
              <figure key={v.id} className="surface-card overflow-hidden p-0">
                <div className="aspect-video w-full bg-secondary">
                  <iframe
                    className="size-full"
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={lang === "ar" ? v.titleAr : v.titleEn}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm font-bold text-foreground">
                  {lang === "ar" ? v.titleAr : v.titleEn}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
