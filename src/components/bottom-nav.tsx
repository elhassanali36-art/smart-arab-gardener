import { Link } from "@tanstack/react-router";
import { Home, Sprout, Search, Heart, User } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const items = [
  { to: "/", key: "nav.home", icon: Home },
  { to: "/expert", key: "nav.expert", icon: Sprout },
  { to: "/explore", key: "nav.explore", icon: Search },
  { to: "/favorites", key: "nav.favorites", icon: Heart },
  { to: "/account", key: "nav.account", icon: User },
] as const;

export function BottomNav() {
  const { t } = useI18n();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-card/95 backdrop-blur">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-1 py-1.5">
        {items.map(({ to, key, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-semibold text-muted-foreground transition-colors data-[status=active]:bg-primary/10 data-[status=active]:text-primary"
            >
              <Icon className="size-5" strokeWidth={2} />
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
