import { Link } from "@tanstack/react-router";
import { Home, Search, Heart, User } from "lucide-react";

const items = [
  { to: "/", label: "الرئيسية", icon: Home },
  { to: "/explore", label: "استكشاف", icon: Search },
  { to: "/favorites", label: "مفضلتي", icon: Heart },
  { to: "/account", label: "حسابي", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-card/95 backdrop-blur">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold text-muted-foreground transition-colors data-[status=active]:bg-primary/10 data-[status=active]:text-primary"
            >
              <Icon className="size-5" strokeWidth={2} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
