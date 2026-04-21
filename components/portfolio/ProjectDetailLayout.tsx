"use client";

import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  CheckCircle2,
  Clock,
  Wrench,
  Mail,
} from "lucide-react";
import type {
  BuilderProjectDetail,
  ProjectSection,
  CapabilityRow,
} from "@/data/types";

// ── Status helpers ────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<BuilderProjectDetail["status"], string> = {
  active: "Active",
  wip: "In Progress",
  complete: "Complete",
};

const STATUS_CLASSES: Record<BuilderProjectDetail["status"], string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
  wip: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
  complete: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800",
};

const CAP_ICON = {
  live: <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />,
  planned: <Clock className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />,
  "in-design": <Wrench className="w-4 h-4 text-amber-500 flex-shrink-0" />,
};

const CAP_LABEL: Record<CapabilityRow["status"], string> = {
  live: "Live",
  planned: "Planned",
  "in-design": "In Design",
};

// ── Section renderers ─────────────────────────────────────────────────────────

function SectionWrapper({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-14"
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ text }: { text: string }) {
  return (
    <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-3">
      <span className="w-1 h-5 rounded-full bg-blue-500 inline-block" />
      {text}
    </h2>
  );
}

function renderOverview(s: ProjectSection, i: number) {
  return (
    <SectionWrapper key={i} delay={i * 0.07}>
      {s.heading && <SectionHeading text={s.heading} />}
      {s.body && (
        <div className="space-y-4">
          {s.body.split("\n\n").map((para, j) => (
            <p key={j} className="text-muted-foreground leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}

function renderHowItWorks(s: ProjectSection, i: number) {
  return (
    <SectionWrapper key={i} delay={i * 0.07}>
      {s.heading && <SectionHeading text={s.heading} />}
      <ol className="space-y-4">
        {s.steps?.map((step, j) => {
          const [label, ...rest] = step.includes(" — ")
            ? step.split(" — ")
            : [undefined, step];
          return (
            <li key={j} className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/10 text-blue-600 text-sm font-bold flex items-center justify-center mt-0.5">
                {j + 1}
              </span>
              <div className="flex-1 pt-0.5">
                {label && (
                  <span className="font-semibold text-foreground">{label} — </span>
                )}
                <span className="text-muted-foreground leading-relaxed">
                  {rest.join(" — ")}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </SectionWrapper>
  );
}

function renderTechStack(s: ProjectSection, i: number) {
  return (
    <SectionWrapper key={i} delay={i * 0.07}>
      {s.heading && <SectionHeading text={s.heading} />}
      <div className="flex flex-wrap gap-2">
        {s.techStack?.map((t) => (
          <span
            key={t}
            className="px-3 py-1.5 rounded-lg border border-border bg-muted/40 text-sm font-medium text-foreground/80"
          >
            {t}
          </span>
        ))}
      </div>
    </SectionWrapper>
  );
}

function renderCapabilities(s: ProjectSection, i: number) {
  return (
    <SectionWrapper key={i} delay={i * 0.07}>
      {s.heading && <SectionHeading text={s.heading} />}
      <div className="border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              <th className="text-left px-4 py-3 font-semibold text-foreground">
                Feature
              </th>
              <th className="text-left px-4 py-3 font-semibold text-foreground w-32">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {s.capabilities?.map((cap, j) => (
              <tr
                key={j}
                className={`border-b border-border last:border-0 ${
                  cap.status !== "live" ? "opacity-60" : ""
                }`}
              >
                <td className="px-4 py-3 text-foreground/80">{cap.feature}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-xs font-medium">
                    {CAP_ICON[cap.status]}
                    {CAP_LABEL[cap.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}

function renderOpenProblems(s: ProjectSection, i: number) {
  return (
    <SectionWrapper key={i} delay={i * 0.07}>
      {s.heading && <SectionHeading text={s.heading} />}
      {s.body && (
        <p className="text-muted-foreground leading-relaxed mb-5">{s.body}</p>
      )}
      <ul className="space-y-3">
        {s.problems?.map((p, j) => (
          <li key={j} className="flex gap-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
            <p className="text-muted-foreground leading-relaxed">{p}</p>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

function renderScreenshots(s: ProjectSection, i: number) {
  if (!s.screenshots?.length) return null;
  return (
    <SectionWrapper key={i} delay={i * 0.07}>
      {s.heading && <SectionHeading text={s.heading} />}
      <div className="grid sm:grid-cols-2 gap-4">
        {s.screenshots.map((shot, j) => (
          <figure key={j} className="rounded-xl overflow-hidden border border-border">
            <img
              src={shot.url}
              alt={shot.caption}
              className="w-full object-cover bg-muted"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <figcaption className="px-4 py-2.5 text-xs text-muted-foreground bg-muted/30 border-t border-border">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionWrapper>
  );
}

function renderSnippet(s: ProjectSection, i: number) {
  return (
    <SectionWrapper key={i} delay={i * 0.07}>
      {s.heading && <SectionHeading text={s.heading} />}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-muted/60 border-b border-border">
          <span className="text-xs font-mono text-muted-foreground">
            {s.language ?? "code"}
          </span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed text-foreground/90 bg-muted/20">
          <code>{s.code}</code>
        </pre>
      </div>
    </SectionWrapper>
  );
}

function renderCollaboration(
  s: ProjectSection,
  i: number,
  repoUrl: string
) {
  return (
    <SectionWrapper key={i} delay={i * 0.07}>
      <div className="rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 p-6 md:p-8">
        {s.heading && (
          <h2 className="text-xl font-bold text-foreground mb-3">{s.heading}</h2>
        )}
        {s.body && (
          <p className="text-muted-foreground leading-relaxed mb-5">{s.body}</p>
        )}
        {s.backgrounds && s.backgrounds.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-foreground mb-3">
              Useful backgrounds:
            </p>
            <ul className="space-y-2">
              {s.backgrounds.map((b, j) => (
                <li key={j} className="flex gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-2 w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          {s.email && (
            <a
              href={`mailto:${s.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              {s.email}
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ── Main layout ────────────────────────────────────────────────────────────────

interface ProjectDetailLayoutProps {
  project: BuilderProjectDetail;
}

export default function ProjectDetailLayout({ project }: ProjectDetailLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-20 pb-24 px-6 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          {/* Status badge + year */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                STATUS_CLASSES[project.status]
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  project.status === "active"
                    ? "bg-emerald-500 animate-pulse"
                    : project.status === "wip"
                    ? "bg-amber-500"
                    : "bg-blue-500"
                }`}
              />
              {STATUS_LABELS[project.status]}
            </span>
            <span className="text-xs text-muted-foreground">{project.year}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-3">
            {project.title}
          </h1>
          <p className="text-lg italic text-blue-600/80 mb-4">{project.tagline}</p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {project.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* GitHub link */}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            View on GitHub
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </a>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-border mb-14" />

        {/* Sections */}
        {project.sections.map((section, i) => {
          switch (section.type) {
            case "overview":
              return renderOverview(section, i);
            case "how-it-works":
              return renderHowItWorks(section, i);
            case "tech-stack":
              return renderTechStack(section, i);
            case "capabilities":
              return renderCapabilities(section, i);
            case "open-problems":
              return renderOpenProblems(section, i);
            case "screenshots":
              return renderScreenshots(section, i);
            case "snippet":
              return renderSnippet(section, i);
            case "collaboration":
              return renderCollaboration(section, i, project.repoUrl);
            default:
              return null;
          }
        })}
      </div>
    </main>
  );
}
