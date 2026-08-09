import { MapPin, CalendarDays, Sun, CloudSun, CloudRain, Cloud, Droplets, Wind, LocateFixed } from "lucide-react";
import { shortToday } from "@/data/environment";
import { seasonForMonth, seasonLabels } from "@/data/plants";
import { useLiveWeather } from "@/hooks/use-live-weather";

const icons = { sun: Sun, cloud: Cloud, rain: CloudRain } as const;

/** شريحة صغيرة تعرض الموقع والتاريخ والمناخ الحقيقي */
export function EnvStrip() {
  const { weather, city } = useLiveWeather();
  const season = seasonForMonth(new Date().getMonth() + 1);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-gold/25 bg-card px-3 py-2 text-[11px] font-semibold text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <MapPin className="size-3.5 text-primary" />
        {city}
      </span>
      <span className="text-gold">•</span>
      <span className="inline-flex items-center gap-1">
        <CalendarDays className="size-3.5 text-primary" />
        {shortToday()}
      </span>
      <span className="text-gold">•</span>
      <span className="inline-flex items-center gap-1">
        <CloudSun className="size-3.5 text-primary" />
        {weather ? `${weather.tempC}° ${weather.condition}` : "جاري قراءة الطقس…"}
      </span>
      <span className="text-gold">•</span>
      <span className="text-primary">موسم {seasonLabels[season]}</span>
    </div>
  );
}

/** شريط المناخ الكبير في الصفحة الرئيسية — بيانات حقيقية من خدمة الطقس */
export function WeatherBar() {
  const { weather, isLoading, locationStatus } = useLiveWeather();
  const Icon = icons[weather?.icon ?? "sun"];

  return (
    <div className="rounded-[20px] border border-gold/30 bg-primary/8 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-gold/20">
            <Icon className="size-5 text-gold-ink" />
          </span>
          <div>
            <p className="text-sm font-bold text-foreground">
              {isLoading ? "جاري تحديث الطقس…" : (weather?.condition ?? "غير متوفر")}
            </p>
            <p className="text-[11px] text-muted-foreground">حالة المناخ الآن</p>
          </div>
        </div>
        <div className="text-left">
          <p className="font-display text-xl font-extrabold text-primary">
            {weather ? `${weather.tempC}°C` : "--"}
          </p>
          <p className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Droplets className="size-3" />
            رطوبة {weather?.humidity ?? "--"}%
          </p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-3 border-t border-gold/20 pt-2 text-[11px] font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Wind className="size-3" />
          رياح {weather?.windKph ?? "--"} كم/س
        </span>
        <span className="inline-flex items-center gap-1">
          <LocateFixed className="size-3 text-primary" />
          {locationStatus === "granted"
            ? "تحديد تلقائي للموقع"
            : locationStatus === "locating"
              ? "جاري تحديد موقعك…"
              : "الموقع الافتراضي (الرياض)"}
        </span>
      </div>
    </div>
  );
}
