import { Link, useLocation } from "@tanstack/react-router";
import { Home, ShoppingBag, Wrench, CalendarDays, User, Plus } from "lucide-react";
import type { ReactNode } from "react";

type Tab = { to: string; label: string; icon: typeof Home; exact?: boolean };
const tabs: Tab[] = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/marketplace", label: "Market", icon: ShoppingBag },
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/profile", label: "Profile", icon: User },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <TopBar />
      <main id="main" className="flex-1 pb-32 md:pb-12">
        {children}
      </main>

      {/* FAB */}
      <Link
        to="/post"
        aria-label="Post something"
        className="fixed right-5 bottom-24 md:bottom-8 z-40 inline-flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-5 h-14 shadow-elevation-3 hover:brightness-105 active:scale-[0.98] transition"
      >
        <Plus className="size-5" strokeWidth={2.5} />
        <span className="font-medium">Post</span>
      </Link>

      {/* Bottom nav (mobile) */}
      <nav
        aria-label="Primary"
        className="md:hidden fixed inset-x-0 bottom-0 z-30 bg-surface-container/95 backdrop-blur border-t border-outline-variant"
      >
        <ul className="grid grid-cols-5">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
            return (
              <li key={t.to}>
                <Link
                  to={t.to as any}
                  className="flex flex-col items-center justify-center gap-1 py-2 min-h-[64px]"
                >
                  <span
                    className={`flex items-center justify-center h-8 w-16 rounded-full transition-colors ${
                      active ? "bg-secondary-container text-on-secondary-container" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
                  </span>
                  <span className={`text-[11px] ${active ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {t.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center size-9 rounded-2xl bg-primary text-primary-foreground font-bold">
            N
          </span>
          <span className="text-lg font-semibold tracking-tight">NeighbourHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to as any}
              activeOptions={{ exact: t.exact }}
              className="px-4 h-10 inline-flex items-center rounded-full text-sm text-muted-foreground hover:bg-surface-container-high hover:text-foreground transition data-[status=active]:bg-secondary-container data-[status=active]:text-on-secondary-container data-[status=active]:font-medium"
            >
              {t.label}
            </Link>
          ))}
          <Link
            to="/community"
            className="px-4 h-10 inline-flex items-center rounded-full text-sm text-muted-foreground hover:bg-surface-container-high hover:text-foreground transition data-[status=active]:bg-secondary-container data-[status=active]:text-on-secondary-container data-[status=active]:font-medium"
          >
            Community
          </Link>
        </nav>

        <Link
          to="/profile"
          aria-label="Your profile"
          className="size-10 rounded-full bg-tertiary-container text-on-tertiary-container inline-flex items-center justify-center font-semibold"
        >
          A
        </Link>
      </div>
    </header>
  );
}
