import { useCallback, useEffect, useState } from "react";

const KEY = "smart-farmer:favorites";
const PROFILE_KEY = "smart-farmer:profile";

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

/** المفضلة محفوظة محلياً — TODO(API): انقلها لقاعدة بيانات المستخدم لاحقاً */
export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(read());
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { ids, toggle, isFavorite: (id: string) => ids.includes(id) };
}

export interface Profile {
  name: string;
  city: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>({
    name: "أبو ناصر",
    city: "الرياض، السعودية",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) setProfile(JSON.parse(raw) as Profile);
    } catch {
      /* ignore */
    }
  }, []);

  const save = useCallback((next: Profile) => {
    setProfile(next);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  }, []);

  return { profile, save };
}
