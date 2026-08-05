import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Languages, ChevronLeft, Leaf } from "lucide-react";
import { plants } from "@/data/plants";
import { useFavorites, useProfile } from "@/hooks/use-app-store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "حسابي وإعداداتي | المزارع الذكي" },
      {
        name: "description",
        content: "اسمك، مدينتك المحفوظة، نباتاتك المفضلة، وإعدادات الموقع واللغة.",
      },
      { property: "og:title", content: "حسابي | المزارع الذكي" },
      { property: "og:description", content: "إدارة مدينتك ونباتاتك المفضلة وإعداداتك." },
    ],
  }),
  component: Account;
});

function Account() {
  const { profile, save } = useProfile();
  const { ids } = useFavorites();
  const [editing, setEditing] = useState(false);
  const [city, setCity] = useState(profile.city);

  const favorites = plants.filter((p) => ids.includes(p.id));

  return (
    <main className="px-4 pt-8">
      <h1 className="font-display text-2xl font-extrabold text-foreground">حسابي</h1>

      <div className="surface-card mt-4 flex items-center gap-4 p-4">
        <span className="grid size-14 place-items-center rounded-full bg-primary/12 text-2xl">
          🌱
        </span>
        <div>
          <p className="font-display text-lg font-bold text-foreground">{profile.name}</p>
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5 text-primary" />
            {profile.city}
          </p>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 font-display text-base font-bold text-foreground">
          نباتاتي المفضلة
        </h2>
        <div className="surface-card divide-y divide-border p-1">
          {favorites.map((p) => (
            <Link
              key={p.id}
              to="/plants/$plantId"
              params={{ plantId: p.id }}
              className="flex items-center justify-between px-3 py-3"
            >
              <span className="flex items-center gap-3 text-sm font-bold text-foreground">
                <span className="text-xl">{p.emoji}</span>
                {p.nameAr}
              </span>
              <ChevronLeft className="size-4 text-muted-foreground" />
            </Link>
          ))}
          {favorites.length === 0 && (
            <p className="flex items-center gap-2 px-3 py-4 text-sm text-muted-foreground">
              <Leaf className="size-4 text-gold" />
              لا توجد نباتات مفضلة بعد.
            </p>
          )}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 font-display text-base font-bold text-foreground">الإعدادات</h2>
        <div className="surface-card p-2">
          <div className="px-3 py-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
                <MapPin className="size-4 text-primary" />
                تغيير الموقع
              </span>
              <button
                type="button"
                onClick={() => {
                  if (editing) save({ ...profile, city });
                  setEditing(!editing);
                }}
                className="rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold text-secondary-foreground"
              >
                {editing ? "حفظ" : "تعديل"}
              </button>
            </div>
            {editing && (
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-3 w-full rounded-xl border border-gold/40 bg-background px-3 py-2 text-sm outline-none"
                placeholder="المدينة، الدولة"
              />
            )}
          </div>
          <div className="gold-divider" />
          <div className="flex items-center justify-between px-3 py-3">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
              <Languages className="size-4 text-gold-ink" />
              تغيير اللغة
            </span>
            <span className="text-[11px] font-semibold text-muted-foreground">
              العربية (قريباً)
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
