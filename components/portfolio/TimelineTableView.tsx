"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProfileTimelineEntry } from "@/data/types";

interface TimelineTableViewProps {
  entries: ProfileTimelineEntry[];
}

const TRACK_LABELS: Record<string, string> = {
  work:      "Work",
  tech:      "Tech",
  research:  "Research",
  milestone: "Milestone",
};

const trackPill: Record<string, string> = {
  work:      "bg-emerald-50 text-emerald-700 border-emerald-200",
  tech:      "bg-blue-50 text-blue-700 border-blue-200",
  research:  "bg-amber-50 text-amber-700 border-amber-200",
  milestone: "bg-secondary text-foreground border-border",
};

const linkColor: Record<string, string> = {
  work:      "text-emerald-600 hover:text-emerald-700",
  tech:      "text-blue-600 hover:text-blue-700",
  research:  "text-amber-600 hover:text-amber-700",
  milestone: "text-primary hover:text-primary/80",
};

function getLinkHref(entry: ProfileTimelineEntry): string | null {
  if (!entry.slug || !entry.linkType) return null;
  if (entry.linkType === "work") return "/workex";
  if (entry.linkType === "case") return `/case/${entry.slug}`;
  if (entry.linkType === "project") return `/project/${entry.slug}`;
  return null;
}

function getLinkLabel(entry: ProfileTimelineEntry): string {
  if (entry.linkType === "work") return "Work History";
  if (entry.linkType === "case") return "Case Study";
  return "Project";
}

const ALL_TRACKS = ["work", "tech", "research", "milestone"] as const;

export default function TimelineTableView({ entries }: TimelineTableViewProps) {
  const [filter, setFilter] = useState<string | null>(null);

  const visible = filter ? entries.filter((e) => e.track === filter) : entries;

  return (
    <div>
      {/* Track filter chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setFilter(null)}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
            filter === null
              ? "bg-foreground text-background border-foreground"
              : "border-border text-muted-foreground hover:border-foreground/30"
          }`}
        >
          All ({entries.length})
        </button>
        {ALL_TRACKS.map((t) => {
          const count = entries.filter((e) => e.track === t).length;
          return (
            <button
              key={t}
              onClick={() => setFilter(filter === t ? null : t)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                filter === t
                  ? `${trackPill[t]} font-semibold`
                  : "border-border text-muted-foreground hover:border-foreground/30"
              }`}
            >
              {TRACK_LABELS[t]} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-16">Year</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-28">Period</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">Track</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-28">Link</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((entry, i) => {
              const href = getLinkHref(entry);
              return (
                <motion.tr
                  key={`${entry.year}-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors group"
                >
                  <td className="px-4 py-3 text-xs font-bold text-muted-foreground tabular-nums align-top">
                    {entry.year}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground align-top">
                    {entry.date ? <time dateTime={entry.date}>{entry.date}</time> : "—"}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wide ${trackPill[entry.track]}`}>
                      {TRACK_LABELS[entry.track]}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <p className="font-medium text-foreground text-sm leading-snug">{entry.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                      {entry.description}
                    </p>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {href ? (
                      <Link
                        href={href}
                        className={`inline-flex items-center gap-1 text-xs font-medium transition-colors ${linkColor[entry.track]}`}
                      >
                        {getLinkLabel(entry)}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="text-xs text-muted-foreground/40">—</span>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-muted-foreground/50 text-right">
        {visible.length} of {entries.length} events
      </p>
    </div>
  );
}
