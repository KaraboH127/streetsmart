import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { listings } from "@/lib/mock-data";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/marketplace/")({
  head: () => ({
    meta: [
      { title: "Marketplace — NeighbourHub" },
      { name: "description", content: "Browse items for sale near you." },
    ],
  }),
  component: Marketplace,
});

const categories = ["All", "Electronics", "Furniture", "Clothing", "Vehicles", "Home", "Sports", "Other"];
const sorts = ["Newest", "Price: low to high", "Price: high to low", "Closest"];

function Marketplace() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState(sorts[0]);

  const filtered = useMemo(() => {
    let r = listings;
    if (cat !== "All") r = r.filter((l) => l.category === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      r = r.filter((l) => l.title.toLowerCase().includes(s));
    }
    if (sort === "Price: low to high") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "Closest") r = [...r].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    return r;
  }, [cat, q, sort]);

  return (
    <AppShell>
      <section className="mx-auto max-w-6xl px-4 md:px-8 pt-4 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Marketplace</h1>
        <p className="text-muted-foreground mt-1">{filtered.length} items near you</p>

        {/* Search */}
        <div className="mt-5 flex items-center gap-3 rounded-full bg-surface-container-high pl-5 pr-2 h-14">
          <Search className="size-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search items"
            className="flex-1 bg-transparent outline-none"
          />
          <button className="size-10 rounded-full bg-surface-container-highest inline-flex items-center justify-center" aria-label="Filters">
            <SlidersHorizontal className="size-5" />
          </button>
        </div>

        {/* Categories chips */}
        <div className="mt-4 -mx-4 px-4 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap h-10 px-4 rounded-full border text-sm transition ${
                cat === c
                  ? "bg-secondary-container text-on-secondary-container border-transparent font-medium"
                  : "border-outline-variant text-foreground hover:bg-surface-container-high"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Sort</div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 px-4 rounded-full bg-surface-container text-sm outline-none"
          >
            {sorts.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Grid */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((l) => (
            <Link
              key={l.id}
              to="/marketplace/$id"
              params={{ id: l.id }}
              className="group rounded-3xl bg-surface-container-low overflow-hidden hover:shadow-elevation-2 transition"
            >
              <div className="aspect-square overflow-hidden bg-surface-container">
                <img src={l.image} alt={l.title} loading="lazy" className="size-full object-cover group-hover:scale-[1.03] transition duration-500" />
              </div>
              <div className="p-3">
                <div className="text-sm font-medium truncate">{l.title}</div>
                <div className="mt-0.5 text-base font-semibold">${l.price}</div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="truncate">{l.seller}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{l.distance}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
