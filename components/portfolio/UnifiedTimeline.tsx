"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ChevronUp, ArrowRight, CalendarDays, AlignLeft, Grid2X2, Table2 } from "lucide-react";
import type { ProfileTimelineEntry } from "@/data/types";
import TimelineGridView from "./TimelineGridView";
import TimelineTableView from "./TimelineTableView";

interface UnifiedTimelineProps {
  entries: ProfileTimelineEntry[];
}

type ViewMode = "spine" | "grid" | "table";

const VIEW_MODES: { id: ViewMode; label: string; Icon: React.ElementType }[] = [
  { id: "spine", label: "Spine", Icon: AlignLeft },
  { id: "grid",  label: "Grid",  Icon: Grid2X2 },
  { id: "table", label: "Table", Icon: Table2 },
];

export default function UnifiedTimeline({ entries }: UnifiedTimelineProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ViewMode>("spine");

  const years = Array.from(new Set(entries.map((e) => e.year)));

  const researchCount = entries.filter((e) => e.track === "research").length;
  const techCount = entries.filter((e) => e.track === "tech").length;
  const workCount = entries.filter((e) => e.track === "work").length;
  const milestoneCount = entries.filter((e) => e.track === "milestone").length;

  const firstYear = entries[0]?.year ?? "";
  const lastYear = entries[entries.length - 1]?.year ?? "";

  return (
    <section id="timeline" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Timeline
          </h2>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {open ? "Collapse" : "View full journey"}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Collapsed teaser */}
        {!open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-primary/30 transition-colors text-center"
            onClick={() => setOpen(true)}
          >
            <p className="text-sm text-muted-foreground font-medium">
              {entries.length} events · {firstYear} → {lastYear}
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {techCount} tech & builder
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {workCount} work
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                {researchCount} research
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-primary/5 text-primary border border-primary/20">
                {milestoneCount} milestones
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground/60">
              Click to explore — tech & work on the left, research on the right, milestones in the center
            </p>
          </motion.div>
        )}

        {/* Expanded timeline */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* View mode toggle */}
              <div className="flex items-center justify-end gap-1 mb-6">
                {VIEW_MODES.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setView(id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      view === id
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              {/* ── GRID VIEW ── */}
              {view === "grid" && <TimelineGridView entries={entries} />}

              {/* ── TABLE VIEW ── */}
              {view === "table" && <TimelineTableView entries={entries} />}

              {/* ── SPINE VIEW ── */}
              {view === "spine" && (
              <div className="relative">
                {/* Center vertical spine */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px hidden md:block" />

                <div className="space-y-0">
                  {years.map((year) => {
                    const yearEntries = entries.filter((e) => e.year === year);

                    return (
                      <div key={year} className="relative">
                        {/* Year badge */}
                        <div className="flex justify-center mb-6 mt-10 first:mt-0">
                          <span className="relative z-10 px-4 py-1.5 rounded-full bg-foreground text-background text-xs font-bold tracking-wide">
                            {year}
                          </span>
                        </div>

                        {yearEntries.map((entry, i) => {
                          const isResearch = entry.track === "research";
                          const isMilestone = entry.track === "milestone";
                          const isTech = entry.track === "tech";
                          const isWork = entry.track === "work";
                          // tech & work = LEFT, research = RIGHT, milestone = CENTER
                          const isLeft = isTech || isWork;

                          const dotColor = isMilestone
                            ? "bg-primary"
                            : isResearch
                            ? "bg-amber-500"
                            : isWork
                            ? "bg-emerald-500"
                            : "bg-blue-500";

                          const borderHover = isMilestone
                            ? "hover:border-primary/40"
                            : isResearch
                            ? "hover:border-amber-300"
                            : isWork
                            ? "hover:border-emerald-300"
                            : "hover:border-blue-300";

                          const linkColor = isResearch
                            ? "text-amber-600 hover:text-amber-700"
                            : isWork
                            ? "text-emerald-600 hover:text-emerald-700"
                            : "text-blue-600 hover:text-blue-700";

                          const linkLabel =
                            entry.linkType === "work"
                              ? "View Work History"
                              : entry.linkType === "case"
                              ? "Read Case Study"
                              : "View Project";

                          const linkHref =
                            entry.linkType === "work"
                              ? "/workex"
                              : entry.linkType === "case"
                              ? `/case/${entry.slug}`
                              : `/project/${entry.slug}`;

                          return (
                            <motion.div
                              key={`${year}-${i}`}
                              initial={{ opacity: 0, y: 16 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.06 }}
                              className={`relative mb-6 ${
                                isMilestone
                                  ? "md:mx-auto md:w-[55%]"
                                  : isLeft
                                  ? "md:w-[calc(50%-2.5rem)] md:mr-auto md:pr-6 md:text-right"
                                  : "md:w-[calc(50%-2.5rem)] md:ml-auto md:pl-6 md:text-left"
                              }`}
                            >
                              {/* Dot on center spine (desktop) */}
                              <span
                                className={`hidden md:block absolute top-4 w-2.5 h-2.5 rounded-full ${dotColor} border-2 border-background z-10 ${
                                  isMilestone
                                    ? "left-1/2 -translate-x-1/2"
                                    : isLeft
                                    ? "-right-[2.1rem]"
                                    : "-left-[2.1rem]"
                                }`}
                              />

                              <div
                                className={`rounded-xl border border-border bg-card overflow-hidden transition-colors ${borderHover}`}
                              >
                                {/* Optional image */}
                                {entry.image && (
                                  <img
                                    src={entry.image}
                                    alt={entry.title}
                                    className="w-full h-36 object-cover"
                                    onError={(e) =>
                                      ((e.target as HTMLImageElement).style.display = "none")
                                    }
                                  />
                                )}

                                <div className="p-5">
                                  {/* Track badge */}
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span
                                      className={`md:hidden w-2 h-2 rounded-full ${dotColor} shrink-0`}
                                    />
                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                      {entry.track}
                                    </span>
                                  </div>

                                  <h4 className="mt-1.5 font-semibold text-foreground text-sm leading-snug">
                                    {entry.title}
                                  </h4>
                                  {entry.date && (
                                    <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-medium text-muted-foreground bg-muted/40 border border-border rounded-full px-2 py-0.5">
                                      <CalendarDays className="w-3 h-3" />
                                      <time dateTime={entry.date}>{entry.date}</time>
                                    </span>
                                  )}
                                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                                    {entry.description}
                                  </p>

                                  {/* Screenshot strip */}
                                  {entry.screenshots && entry.screenshots.length > 0 && (
                                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                                      {entry.screenshots.map((src, si) => (
                                        <img
                                          key={si}
                                          src={src}
                                          alt={`${entry.title} screenshot ${si + 1}`}
                                          className="h-28 w-auto rounded-lg object-cover flex-shrink-0 border border-border"
                                          onError={(e) =>
                                            ((e.target as HTMLImageElement).style.display = "none")
                                          }
                                        />
                                      ))}
                                    </div>
                                  )}

                                  {/* Link to case study or project */}
                                  {entry.slug && entry.linkType && (
                                    <div
                                      className={`mt-3 flex ${
                                        isLeft
                                          ? "md:justify-end"
                                          : "justify-start"
                                      }`}
                                    >
                                      <Link
                                        href={linkHref}
                                        className={`inline-flex items-center gap-1 text-xs font-medium transition-colors ${linkColor}`}
                                      >
                                        {linkLabel}
                                        <ArrowRight className="w-3 h-3" />
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
              )} {/* end spine view */}

              {/* Bottom collapse button */}
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-full px-5 py-2 hover:border-foreground/30"
                >
                  <ChevronUp className="w-4 h-4" />
                  Collapse timeline
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
