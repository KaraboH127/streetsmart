import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { getListing, getSimilar } from "@/lib/mock-data";
import { MapPin, Heart, Share2, ShieldCheck, MessageCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/marketplace/$id")({
  head: ({ params }) => {
    const l = getListing(params.id);
    return {
      meta: [
        { title: l ? `${l.title} — NeighbourHub` : "Listing — NeighbourHub" },
        { name: "description", content: l?.description ?? "Local marketplace listing." },
        { property: "og:image", content: l?.image ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const l = getListing(params.id);
    if (!l) throw notFound();
    return { listing: l, similar: getSimilar(params.id) };
  },
  component: Detail,
});

function Detail() {
  const { listing, similar } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const gallery = [listing.image, listing.image.replace(/\/\d+\/\d+$/, "/600/700"), listing.image.replace(/\/\d+\/\d+$/, "/700/500")];

  return (
    <AppShell>
      <section className="mx-auto max-w-6xl px-4 md:px-8 pt-4">
        <Link to="/marketplace" className="inline-flex items-center gap-2 h-10 px-3 rounded-full hover:bg-surface-container-high text-sm">
          <ArrowLeft className="size-4" /> Back
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 md:px-8 mt-2 grid md:grid-cols-5 gap-6 md:gap-10">
        {/* Gallery */}
        <div className="md:col-span-3">
          <div className="aspect-square md:aspect-[5/4] rounded-3xl overflow-hidden bg-surface-container">
            <img src={gallery[active]} alt={listing.title} className="size-full object-cover" />
          </div>
          <div className="mt-3 flex gap-2">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`size-16 rounded-2xl overflow-hidden border-2 ${
                  active === i ? "border-primary" : "border-transparent"
                }`}
                aria-label={`Image ${i + 1}`}
              >
                <img src={g} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="md:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-medium text-muted-foreground">{listing.category}</div>
              <h1 className="text-2xl md:text-3xl font-semibold mt-1">{listing.title}</h1>
              <div className="text-3xl font-bold text-primary mt-2">${listing.price}</div>
            </div>
            <div className="flex gap-2">
              <button aria-label="Save" className="size-11 rounded-full bg-surface-container-high inline-flex items-center justify-center hover:bg-surface-container-highest">
                <Heart className="size-5" />
              </button>
              <button aria-label="Share" className="size-11 rounded-full bg-surface-container-high inline-flex items-center justify-center hover:bg-surface-container-highest">
                <Share2 className="size-5" />
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-3xl bg-surface-container-low p-4 flex items-center gap-3">
            <img src={listing.sellerAvatar} alt="" className="size-12 rounded-full object-cover" />
            <div className="flex-1">
              <div className="font-medium">{listing.seller}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="size-3.5" /> Verified neighbour
              </div>
            </div>
            <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
              <MapPin className="size-3.5" /> {listing.location}
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-sm font-semibold text-muted-foreground">Description</h2>
            <p className="mt-2 text-foreground leading-relaxed">{listing.description}</p>
          </div>

          <div className="mt-5 rounded-3xl overflow-hidden bg-surface-container-low aspect-[16/9] relative">
            <img
              src={`https://picsum.photos/seed/map-${listing.id}/800/450`}
              alt="Approximate location"
              className="size-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-surface px-4 py-2 text-sm inline-flex items-center gap-2 shadow-elevation-2">
                <MapPin className="size-4 text-primary" /> {listing.distance} away · {listing.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 md:px-8 mt-10">
          <h2 className="text-xl font-semibold mb-4">Similar listings</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {similar.map((l: typeof similar[number]) => (
              <Link
                key={l.id}
                to="/marketplace/$id"
                params={{ id: l.id }}
                className="rounded-3xl bg-surface-container-low overflow-hidden hover:shadow-elevation-2 transition"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={l.image} alt={l.title} loading="lazy" className="size-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium truncate">{l.title}</div>
                  <div className="text-sm font-semibold mt-0.5">${l.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sticky contact */}
      <div className="fixed inset-x-0 bottom-16 md:bottom-0 z-20 bg-surface/95 backdrop-blur border-t border-outline-variant">
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-3 flex items-center gap-3">
          <div className="hidden md:block flex-1">
            <div className="text-sm text-muted-foreground">Price</div>
            <div className="text-xl font-semibold">${listing.price}</div>
          </div>
          <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-primary text-primary-foreground font-medium shadow-elevation-2 hover:brightness-105 active:scale-[0.99] transition">
            <MessageCircle className="size-5" />
            Contact Seller
          </button>
        </div>
      </div>
    </AppShell>
  );
}
