import { createFileRoute } from "@tanstack/react-router";
import { Warehouse } from "lucide-react";
import { greenhouseGuide } from "@/data/guides";
import { GuidePage } from "@/components/guide-page";
import { guideImages } from "@/data/guide-images";
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
  const { t } = useI18n();
  return (
    <GuidePage
      cacheKey="greenhouse"
      guides={greenhouseGuide}
      icon={<Warehouse className="size-7 text-primary" />}
      title={t("greenhouse.title")}
      subtitle={t("greenhouse.subtitle")}
    />
  );
}

