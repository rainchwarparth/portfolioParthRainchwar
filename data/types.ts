// ── Shared types for the entire portfolio data layer ──

export interface Profile {
  name: string;
  tagline: string;
  positioning: string;
  about: string[];
  email: string;
  linkedin: string;
  github: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BuilderProject {
  slug: string;
  title: string;
  description: string;
  impact: string;
  tags: string[];
  year?: string;
  status?: "active" | "wip" | "complete";
  repoUrl?: string;
}

// ── Builder Project Detail (for /project/:slug pages) ──

export type BuilderSectionType =
  | "overview"
  | "how-it-works"
  | "tech-stack"
  | "capabilities"
  | "open-problems"
  | "screenshots"
  | "snippet"
  | "collaboration";

export interface CapabilityRow {
  feature: string;
  status: "live" | "planned" | "in-design";
}

export interface ProjectScreenshot {
  url: string;
  caption: string;
}

export interface ProjectSection {
  type: BuilderSectionType;
  heading?: string;
  body?: string;
  steps?: string[];
  techStack?: string[];
  capabilities?: CapabilityRow[];
  problems?: string[];
  screenshots?: ProjectScreenshot[];
  code?: string;
  language?: string;
  email?: string;
  backgrounds?: string[];
}

export interface BuilderProjectDetail {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  year: string;
  status: "active" | "wip" | "complete";
  repoUrl: string;
  tags: string[];
  sections: ProjectSection[];
}

export interface ProfileTimelineEntry {
  year: string;
  title: string;
  description: string;
  track: "research" | "tech" | "milestone" | "work";
  date?: string;
  slug?: string;
  linkType?: "project" | "case" | "work";
  image?: string;
  screenshots?: string[];
}

export interface TimelineFigure {
  src: string;
  caption: string;
  alt: string;
}

export interface TimelineDataTable {
  caption: string;
  headers: string[];
  rows: (string | number)[][];
}

export interface TimelineBarChartBar {
  dataKey: string;
  color: string;
  label: string;
}

export interface TimelineBarChart {
  caption?: string;
  xKey: string;
  yLabel?: string;
  bars: TimelineBarChartBar[];
  data: Record<string, string | number | null>[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  attachment?: { label: string; type: "form" | "dataset" | "paper" | "credential" | "certificate"; href?: string };
  tags?: string[];
  dataTable?: TimelineDataTable;
  figures?: TimelineFigure[];
  barChart?: TimelineBarChart;
}

export interface PaperMetric {
  label: string;
  value: string;
}

export interface Paper {
  title: string;
  publisher: string;
  year: string;
  summary: string;
  findings: string;
  link?: string;
  crossLink?: { slug: string; label: string };
  doi?: string;
  authors?: string[];
  surveyWindow?: string;
  sampleSize?: string;
  algorithms?: string[];
  keyMetrics?: PaperMetric[];
  certificate?: string;
}

export interface CaseStudyMeta {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  themes: string[];
  highlight?: string;
  published?: boolean;
  spawnedFrom?: { slug: string; label: string } | null;
}

export interface CaseStudy extends CaseStudyMeta {
  timeline: TimelineEvent[];
  papers: Paper[];
  linkedTech: LinkedTech[];
}

export interface LinkedTech {
  label: string;
  url: string;
}

export interface Leadership {
  role: string;
  institution: string;
  description: string;
  achievements: string[];
}

export interface CommunityWork {
  name: string;
  impact: string;
  certificate?: string;
}

export interface WorkRole {
  title: string;
  type: "Full-time" | "Internship" | "Freelance" | "Part-time";
  start: string;
  end: string;
  duration: string;
  location?: string;
  locationMode?: "Remote" | "On-site" | "Hybrid";
  skills: string[];
  bullets?: string[];
}

export interface WorkExperienceEntry {
  company: string;
  color: "blue" | "purple" | "emerald" | "orange" | "rose";
  totalDuration?: string;
  roles: WorkRole[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
  category?: "programming" | "data" | "ai" | "cloud" | "soft-skills" | "achievement" | "side-quest" | "other";
  description?: string;
  fileName?: string;
  fileFormat?: "pdf" | "png" | "jpg";
  url?: string;
  featured?: boolean;
}

export interface CurrentStatusEntry {
  id: string;
  label: string;
  role: string;
  description: string;
  highlights?: string[];
  url?: string;
  color: "emerald" | "blue" | "violet" | "amber";
  status: "active" | "upcoming";
  since?: string;
  until?: string;
}

export interface Credentials {
  leadership: Leadership;
  communityWork: CommunityWork[];
  certifications: Certificate[];
}
