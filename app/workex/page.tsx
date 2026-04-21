"use client";

// Simple wrapper - work experience logic already exists in components
// This re-exports the same component to be compatible with Next.js App Router

import { Metadata } from "next";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase } from "lucide-react";
import type { WorkExperienceEntry, WorkRole } from "@/data/types";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { navLinks } from "@/lib/navLinks";
import _workEx from "@/data/work-experience.json";

const workEx = _workEx as WorkExperienceEntry[];

// Color maps
const dotColors: Record<string, string> = {
  blue: "bg-blue-500",
  purple: "bg-violet-500",
  emerald: "bg-emerald-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
};

const ringColors: Record<string, string> = {
  blue: "ring-blue-200",
  purple: "ring-violet-200",
  emerald: "ring-emerald-200",
  orange: "ring-orange-200",
  rose: "ring-rose-200",
};

const badgeColors: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  purple: "bg-violet-50 text-violet-700 border-violet-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
};

const initBg: Record<string, string> = {
  blue: "bg-blue-500",
  purple: "bg-violet-500",
  emerald: "bg-emerald-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
};

const hoverBorder: Record<string, string> = {
  blue: "hover:border-blue-300",
  purple: "hover:border-violet-300",
  emerald: "hover:border-emerald-300",
  orange: "hover:border-orange-300",
  rose: "hover:border-rose-300",
};

const typeLabel: Record<string, string> = {
  "Full-time": "Full-time",
  Internship: "Internship",
  Freelance: "Freelance",
  "Part-time": "Part-time",
};

function RoleCard({ role, color }: { role: WorkRole; color: string }) {
  const isPresent = role.end === "Present";
  return (
    <div
      className={`rounded-xl border border-border bg-card p-5 transition-colors ${hoverBorder[color]}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-sm text-foreground">{role.title}</h3>
            {isPresent && (
              <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeColors[color]}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dotColors[color]} animate-pulse`} />
                Current
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className={`font-medium px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider bg-muted`}>
              {typeLabel[role.type]}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {role.start} – {role.end} · {role.duration}
            </span>
            {role.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {role.location}
              </span>
            )}
          </div>
        </div>
      </div>

      {role.bullets && role.bullets.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {role.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[color]}`} />
              {b}
            </li>
          ))}
        </ul>
      )}

      {role.skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {role.skills.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function CompanyBlock({ entry, index }: { entry: WorkExperienceEntry; index: number }) {
  const initials = entry.company
    .split(/[\s/]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="relative flex gap-6"
    >
      <div className="flex flex-col items-center">
        <span
          className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${dotColors[entry.color]} ring-4 ${ringColors[entry.color]}`}
        />
        <div className="w-px flex-1 bg-border mt-2" />
      </div>

      <div className="flex-1 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${initBg[entry.color]}`}
          >
            {initials}
          </div>
          <div>
            <h2 className="font-bold text-base text-foreground">{entry.company}</h2>
            {entry.totalDuration && (
              <p className="text-xs text-muted-foreground">{entry.totalDuration} total</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {entry.roles.map((role, i) => (
            <RoleCard key={i} role={role} color={entry.color} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkExperiencePage() {
  const totalCompanies = workEx.length;
  const totalRoles = workEx.reduce((acc, e) => acc + e.roles.length, 0);
  const earliestStart = workEx[workEx.length - 1]?.roles[0]?.start ?? "";

  return (
    <>
      <Navbar links={navLinks} />
      <main className="min-h-screen bg-background">
        <div className="pt-20 pb-12 px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Work Experience
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Career Timeline
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {totalRoles} roles across {totalCompanies} organisations · since {earliestStart}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {workEx.map((e) => (
                <span
                  key={e.company}
                  className={`text-xs px-3 py-1 rounded-full border font-medium ${badgeColors[e.color]}`}
                >
                  {e.company}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="pb-24 px-6 max-w-3xl mx-auto">
          {workEx.map((entry, i) => (
            <CompanyBlock key={entry.company} entry={entry} index={i} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
