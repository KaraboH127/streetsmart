import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { listings } from "@/lib/mock-data";
import { Star, MapPin, ShieldCheck, Settings } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — NeighbourHub" },
      { name: "description", content: "Your listings, reviews and community reputation." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const my = listings.slice(0, 6);
  return (
    <AppShell>
      <section className="mx-auto max-w-5xl px-4 md:px-8 pt-4 md:pt-8">
        <div className="rounded-3xl bg-gradient-to-br from-primary-container to-tertiary-container p-6 md:p-8 relative overflow-hidden">
          <div className="blob -right-10 -top-10 size-56 bg-primary/40" />
          <div className="relative flex items-center gap-5">
            <img
              src="https://i.pravatar.cc/200?u=amara"
              alt=""
              className="size-20 md:size-24 rounded-full object-cover ring-4 ring-surface"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-semibold">Amara Klein</h1>
              <div className="text-sm text-on-primary-container/80 inline-flex items-center gap-2 mt-1">
                <MapPin className="size-4" /> Greenpoint · Neighbour since 2023
              </div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-surface/70 backdrop-blur px-3 py-1 text-xs">
                <ShieldCheck className="size-3.5 text-primary" /> Verified neighbour
              </div>
            </div>
            <button aria-label="Settings" className="size-11 rounded-full bg-surface/70 backdrop-blur inline-flex items-center justify-center">
              <Settings className="size-5" />
            </button>
          </div>

          <div className="relative mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "Listings", value: "12" },
              { label: "Rating", value: "4.9" },
              { label: "Reviews", value: "47" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-surface/70 backdrop-blur p-3 text-center">
                <div className="text-xl font-semibold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Your listings</h2>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
            {my.map((l) => (
              <Link
                key={l.id}
                to="/marketplace/$id"
                params={{ id: l.id }}
                className="rounded-3xl bg-surface-container-low overflow-hidden hover:shadow-elevation-2 transition"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={l.image} alt={l.title} className="size-full object-cover" loading="lazy" />
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium truncate">{l.title}</div>
                  <div className="text-sm font-semibold mt-0.5">${l.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <div className="mt-3 grid gap-3">
            {[
              { name: "Liam O.", text: "Great seller, item exactly as described. Super friendly!", stars: 5 },
              { name: "Sofia M.", text: "Smooth pickup, would buy from again.", stars: 5 },
              { name: "Noah B.", text: "Quick to respond and very accommodating with timing.", stars: 4 },
            ].map((r, i) => (
              <article key={i} className="rounded-3xl bg-surface-container-low p-5">
                <div className="flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/100?u=rev${i}`} alt="" className="size-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{r.name}</div>
                    <div className="inline-flex items-center gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className={`size-3.5 ${k < r.stars ? "fill-tertiary text-tertiary" : "text-outline-variant"}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-foreground/80 text-sm">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
