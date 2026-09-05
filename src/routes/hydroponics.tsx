import { createFileRoute } from "@tanstack/react-router";
import { Droplets } from "lucide-react";
import { hydroponicsGuide } from "@/data/guides-modern";
import { hydroVideos } from "@/data/videos";
import { GuidePage } from "@/components/guide-page";
import { guideImages } from "@/data/guide-images";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/hydroponics")({
  head: () => ({
    meta: [
      { title: "الزراعة المائية بدون تربة — الأنظمة والفيديوهات | المزارع الذكي" },
      {
        name: "description",
        content:
          "دليل الزراعة المائية: أنظمة DWC و NFT والتنقيط والأكوابونيك، خطوات بناء وحدة منزلية، ضبط EC و pH، وفيديوهات تعليمية.",
      },
      { property: "og:title", content: "الزراعة المائية بدون تربة" },
      {
        property: "og:description",
        content: "أنظمة الزراعة المائية وخطوات بنائها وفيديوهات تعليمية.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Hydroponics,
});

function Hydroponics() {
  const { t } = useI18n();
  return (
    <GuidePage
      cacheKey="hydroponics"
      guides={hydroponicsGuide}
      icon={<Droplets className="size-7 text-primary" />}
      title={t("hydro.title")}
      subtitle={t("hydro.subtitle")}
      videos={hydroVideos}
    />
  );
}
