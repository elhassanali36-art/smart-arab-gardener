/**
 * الموقع والمناخ (بيانات وهمية)
 * ---------------------------------------------------------------------------
 * TODO(API): اربط هنا خدمة الموقع الجغرافي الحقيقية
 *   - المتصفح: navigator.geolocation.getCurrentPosition()
 *   - أو خدمة IP Geolocation
 * TODO(API): اربط هنا خدمة طقس حقيقية (مثال: OpenWeatherMap / Open-Meteo)
 *   استبدل getWeather() بنداء fetch إلى API الطقس مع مفتاح محفوظ في الأسرار،
 *   وحافظ على نفس شكل النوع `Weather` حتى تعمل الواجهات دون تعديل.
 */

export interface Weather {
  tempC: number;
  condition: string;
  humidity: number;
  icon: "sun" | "cloud" | "rain";
}

export const DEFAULT_CITY = "الرياض، السعودية";
/** إحداثيات الرياض — تُستخدم عند رفض إذن الموقع */
export const RIYADH_COORDS = { lat: 24.7136, lon: 46.6753 };

/** بيانات احتياطية فقط — الطقس الحقيقي في src/lib/weather.functions.ts */
export function getWeather(): Weather {
  return { tempC: 34, condition: "مشمس وجاف", humidity: 18, icon: "sun" };
}


const AR_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const AR_DAYS = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

/** تاريخ اليوم الفعلي منسّقاً بالعربية */
export function formatToday(d: Date = new Date()) {
  return `${AR_DAYS[d.getDay()]} ${d.getDate()} ${AR_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function shortToday(d: Date = new Date()) {
  return `${d.getDate()} ${AR_MONTHS[d.getMonth()]}`;
}
