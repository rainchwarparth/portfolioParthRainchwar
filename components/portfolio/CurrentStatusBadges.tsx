import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { CurrentStatusEntry } from "@/data/types";

interface CurrentStatusBadgesProps {
  entries: CurrentStatusEntry[];
  variant?: "pill" | "card";
}

const colorMap: Record<
  CurrentStatusEntry["color"],
  {
    bg: string;
    border: string;
    text: string;
    dot: string;
    pulse: string;
    label: string;
    bullet: string;
    dateBadge: string;
    link: string;
  }
> = {
  emerald: {
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/25",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
    pulse: "bg-emerald-400",
    label: "text-emerald-600/80 dark:text-emerald-400/70",
    bullet: "bg-emerald-500/40",
    dateBadge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    link: "text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300",
  },
  blue: {
    bg: "bg-blue-500/5",
    border: "border-blue-500/25",
    text: "text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
    pulse: "bg-blue-400",
    label: "text-blue-600/80 dark:text-blue-400/70",
    bullet: "bg-blue-500/40",
    dateBadge: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    link: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
  },
  violet: {
    bg: "bg-violet-500/5",
    border: "border-violet-500/25",
    text: "text-violet-700 dark:text-violet-400",
    dot: "bg-violet-500",
    pulse: "bg-violet-400",
    label: "text-violet-600/80 dark:text-violet-400/70",
    bullet: "bg-violet-500/40",
    dateBadge: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
    link: "text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300",
  },
  amber: {
    bg: "bg-amber-500/5",
    border: "border-amber-500/25",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
    pulse: "bg-amber-400",
    label: "text-amber-600/80 dark:text-amber-400/70",
    bullet: "bg-amber-500/40",
    dateBadge: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    link: "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300",
  },
};

export default function CurrentStatusBadges({ entries, variant = "pill" }: CurrentStatusBadgesProps) {
  if (variant === "pill") {
    // Compact inline pills for the hero
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {entries.map((entry, i) => {
          const c = colorMap[entry.color];
          const isActive = entry.status === "active";
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${c.bg} ${c.border}`}
            >
              <span className="relative flex items-center shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                {isActive && (
                  <span className={`absolute inset-0 rounded-full ${c.pulse} animate-ping opacity-60`} />
                )}
              </span>
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${c.label}`}>
                {entry.label}
              </span>
              <span className={`text-xs font-medium ${c.text}`}>{entry.role}</span>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  // Full cards for About section
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
      {entries.map((entry, i) => {
        const c = colorMap[entry.color];
        const isActive = entry.status === "active";

        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className={`flex flex-col gap-3 p-4 rounded-2xl border ${c.bg} ${c.border}`}
          >
            {/* Top: dot + label, date below */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="relative flex items-center shrink-0">
                  <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                  {isActive && (
                    <span className={`absolute inset-0 rounded-full ${c.pulse} animate-ping opacity-60`} />
                  )}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${c.label}`}>
                  {entry.label}{!isActive ? " · Soon" : ""}
                </span>
              </div>
              {(entry.since || entry.until) && (
                <span className={`self-start text-[10px] font-medium px-2 py-0.5 rounded-full ${c.dateBadge}`}>
                  {entry.until ? `${entry.since} – ${entry.until}` : entry.since}
                </span>
              )}
            </div>

            {/* Role + description */}
            <div>
              <span className={`block text-sm font-bold leading-tight ${c.text}`}>{entry.role}</span>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{entry.description}</p>
            </div>

            {/* Highlights */}
            {entry.highlights && entry.highlights.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {entry.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${c.bullet}`} />
                    <span className="text-[11px] text-muted-foreground leading-snug">{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* URL link */}
            {entry.url && (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto inline-flex items-center gap-1 text-[11px] font-medium ${c.link} transition-colors`}
              >
                Learn more <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

