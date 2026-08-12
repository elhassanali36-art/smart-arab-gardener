import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getIpLocation, getLiveWeather, type LiveWeather } from "@/lib/weather.functions";
import { DEFAULT_CITY, RIYADH_COORDS } from "@/data/environment";

export interface Coords {
  lat: number;
  lon: number;
  auto: boolean;
}

export type LocationStatus = "idle" | "locating" | "granted" | "ip" | "denied";

const MANUAL_KEY = "smart-farmer:coords";

type Manual = { lat: number; lon: number; city: string };

function readManual(): Manual | null {
  try {
    const raw = localStorage.getItem(MANUAL_KEY);
    return raw ? (JSON.parse(raw) as Manual) : null;
  } catch {
    return null;
  }
}

export function saveManualLocation(m: Manual) {
  localStorage.setItem(MANUAL_KEY, JSON.stringify(m));
}

export function clearManualLocation() {
  localStorage.removeItem(MANUAL_KEY);
}

/**
 * تحديد الموقع تلقائياً:
 * 1) موقع محفوظ يدوياً من صفحة حسابي
 * 2) navigator.geolocation (أدق)
 * 3) تحديد بالـ IP على السيرفر (يعمل حتى داخل الإطارات المدمجة)
 * 4) الرياض كخيار أخير
 */
export function useAutoLocation() {
  const [coords, setCoords] = useState<Coords>({ ...RIYADH_COORDS, auto: false });
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [manualCity, setManualCity] = useState<string | null>(null);
  const [needsIp, setNeedsIp] = useState(false);
  const fetchIp = useServerFn(getIpLocation);

  useEffect(() => {
    const manual = readManual();
    if (manual) {
      setCoords({ lat: manual.lat, lon: manual.lon, auto: true });
      setManualCity(manual.city);
      setStatus("granted");
      return;
    }
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setNeedsIp(true);
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude, auto: true });
        setStatus("granted");
      },
      () => setNeedsIp(true),
      { timeout: 8000, maximumAge: 600000 },
    );
  }, []);

  const ipQuery = useQuery({
    queryKey: ["ip-location"],
    queryFn: () => fetchIp(),
    enabled: needsIp,
    staleTime: 60 * 60 * 1000,
  });

  useEffect(() => {
    const data = ipQuery.data;
    if (!data) return;
    setCoords({ lat: data.lat, lon: data.lon, auto: data.ok });
    setStatus(data.ok ? "ip" : "denied");
  }, [ipQuery.data]);

  return { coords, status, manualCity };
}

/** الطقس الحقيقي للموقع المحدد تلقائياً */
export function useLiveWeather() {
  const { coords, status, manualCity } = useAutoLocation();
  const fetchWeather = useServerFn(getLiveWeather);

  const query = useQuery({
    queryKey: ["weather", coords.lat.toFixed(2), coords.lon.toFixed(2)],
    queryFn: () => fetchWeather({ data: { lat: coords.lat, lon: coords.lon } }),
    staleTime: 15 * 60 * 1000,
  });

  const weather: LiveWeather | undefined = query.data;
  const city = manualCity ?? (coords.auto ? (weather?.city ?? "موقعك الحالي") : DEFAULT_CITY);

  return { weather, city, isLoading: query.isLoading, locationStatus: status };
}

export type { LiveWeather };
