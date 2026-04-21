"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { ProfileTimelineEntry } from "@/data/types";

interface TimelineGridViewProps {
  entries: ProfileTimelineEntry[];
}

const TRACKS = [
  { key: "work",      label: "Work",      dot: "bg-emerald-500", header: "text-emerald-700", headerBg: "bg-emerald-50 border-emerald-200" },
  { key: "tech",      label: "Tech & Build", dot: "bg-blue-500",    header: "text-blue-700",    headerBg: "bg-blue-50 border-blue-200" },
  { key: "research",  label: "Research",  dot: "bg-amber-500",   header: "text-amber-700",   headerBg: "bg-amber-50 border-amber-200" },
  { key: "milestone", label: "Milestones", dot: "bg-primary",     header: "text-foreground",  headerBg: "bg-secondary border-border" },
] as const;

const borderByTrack: Record<string, string> = {
  work:      "hover:border-emerald-300",
  tech:      "hover:border-blue-300",
  research:  "hover:border-amber-300",
  milestone: "hover:border-primary/40",
};

const linkColorByTrack: Record<string, string> = {
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
  if (entry.linkType === "work") return "View Work History";
  if (entry.linkType === "case") return "Read Case Study";
  return "View Project";
}

export default function TimelineGridView({ entries }: TimelineGridViewProps) {
  const years = Array.from(new Set(entries.map((e) => e.year))).sort();

  return (
    <div>
      {/* Mobile scroll hint */}
      <p className="text-xs text-muted-foreground/50 text-right mb-2 md:hidden">
        ← scroll sideways to see all tracks →
      </p>
      <div className="overflow-x-auto">
      {/* Column headers */}
      <div className="min-w-[600px]">
        <div className="grid grid-cols-[64px_1fr_1fr_1fr_1fr] gap-2 mb-4 pb-2 border-b border-border">
          <div /> {/* year label col */}
          {TRACKS.map((t) => (
            <div
              key={t.key}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wide ${t.headerBg} ${t.header}`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${t.dot}`} />
              {t.label}
            </div>
          ))}
        </div>

        {/* Year rows */}
        <div className="space-y-2">
          {years.map((year, yi) => {
            const yearEntries = entries.filter((e) => e.year === year);
            const hasAny = yearEntries.length > 0;
            if (!hasAny) return null;

            return (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: yi * 0.04 }}
                className="grid grid-cols-[64px_1fr_1fr_1fr_1fr] gap-2 items-start"
              >
                {/* Year badge */}
                <div className="flex items-start justify-end pt-2 pr-2">
                  <span className="text-xs font-bold text-muted-foreground tabular-nums">{year}</span>
                </div>

                {/* 4 track cells */}
                {TRACKS.map((t) => {
                  const cellEntries = yearEntries.filter((e) => e.track === t.key);
                  return (
                    <div key={t.key} className="flex flex-col gap-1.5 min-h-[2rem]">
                      {cellEntries.map((entry, i) => {
                        const href = getLinkHref(entry);
                        return (
                          <div
                            key={i}
                            className={`rounded-lg border border-border bg-card p-3 transition-colors ${borderByTrack[entry.track]}`}
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.dot}`} />
                              {entry.date && (
                                <span className="inline-flex items-center gap-0.5 text-[9px] text-muted-foreground">
                                  <CalendarDays className="w-2.5 h-2.5" />
                                  <time dateTime={entry.date}>{entry.date}</time>
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-semibold text-foreground leading-snug">
                              {entry.title}
                            </p>
                            <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
                              {entry.description}
                            </p>
                            {href && (
                              <Link
                                href={href}
                                className={`mt-1.5 inline-flex items-center gap-0.5 text-[10px] font-medium transition-colors ${linkColorByTrack[entry.track]}`}
                              >
                                {getLinkLabel(entry)}
                                <ArrowRight className="w-2.5 h-2.5" />
                              </Link>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </motion.div>
            );
          })}
        </div>
      </div>
      </div>  {/* overflow-x-auto */}
    </div>
  );
}
