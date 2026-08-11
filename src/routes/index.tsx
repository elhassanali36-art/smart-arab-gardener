import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  CalendarDays,
  Sprout,
  ArrowLeft,
  Search,
  Warehouse,
  Recycle,
} from "lucide-react";
import { formatToday } from "@/data/environment";
import { trendingSearches } from "@/data/plants";
import { WeatherBar } from "@/components/env-strip";
import { useLiveWeather } from "@/hooks/use-live-weather";
import { useProfile } from "@/hooks/use-app-store";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "المزارع الذكي — ماذا تزرع اليوم؟" },
      {
        name: "description",
        content:
          "اعرف ما يمكنك زراعته الآن حسب موقعك وتاريخ اليوم والمناخ، مع دليل زراعة عربي مبسّط للهواة والمزارعين الصغار.",
      },
      { property: "og:title", content: "المزارع الذكي — ماذا تزرع اليوم؟" },
      {
        property: "og:description",
        content: "اعرف ما يمكنك زراعته الآن حسب موقعك وتاريخ اليوم والمناخ، مع دليل زراعة عربي مبسّط للهواة والمزارعين الصغار.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { profile } = useProfile();
  const { city } = useLiveWeather();


  return (
    <main className="px-4 pt-8">
      <header className="mb-6">
        <p className="text-sm text-muted-foreground">أهلاً بك 👋</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold text-foreground">
          {profile.name}، هيّا نزرع شيئاً جديداً
        </h1>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <div className="surface-card p-4">
          <MapPin className="size-5 text-primary" />
          <p className="mt-3 text-[11px] font-semibold text-muted-foreground">الموقع الحالي</p>
          <p className="mt-0.5 text-sm font-bold text-foreground">{city}</p>
        </div>
        <div className="surface-card p-4">
          <CalendarDays className="size-5 text-gold-ink" />
          <p className="mt-3 text-[11px] font-semibold text-muted-foreground">تاريخ اليوم</p>
          <p className="mt-0.5 text-sm font-bold text-foreground">{formatToday()}</p>
        </div>
      </div>

      <div className="mt-3">
        <WeatherBar />
      </div>

      <Link
        to="/results"
        className="mt-6 flex w-full items-center justify-between rounded-[20px] bg-primary px-5 py-5 text-primary-foreground shadow-hero transition-transform active:scale-[0.99]"
      >
        <span className="flex items-center gap-3">
          <Sprout className="size-7" />
          <span className="font-display text-lg font-extrabold">
            ماذا يمكنني أن أزرع الآن؟
          </span>
        </span>
        <ArrowLeft className="size-5" />
      </Link>

      <section className="mt-4 grid gap-3">
        <Link
          to="/expert"
          className="surface-card flex items-center gap-3 p-4 transition-shadow hover:shadow-lifted"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10">
            <Sprout className="size-5 text-primary" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-bold text-foreground">
              اسأل الخبير عن أي نبات
            </span>
            <span className="block text-[11px] text-muted-foreground">
              زراعته، أسمدته، أمراضه وعلاجها — بعدة لغات
            </span>
          </span>
          <ArrowLeft className="size-4 text-muted-foreground" />
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <Link to="/greenhouse" className="surface-card p-4">
            <Warehouse className="size-5 text-primary" />
            <p className="mt-3 text-sm font-bold text-foreground">البيوت المحمية</p>
            <p className="text-[11px] text-muted-foreground">الإنشاء والفوائد</p>
          </Link>
          <Link to="/compost" className="surface-card p-4">
            <Recycle className="size-5 text-gold-ink" />
            <p className="mt-3 text-sm font-bold text-foreground">صناعة الكمبوست</p>
            <p className="text-[11px] text-muted-foreground">المواد والخطوات</p>
          </Link>
          <Link to="/hydroponics" className="surface-card p-4">
            <Droplets className="size-5 text-primary" />
            <p className="mt-3 text-sm font-bold text-foreground">الزراعة المائية</p>
            <p className="text-[11px] text-muted-foreground">بدون تربة ومياه أقل</p>
          </Link>
          <Link to="/vertical" className="surface-card p-4">
            <Columns3 className="size-5 text-gold-ink" />
            <p className="mt-3 text-sm font-bold text-foreground">الزراعة في أعمدة</p>
            <p className="text-[11px] text-muted-foreground">أبراج وجدران خضراء</p>
          </Link>
        </div>
      </section>


      <section className="mt-8">
        <h2 className="mb-3 font-display text-base font-bold text-foreground">
          الأكثر بحثاً هذا الأسبوع
        </h2>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((term) => (
            <Link
              key={term}
              to="/explore"
              search={{ q: term }}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-soft"
            >
              <Search className="size-3.5 text-primary" />
              {term}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
