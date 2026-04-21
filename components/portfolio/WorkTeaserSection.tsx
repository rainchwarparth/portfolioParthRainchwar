"use client";

import { useRef } from "react";
import type React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import _workEx from "@/data/work-experience.json";
import type { WorkExperienceEntry } from "@/data/types";

const workEx = _workEx as WorkExperienceEntry[];

// Flatten all roles from all companies into one list
const allRoles = workEx.flatMap((entry) =>
  entry.roles.map((role) => ({ role, entry }))
);

const colorBorder: Record<string, string> = {
  blue: "border-blue-200 hover:border-blue-400",
  purple: "border-violet-200 hover:border-violet-400",
  emerald: "border-emerald-200 hover:border-emerald-400",
  orange: "border-orange-200 hover:border-orange-400",
  rose: "border-rose-200 hover:border-rose-400",
};
const colorBadge: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700",
  purple: "bg-violet-50 text-violet-700",
  emerald: "bg-emerald-50 text-emerald-700",
  orange: "bg-orange-50 text-orange-700",
  rose: "bg-rose-50 text-rose-700",
};
const colorDot: Record<string, string> = {
  blue: "bg-blue-500",
  purple: "bg-violet-500",
  emerald: "bg-emerald-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
};

export default function WorkTeaserSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragScrollLeftRef = useRef(0);

  if (!allRoles.length) return null;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.pageX - el.offsetLeft;
    dragScrollLeftRef.current = el.scrollLeft;
    el.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.pageX - el.offsetLeft - dragStartXRef.current;
    if (Math.abs(dx) > 4) hasDraggedRef.current = true;
    el.scrollLeft = dragScrollLeftRef.current - dx * 1.2;
  };

  const stopDrag = () => {
    isDraggingRef.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      hasDraggedRef.current = false;
    }
  };

  return (
    <section id="work-teaser" className="py-16 px-6 border-t border-border bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
        >
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
              Industry Experience
            </p>
            <h2 className="text-xl font-bold tracking-tight">Where I've Worked</h2>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span>3 companies</span>
              <span className="text-border">·</span>
              <span>4+ years</span>
              <span className="text-border">·</span>
              <span>Fintech &amp; banking</span>
              <span className="text-border">·</span>
              <span>Remote</span>
            </div>
          </div>
          <Link
            href="/workex"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors shrink-0"
          >
            Full work history <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Role previews — horizontal drag scroll */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto pb-2 cursor-grab select-none"
            style={{ scrollbarWidth: "none" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            {allRoles.map(({ role, entry }, i) => (
              <Link
                key={`${entry.company}-${role.title}`}
                href="/workex"
                draggable={false}
                onClick={handleCardClick}
                className={`group flex-shrink-0 w-80 rounded-xl border bg-card p-5 transition-colors ${
                  colorBorder[entry.color] ?? "border-border hover:border-primary/50"
                }`}
              >
                {/* Role header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        colorDot[entry.color] ?? "bg-primary"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-semibold leading-tight">{role.title}</p>
                      <p className="text-xs text-muted-foreground">{entry.company} · <time dateTime={role.start}>{role.start}</time> – <time dateTime={role.end}>{role.end}</time></p>
                    </div>
                  </div>
                  {i === 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${
                      colorBadge[entry.color] ?? "bg-muted text-muted-foreground"
                    } border-transparent`}>
                      Current
                    </span>
                  )}
                </div>

                {/* First bullet only */}
                {role.bullets?.[0] && (
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {role.bullets[0]}
                  </p>
                )}

                <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  See more <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
