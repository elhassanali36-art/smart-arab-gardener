import { createFileRoute } from "@tanstack/react-router";
import { Columns3 } from "lucide-react";
import { verticalGuide } from "@/data/guides-modern";
import { verticalVideos } from "@/data/videos";
import { GuidePage } from "@/components/guide-page";
import { guideImages } from "@/data/guide-images";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/vertical")({
  head: () => ({
    meta: [
      { title: "الزراعة العمودية وفي أعمدة — دليل وفيديوهات | المزارع الذكي" },
      {
        name: "description",
        content:
          "دليل الزراعة العمودية: أنواع الأعمدة والأبراج والجيوب الجدارية، خطوات بناء عمود PVC، أفضل المحاصيل، وفيديوهات تعليمية.",
      },
      { property: "og:title", content: "الزراعة العمودية وفي أعمدة" },
      {
        property: "og:description",
        content: "أبراج وأعمدة زراعية تنتج أضعاف المساحة الأفقية — مع فيديوهات.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Vertical,
});

function Vertical() {
  const { t } = useI18n();
  return (
    <GuidePage
      cacheKey="vertical"
      guides={verticalGuide}
      icon={<Columns3 className="size-7 text-gold-ink" />}
      title={t("vertical.title")}
      subtitle={t("vertical.subtitle")}
      videos={verticalVideos}
    />
  );
}
