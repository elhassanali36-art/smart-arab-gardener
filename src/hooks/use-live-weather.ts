import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getLiveWeather, type LiveWeather } from "@/lib/weather.functions";
import { DEFAULT_CITY, RIYADH_COORDS } from "@/data/environment";

export interface Coords {
  lat: number;
  lon: number;
  auto: boolean;
}

/** تحديد الموقع تلقائياً من المتصفح مع الرجوع للرياض عند رفض الإذن */
export function useAutoLocation() {
  const [coords, setCoords] = useState<Coords>({ ...RIYADH_COORDS, auto: false });
  const [status, setStatus] = useState<"idle" | "locating" | "granted" | "denied">("idle");

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("denied");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude, auto: true });
        setStatus("granted");
      },
      () => setStatus("denied"),
      { timeout: 8000, maximumAge: 600000 },
    );
  }, []);

  return { coords, status };
}

/** الطقس الحقيقي للموقع المحدد تلقائياً */
export function useLiveWeather() {
  const { coords, status } = useAutoLocation();
  const fetchWeather = useServerFn(getLiveWeather);

  const query = useQuery({
    queryKey: ["weather", coords.lat.toFixed(2), coords.lon.toFixed(2)],
    queryFn: () => fetchWeather({ data: { lat: coords.lat, lon: coords.lon } }),
    staleTime: 15 * 60 * 1000,
  });

  const weather: LiveWeather | undefined = query.data;
  const city = coords.auto ? (weather?.city ?? "موقعك الحالي") : DEFAULT_CITY;

  return { weather, city, isLoading: query.isLoading, locationStatus: status };
}
