import { MapPin, CalendarDays, Sun, CloudSun, Droplets } from "lucide-react";
import { DEFAULT_CITY, getWeather, shortToday } from "@/data/environment";
import { seasonForMonth, seasonLabels } from "@/data/plants";

/** شريحة صغيرة تعرض الموقع والتاريخ والمناخ */
export function EnvStrip() {
  const weather = getWeather();
  const season = seasonForMonth(new Date().getMonth() + 1);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-gold/25 bg-card px-3 py-2 text-[11px] font-semibold text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <MapPin className="size-3.5 text-primary" />
        {DEFAULT_CITY}
      </span>
      <span className="text-gold">•</span>
      <span className="inline-flex items-center gap-1">
        <CalendarDays className="size-3.5 text-primary" />
        {shortToday()}
      </span>
      <span className="text-gold">•</span>
      <span className="inline-flex items-center gap-1">
        <CloudSun className="size-3.5 text-primary" />
        {weather.tempC}° {weather.condition}
      </span>
      <span className="text-gold">•</span>
      <span className="text-primary">موسم {seasonLabels[season]}</span>
    </div>
  );
}

/** شريط المناخ الكبير في الصفحة الرئيسية */
export function WeatherBar() {
  const weather = getWeather();
  return (
    <div className="flex items-center justify-between rounded-[20px] border border-gold/30 bg-primary/8 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-gold/20">
          <Sun className="size-5 text-gold-ink" />
        </span>
        <div>
          <p className="text-sm font-bold text-foreground">{weather.condition}</p>
          <p className="text-[11px] text-muted-foreground">حالة المناخ الآن</p>
        </div>
      </div>
      <div className="text-left">
        <p className="font-display text-xl font-extrabold text-primary">{weather.tempC}°C</p>
        <p className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <Droplets className="size-3" />
          رطوبة {weather.humidity}%
        </p>
      </div>
    </div>
  );
}
