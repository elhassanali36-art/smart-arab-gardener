import { createFileRoute } from "@tanstack/react-router";
import { Wheat } from "lucide-react";
import { fodderGuide } from "@/data/guides-fodder";
import { fodderVideos } from "@/data/videos";
import { GuidePage } from "@/components/guide-page";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/fodder")({
  head: () => ({
    meta: [
      { title: "زراعة الأعلاف — البرسيم والشعير المستنبت | المزارع الذكي" },
      {
        name: "description",
        content:
          "دليل الأعلاف الخضراء: البرسيم الحجازي والذرة العلفية والرودس، الشعير المستنبت في 8 أيام، الحش والتخزين والسيلاج، وفيديوهات تعليمية.",
      },
      { property: "og:title", content: "زراعة الأعلاف والشعير المستنبت" },
      {
        property: "og:description",
        content: "أعلاف خضراء أرخص وأعلى بروتين لماشيتك: زراعة، حش، تخزين وسيلاج.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Fodder,
});

function Fodder() {
  const { t } = useI18n();
  return (
    <GuidePage
      cacheKey="fodder"
      guides={fodderGuide}
      icon={<Wheat className="size-7 text-primary" />}
      title={t("fodder.title")}
      subtitle={t("fodder.subtitle")}
      videos={fodderVideos}
    />
  );
}
