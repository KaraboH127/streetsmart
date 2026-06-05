import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ShoppingBag, Wrench, CalendarDays, Megaphone, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/post")({
  head: () => ({ meta: [{ title: "Post something — NeighbourHub" }] }),
  component: PostPage,
});

const kinds = [
  { id: "item", label: "Sell an item", icon: ShoppingBag, tone: "bg-primary-container text-on-primary-container" },
  { id: "service", label: "Offer a service", icon: Wrench, tone: "bg-secondary-container text-on-secondary-container" },
  { id: "event", label: "Create an event", icon: CalendarDays, tone: "bg-tertiary-container text-on-tertiary-container" },
  { id: "post", label: "Community post", icon: Megaphone, tone: "bg-primary-container text-on-primary-container" },
];

function PostPage() {
  const navigate = useNavigate();
  const [kind, setKind] = useState<string | null>(null);

  return (
    <AppShell>
      <section className="mx-auto max-w-2xl px-4 md:px-8 pt-4 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Post something</h1>
        <p className="text-muted-foreground mt-1">Share with your neighbourhood</p>

        {!kind ? (
          <div className="mt-6 grid grid-cols-2 gap-3">
            {kinds.map((k) => {
              const Icon = k.icon;
              return (
                <button
                  key={k.id}
                  onClick={() => setKind(k.id)}
                  className={`rounded-3xl p-6 text-left ${k.tone} hover:shadow-elevation-2 active:scale-[0.98] transition`}
                >
                  <span className="inline-flex items-center justify-center size-12 rounded-2xl bg-surface-bright/60 mb-4">
                    <Icon className="size-5" />
                  </span>
                  <div className="font-medium">{k.label}</div>
                </button>
              );
            })}
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/marketplace" }); }}
            className="mt-6 grid gap-4"
          >
            <Field label="Title">
              <input className="m3-input" placeholder="What are you posting?" required />
            </Field>
            <Field label="Description">
              <textarea rows={4} className="m3-input" placeholder="Tell your neighbours more…" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Price (optional)">
                <input className="m3-input" placeholder="$" />
              </Field>
              <Field label="Category">
                <select className="m3-input">
                  <option>Electronics</option><option>Furniture</option><option>Clothing</option>
                  <option>Vehicles</option><option>Home</option><option>Sports</option><option>Other</option>
                </select>
              </Field>
            </div>

            <label className="rounded-3xl bg-surface-container-low border-2 border-dashed border-outline-variant p-8 text-center cursor-pointer hover:bg-surface-container transition">
              <ImageIcon className="size-6 mx-auto text-muted-foreground" />
              <div className="mt-2 font-medium">Add photos</div>
              <div className="text-xs text-muted-foreground">Tap to upload from your device</div>
              <input type="file" multiple className="sr-only" />
            </label>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setKind(null)}
                className="flex-1 h-14 rounded-full bg-surface-container-high hover:bg-surface-container-highest font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 h-14 rounded-full bg-primary text-primary-foreground font-medium shadow-elevation-2 hover:brightness-105"
              >
                Publish
              </button>
            </div>
          </form>
        )}
      </section>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
