import { createFileRoute } from "@tanstack/react-router";
import { Recycle } from "lucide-react";
import { compostGuide } from "@/data/guides";
import { GuidePage } from "@/components/guide-page";
import { guideImages } from "@/data/guide-images";
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
  const { t } = useI18n();
  return (
    <GuidePage
      cacheKey="compost"
      guides={compostGuide}
      icon={<Recycle className="size-7 text-primary" />}
      title={t("compost.title")}
      subtitle={t("compost.subtitle")}
    />
  );
}
