import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { events } from "@/lib/mock-data";
import { CalendarDays, MapPin, Users, Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — NeighbourHub" },
      { name: "description", content: "Discover events happening in your neighbourhood." },
    ],
  }),
  component: Events,
});

const cats = ["All", "Market", "Workshop", "Sports", "Community", "Music", "Kids"];

function Events() {
  const [view, setView] = useState<"cards" | "calendar">("cards");
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? events : events.filter((e) => e.category === cat);

  return (
    <AppShell>
      <section className="mx-auto max-w-6xl px-4 md:px-8 pt-4 md:pt-8">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Events</h1>
            <p className="text-muted-foreground mt-1">What's happening this week</p>
          </div>
          <div className="inline-flex p-1 rounded-full bg-surface-container">
            {(["cards", "calendar"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 h-9 rounded-full text-sm capitalize transition ${
                  view === v ? "bg-secondary-container text-on-secondary-container font-medium" : "text-muted-foreground"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 -mx-4 px-4 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap h-10 px-4 rounded-full border text-sm transition ${
                cat === c
                  ? "bg-secondary-container text-on-secondary-container border-transparent font-medium"
                  : "border-outline-variant hover:bg-surface-container-high"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {view === "cards" ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((e) => (
              <article key={e.id} className="rounded-3xl bg-surface-container-low overflow-hidden hover:shadow-elevation-2 transition">
                <div className="aspect-[16/9] overflow-hidden bg-surface-container relative">
                  <img src={e.image} alt={e.title} loading="lazy" className="size-full object-cover" />
                  <span className="absolute top-3 left-3 rounded-full bg-surface/90 backdrop-blur px-3 py-1 text-xs font-medium">
                    {e.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{e.title}</h3>
                  <div className="mt-2 grid gap-1 text-sm text-muted-foreground">
                    <div className="inline-flex items-center gap-2"><CalendarDays className="size-4" /> {e.date}</div>
                    <div className="inline-flex items-center gap-2"><Clock className="size-4" /> {e.time}</div>
                    <div className="inline-flex items-center gap-2"><MapPin className="size-4" /> {e.location}</div>
                    <div className="inline-flex items-center gap-2"><Users className="size-4" /> {e.attendees} going</div>
                  </div>
                  <button className="mt-4 w-full h-11 rounded-full bg-primary text-primary-foreground font-medium hover:brightness-105">
                    RSVP
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <CalendarView />
        )}
      </section>
    </AppShell>
  );
}

function CalendarView() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const eventDays = new Set([2, 5, 9, 12, 14, 15, 18, 20, 21, 24, 27, 29]);
  return (
    <div className="mt-6 rounded-3xl bg-surface-container-low p-5">
      <div className="text-lg font-semibold mb-4">June 2026</div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const has = eventDays.has(d);
          return (
            <div
              key={d}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-sm ${
                has ? "bg-primary-container text-on-primary-container font-medium" : "bg-surface-container"
              }`}
            >
              {d}
              {has && <span className="mt-0.5 size-1.5 rounded-full bg-primary" />}
            </div>
          );
        })}
      </div>
      <div className="mt-5 text-sm text-muted-foreground">Tap a day to see events</div>
    </div>
  );
}
