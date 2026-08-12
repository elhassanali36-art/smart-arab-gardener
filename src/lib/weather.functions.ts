/**
 * ربط حقيقي بخدمة الطقس والموقع الجغرافي
 * ---------------------------------------------------------------------------
 * الطقس: Open-Meteo (مجاني بدون مفتاح)
 * اسم المدينة: BigDataCloud reverse geocoding (مجاني بدون مفتاح)
 * الإحداثيات تأتي من navigator.geolocation في المتصفح (تحديد تلقائي)،
 * وإن رُفض الإذن نستخدم إحداثيات الرياض الافتراضية.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export interface LiveWeather {
  tempC: number;
  condition: string;
  humidity: number;
  windKph: number;
  icon: "sun" | "cloud" | "rain";
  city: string;
  /** true إذا تعذّر جلب البيانات الحقيقية */
  fallback: boolean;
}

const WMO: Record<number, { label: string; icon: "sun" | "cloud" | "rain" }> = {
  0: { label: "صافٍ", icon: "sun" },
  1: { label: "صافٍ جزئياً", icon: "sun" },
  2: { label: "غائم جزئياً", icon: "cloud" },
  3: { label: "غائم", icon: "cloud" },
  45: { label: "ضباب", icon: "cloud" },
  48: { label: "ضباب متجمد", icon: "cloud" },
  51: { label: "رذاذ خفيف", icon: "rain" },
  53: { label: "رذاذ", icon: "rain" },
  55: { label: "رذاذ كثيف", icon: "rain" },
  61: { label: "مطر خفيف", icon: "rain" },
  63: { label: "مطر متوسط", icon: "rain" },
  65: { label: "مطر غزير", icon: "rain" },
  71: { label: "ثلج خفيف", icon: "rain" },
  80: { label: "زخات مطر", icon: "rain" },
  81: { label: "زخات مطر قوية", icon: "rain" },
  95: { label: "رعد وأمطار", icon: "rain" },
  96: { label: "رعد مع برد", icon: "rain" },
};

export const getLiveWeather = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z
      .object({
        lat: z.number().min(-90).max(90),
        lon: z.number().min(-180).max(180),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<LiveWeather> => {
    const { lat, lon } = data;
    const fallbackCity = "موقعك الحالي";

    try {
      const [weatherRes, placeRes] = await Promise.all([
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
            `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`,
        ),
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ar`,
        ).catch(() => null),
      ]);

      if (!weatherRes.ok) {
        throw new Error(`Open-Meteo failed [${weatherRes.status}]`);
      }

      const w = (await weatherRes.json()) as {
        current?: {
          temperature_2m?: number;
          relative_humidity_2m?: number;
          weather_code?: number;
          wind_speed_10m?: number;
        };
      };
      const current = w.current ?? {};
      const code = current.weather_code ?? 0;
      const mapped = WMO[code] ?? { label: "حالة غير معروفة", icon: "cloud" as const };

      let city = fallbackCity;
      if (placeRes && placeRes.ok) {
        const p = (await placeRes.json()) as {
          city?: string;
          locality?: string;
          principalSubdivision?: string;
          countryName?: string;
        };
        const place = p.city || p.locality || p.principalSubdivision;
        city = place ? `${place}${p.countryName ? `، ${p.countryName}` : ""}` : fallbackCity;
      }

      return {
        tempC: Math.round(current.temperature_2m ?? 0),
        condition: mapped.label,
        humidity: Math.round(current.relative_humidity_2m ?? 0),
        windKph: Math.round(current.wind_speed_10m ?? 0),
        icon: mapped.icon,
        city,
        fallback: false,
      };
    } catch (error) {
      console.error("weather fetch failed", error);
      return {
        tempC: 34,
        condition: "بيانات تقديرية",
        humidity: 18,
        windKph: 10,
        icon: "sun",
        city: fallbackCity,
        fallback: true,
      };
    }
  });

/**
 * تحديد الموقع من عنوان IP — يُستخدم عندما يرفض المتصفح إذن الموقع
 * أو عندما يكون التطبيق داخل إطار (iframe) لا يسمح بخدمة الموقع.
 */
export const getIpLocation = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ lat: number; lon: number; city: string; ok: boolean }> => {
    try {
      const res = await fetch("https://ipwho.is/?fields=latitude,longitude,city,country,success");
      if (!res.ok) throw new Error(`ipwho.is failed [${res.status}]`);
      const j = (await res.json()) as {
        success?: boolean;
        latitude?: number;
        longitude?: number;
        city?: string;
        country?: string;
      };
      if (!j.success || typeof j.latitude !== "number" || typeof j.longitude !== "number") {
        throw new Error("ipwho.is returned no coordinates");
      }
      return {
        lat: j.latitude,
        lon: j.longitude,
        city: [j.city, j.country].filter(Boolean).join("، ") || "موقعك الحالي",
        ok: true,
      };
    } catch (error) {
      console.error("ip location failed", error);
      return { lat: 24.7136, lon: 46.6753, city: "الرياض، السعودية", ok: false };
    }
  },
);
