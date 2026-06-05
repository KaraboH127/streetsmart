import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { posts } from "@/lib/mock-data";
import { PostTypePill } from "./index";
import { Heart, MessageSquare, Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community Board — NeighbourHub" },
      { name: "description", content: "Local announcements, requests, recommendations and alerts." },
    ],
  }),
  component: Community,
});

const filters = ["All", "announcement", "request", "recommendation", "alert"] as const;

function Community() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = f === "All" ? posts : posts.filter((p) => p.type === f);

  return (
    <AppShell>
      <section className="mx-auto max-w-3xl px-4 md:px-8 pt-4 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Community board</h1>
        <p className="text-muted-foreground mt-1">The neighbourhood, in one place</p>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {filters.map((c) => (
            <button
              key={c}
              onClick={() => setF(c)}
              className={`whitespace-nowrap h-10 px-4 rounded-full border text-sm capitalize transition ${
                f === c
                  ? "bg-secondary-container text-on-secondary-container border-transparent font-medium"
                  : "border-outline-variant hover:bg-surface-container-high"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <button className="mt-4 w-full h-14 rounded-3xl bg-surface-container-low text-left px-5 text-muted-foreground hover:bg-surface-container transition inline-flex items-center gap-3">
          <Plus className="size-5 text-primary" />
          Share something with the neighbourhood…
        </button>

        <div className="mt-4 grid gap-3">
          {list.map((p) => (
            <article key={p.id} className="rounded-3xl bg-surface-container-low p-5 hover:shadow-elevation-2 transition">
              <div className="flex items-center gap-3">
                <img src={p.authorAvatar} alt="" className="size-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.author}</div>
                  <div className="text-xs text-muted-foreground">{p.time}</div>
                </div>
                <PostTypePill type={p.type} />
              </div>
              <h2 className="mt-3 font-semibold text-lg">{p.title}</h2>
              <p className="text-foreground/80 mt-1">{p.body}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <button className="inline-flex items-center gap-1.5 hover:text-foreground">
                  <Heart className="size-4" /> {p.likes}
                </button>
                <button className="inline-flex items-center gap-1.5 hover:text-foreground">
                  <MessageSquare className="size-4" /> {p.comments}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
