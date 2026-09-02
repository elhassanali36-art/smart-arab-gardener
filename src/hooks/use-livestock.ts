import { useCallback, useEffect, useState } from "react";
import { demoAnimals, type Animal } from "@/data/livestock";

const KEY = "smart-farmer:livestock";

/** سجل الحيوانات محفوظ محلياً — TODO(API): انقله لقاعدة بيانات المستخدم لاحقاً */
export function useLivestock() {
  const [animals, setAnimals] = useState<Animal[]>(demoAnimals);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setAnimals(JSON.parse(raw) as Animal[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: Animal[]) => {
    setAnimals(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const addAnimal = useCallback(
    (animal: Omit<Animal, "id">) => {
      persist([{ ...animal, id: `a-${Date.now()}` }, ...animals]);
    },
    [animals, persist],
  );

  const updateAnimal = useCallback(
    (id: string, patch: Partial<Omit<Animal, "id">>) => {
      persist(animals.map((a) => (a.id === id ? { ...a, ...patch } : a)));
    },
    [animals, persist],
  );

  const removeAnimal = useCallback(
    (id: string) => persist(animals.filter((a) => a.id !== id)),
    [animals, persist],
  );

  const resetDemo = useCallback(() => persist(demoAnimals), [persist]);

  return { animals, ready, addAnimal, updateAnimal, removeAnimal, resetDemo };
}
