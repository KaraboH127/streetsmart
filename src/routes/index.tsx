import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { listings, posts } from "@/lib/mock-data";
import {
  ShoppingBag, Wrench, HandHeart, CalendarDays, Megaphone, Briefcase,
  MapPin, ArrowRight, Search, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeighbourHub — Everything happening in your neighbourhood" },
      { name: "description", content: "Buy, sell, discover services, find local opportunities, and connect with your community." },
      { property: "og:title", content: "NeighbourHub" },
      { property: "og:description", content: "Your local community marketplace." },
    ],
  }),
  component: Home,
});

const quickActions = [
  { to: "/post", label: "Sell an Item", icon: ShoppingBag, tone: "primary" },
  { to: "/post", label: "Offer a Service", icon: Wrench, tone: "secondary" },
  { to: "/community", label: "Find Help", icon: HandHeart, tone: "tertiary" },
  { to: "/events", label: "Browse Events", icon: CalendarDays, tone: "primary" },
  { to: "/community", label: "Community Notices", icon: Megaphone, tone: "secondary" },
  { to: "/marketplace", label: "Local Jobs", icon: Briefcase, tone: "tertiary" },
] as const;

const toneClass: Record<string, string> = {
  primary: "bg-primary-container text-on-primary-container",
  secondary: "bg-secondary-container text-on-secondary-container",
  tertiary: "bg-tertiary-container text-on-tertiary-container",
};

function Home() {
  const nearby = listings.slice(0, 8);
  const feed = posts.slice(0, 6);

  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="blob -top-20 -left-10 size-72 bg-primary/40" />
        <div className="blob top-10 right-0 size-80 bg-tertiary/40" />
        <div className="blob top-40 left-1/3 size-72 bg-secondary/60" />

        <div className="relative mx-auto max-w-6xl px-4 md:px-8 pt-6 pb-10 md:pt-14 md:pb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1.5 text-xs text-muted-foreground mb-5">
            <MapPin className="size-3.5" />
            Greenpoint · within 5 km
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground max-w-3xl">
            Everything happening in your{" "}
            <span className="text-primary">neighbourhood.</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
            Buy, sell, discover services, find local opportunities, and connect with your community.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-primary text-primary-foreground font-medium shadow-elevation-2 hover:brightness-105 active:scale-[0.98] transition"
            >
              Browse Listings <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/post"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-surface-container-high text-foreground font-medium hover:bg-surface-container-highest transition"
            >
              <Sparkles className="size-4" /> Post Something
            </Link>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-2xl">
            <div className="flex items-center gap-3 rounded-full bg-surface-container-high pl-5 pr-2 h-14 shadow-elevation-1">
              <Search className="size-5 text-muted-foreground" />
              <input
                aria-label="Search NeighbourHub"
                placeholder="Search for items, services, events…"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button className="h-10 px-5 rounded-full bg-primary text-primary-foreground font-medium hover:brightness-105">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 mt-2">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Quick actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((q) => {
            const Icon = q.icon;
            return (
              <Link
                key={q.label}
                to={q.to}
                className={`group rounded-3xl p-5 ${toneClass[q.tone]} hover:shadow-elevation-2 active:scale-[0.98] transition`}
              >
                <span className="inline-flex items-center justify-center size-11 rounded-2xl bg-surface-bright/60 mb-4">
                  <Icon className="size-5" />
                </span>
                <div className="font-medium">{q.label}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Nearby listings */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 mt-10">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Nearby listings</h2>
            <p className="text-sm text-muted-foreground">Fresh finds within 5 km of you</p>
          </div>
          <Link to="/marketplace" className="text-sm text-primary font-medium hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {nearby.map((l) => (
            <Link
              key={l.id}
              to="/marketplace/$id"
              params={{ id: l.id }}
              className="group rounded-3xl bg-surface-container-low overflow-hidden hover:shadow-elevation-2 transition"
            >
              <div className="aspect-square overflow-hidden bg-surface-container">
                <img
                  src={l.image}
                  alt={l.title}
                  loading="lazy"
                  className="size-full object-cover group-hover:scale-[1.03] transition duration-500"
                />
              </div>
              <div className="p-3">
                <div className="text-sm font-medium truncate">{l.title}</div>
                <div className="mt-0.5 text-base font-semibold text-foreground">${l.price}</div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="truncate">{l.category}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{l.distance}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Community feed */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 mt-12">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">From your community</h2>
            <p className="text-sm text-muted-foreground">Announcements, requests & recommendations</p>
          </div>
          <Link to="/community" className="text-sm text-primary font-medium hover:underline">
            Open board
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {feed.map((p) => (
            <article
              key={p.id}
              className="rounded-3xl bg-surface-container-low p-5 hover:shadow-elevation-2 transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={p.authorAvatar} alt="" className="size-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-medium">{p.author}</div>
                  <div className="text-xs text-muted-foreground">{p.time} · {p.type}</div>
                </div>
                <PostTypePill type={p.type} className="ml-auto" />
              </div>
              <h3 className="font-semibold text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{p.body}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

export function PostTypePill({ type, className = "" }: { type: string; className?: string }) {
  const map: Record<string, string> = {
    announcement: "bg-secondary-container text-on-secondary-container",
    recommendation: "bg-tertiary-container text-on-tertiary-container",
    request: "bg-primary-container text-on-primary-container",
    alert: "bg-destructive/15 text-destructive",
  };
  return (
    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full capitalize ${map[type] ?? "bg-surface-container"} ${className}`}>
      {type}
    </span>
  );
}
