"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Paper } from "@/data/types";

interface Props {
  paper: Paper;
  index: number;
}

export default function PaperCard({ paper, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      {/* header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground leading-snug">
            {paper.title}
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            {paper.publisher} · {paper.year}
          </p>

          {/* authors */}
          {paper.authors && paper.authors.length > 0 && (
            <p className="mt-1.5 text-xs text-muted-foreground/80 italic">
              {paper.authors.join(" · ")}
            </p>
          )}

          {/* DOI chip */}
          {paper.doi && (
            <a
              href={paper.link ?? `https://doi.org/${paper.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-mono text-amber-600 hover:text-amber-700 transition-colors"
            >
              <ExternalLink className="w-3 h-3 shrink-0" />
              DOI: {paper.doi}
            </a>
          )}
        </div>

        {/* external link icon (only when no DOI chip fallback) */}
        {!paper.doi && paper.link && (
          <a
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="View paper"
          >
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        )}
      </div>

      {/* summary */}
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {paper.summary}
      </p>

      {/* algorithms pills */}
      {paper.algorithms && paper.algorithms.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {paper.algorithms.map((alg) => (
            <span
              key={alg}
              className="text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
            >
              {alg}
            </span>
          ))}
        </div>
      )}

      {/* key metrics grid */}
      {paper.keyMetrics && paper.keyMetrics.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {paper.keyMetrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2.5 text-center"
            >
              <p className="text-base font-bold text-amber-700 leading-none">
                {m.value}
              </p>
              <p className="mt-1 text-[10px] text-amber-600 leading-snug">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* findings */}
      <div className="mt-3 p-3 rounded-lg bg-amber-50 text-sm text-amber-800">
        <span className="font-medium">Key findings: </span>
        {paper.findings}
      </div>

      {/* presentation certificate */}
      {paper.certificate && (
        <div className="mt-4">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Presentation Certificate</p>
          <a href={paper.certificate} target="_blank" rel="noopener noreferrer">
            <img
              src={paper.certificate}
              alt="Presentation certificate"
              className="w-full rounded-lg border border-border object-cover hover:opacity-90 transition-opacity"
            />
          </a>
        </div>
      )}

      {/* cross-link */}
      {paper.crossLink && (
        <Link
          href={`/case/${paper.crossLink.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
        >
          Also appears in: {paper.crossLink.label} →
        </Link>
      )}
    </motion.div>
  );
}
