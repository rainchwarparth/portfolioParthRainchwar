import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Github, Briefcase, Award } from "lucide-react";
import type { BuilderProject, CaseStudy } from "@/data/types";

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

interface TwoTrackSectionProps {
  builderProjects: BuilderProject[];
  caseStudies: CaseStudy[];
}

export default function TwoTrackSection({ builderProjects, caseStudies }: TwoTrackSectionProps) {
  const router = useRouter();

  return (
    <section id="two-track" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {/* ── Builder Track ─────────────────────── */}
        <div id="builder">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold tracking-tight flex items-center gap-3"
          >
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            What I Build
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="mt-6 space-y-4"
          >
            {builderProjects.map((p) => (
              <motion.div
                key={p.title}
                variants={card}
                onClick={() => router.push(`/project/${p.slug}`)}
                className="group rounded-xl border border-border bg-card p-5 hover:border-blue-300 transition-colors cursor-pointer"
              >
                {/* meta row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {p.status === "active" && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </span>
                    )}
                    {p.status === "wip" && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        WIP
                      </span>
                    )}
                    {p.status === "complete" && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        Complete
                      </span>
                    )}
                    {p.year && (
                      <span className="text-xs text-muted-foreground">{p.year}</span>
                    )}
                  </div>
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="GitHub repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3 className="font-semibold text-base group-hover:text-blue-600 transition-colors">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {p.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs font-medium text-blue-600">
                    {p.impact}
                  </p>
                  <div className="flex gap-1.5">
                    {p.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 2 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        +{p.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:gap-2 transition-all">
                  View Project <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Thinker Track ────────────────────── */}
        <div id="thinker">
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold tracking-tight flex items-center gap-3"
          >
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            Research Work
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="mt-6 space-y-4"
          >
            {caseStudies.map((cs) => (
              <motion.div
                key={cs.slug}
                variants={card}
                onClick={() => router.push(`/case/${cs.slug}`)}
                className="group relative rounded-xl border border-border bg-card p-5 hover:border-amber-300 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base group-hover:text-amber-700 transition-colors">{cs.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {cs.tagline}
                    </p>
                  </div>
                  <ArrowRight className="shrink-0 mt-1 w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {cs.published && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                      Published
                    </span>
                  )}
                  {cs.papers.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {cs.papers.length}{" "}
                      {cs.papers.length === 1 ? "paper" : "papers"}
                    </span>
                  )}
                  {cs.highlight && (
                    <>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                        {cs.highlight}
                      </span>
                    </>
                  )}
                  {cs.papers.length === 0 && cs.themes.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Preview strip: what's next ─────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-16 grid sm:grid-cols-2 gap-4"
      >
        {/* Work history preview */}
        <Link
          href="/workex"
          className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:border-blue-300 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Work experience</p>
            <p className="text-sm font-medium mt-0.5">Synpulse · 4+ yrs · fintech &amp; banking</p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">Senior Analyst — backend &amp; infra across 3 concurrent client projects</p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
        </Link>

        {/* Certificates preview */}
        <Link
          href="/certificates"
          className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:border-amber-300 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Certifications</p>
            <p className="text-sm font-medium mt-0.5">22 certificates · ML, cloud, leadership</p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">Yale · Coursera · AWS · internal Synpulse</p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-amber-600 group-hover:translate-x-1 transition-all shrink-0" />
        </Link>
      </motion.div>
    </section>
  );
}
