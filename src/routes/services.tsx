import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { services } from "@/lib/mock-data";
import { Search, Star, MapPin, MessageCircle } from "lucide-react";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Local Services — NeighbourHub" },
      { name: "description", content: "Plumbers, tutors, cleaners and more — trusted by your neighbours." },
    ],
  }),
  component: Services,
});

const types = ["All", "Plumber", "Electrician", "Maths Tutor", "Web Developer", "Cleaner", "Gardener", "Dog Walker", "Handyman", "Photographer", "Yoga Instructor"];

function Services() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");

  const filtered = useMemo(() => {
    let r = services;
    if (type !== "All") r = r.filter((s) => s.service === type);
    if (q.trim()) {
      const s = q.toLowerCase();
      r = r.filter((x) => x.name.toLowerCase().includes(s) || x.service.toLowerCase().includes(s));
    }
    return r;
  }, [q, type]);

  return (
    <AppShell>
      <section className="mx-auto max-w-6xl px-4 md:px-8 pt-4 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Local services</h1>
        <p className="text-muted-foreground mt-1">Trusted help from your neighbours</p>

        <div className="mt-5 flex items-center gap-3 rounded-full bg-surface-container-high pl-5 pr-2 h-14">
          <Search className="size-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or service"
            className="flex-1 bg-transparent outline-none"
          />
        </div>

        <div className="mt-4 -mx-4 px-4 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`whitespace-nowrap h-10 px-4 rounded-full border text-sm transition ${
                type === t
                  ? "bg-secondary-container text-on-secondary-container border-transparent font-medium"
                  : "border-outline-variant hover:bg-surface-container-high"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {filtered.map((s) => (
            <article key={s.id} className="rounded-3xl bg-surface-container-low p-5 hover:shadow-elevation-2 transition flex flex-col">
              <div className="flex items-center gap-4">
                <img src={s.avatar} alt="" className="size-14 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{s.name}</div>
                  <div className="text-sm text-primary font-medium">{s.service}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{s.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1">
                  <Star className="size-4 fill-tertiary text-tertiary" />
                  <span className="font-medium">{s.rating}</span>
                  <span className="text-muted-foreground">({s.reviews})</span>
                </span>
                <span className="text-muted-foreground inline-flex items-center gap-1">
                  <MapPin className="size-3.5" /> {s.distance}
                </span>
              </div>
              <button className="mt-4 h-11 rounded-full bg-primary-container text-on-primary-container font-medium inline-flex items-center justify-center gap-2 hover:brightness-105">
                <MessageCircle className="size-4" /> Message
              </button>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
