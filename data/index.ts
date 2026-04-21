import type {
  Profile,
  BuilderProject,
  BuilderProjectDetail,
  ProfileTimelineEntry,
  CaseStudy,
  CaseStudyMeta,
  TimelineEvent,
  Paper,
  LinkedTech,
  Certificate,
  Credentials,
  CurrentStatusEntry,
} from "./types";

// ── Re-export types ──
export * from "./types";

// ── Static data imports ──
import _profile from "./profile/about.json";
import _techStack from "./profile/tech-stack.json";
import _builderProjects from "./profile/builder-projects.json";
import _profileTimeline from "./profile/timeline.json";
import _certificates from "./profile/certificates.json";
import _credentials from "./profile/credentials.json";
import _currentStatus from "./profile/current-status.json";

// ── Case study meta + detail imports ──
import bpMeta from "./case-studies/behavioral-psychology/index.json";
import bpTimeline from "./case-studies/behavioral-psychology/timeline.json";
import bpPapers from "./case-studies/behavioral-psychology/papers.json";
import bpLinkedTech from "./case-studies/behavioral-psychology/linked-tech.json";

import ondcMeta from "./case-studies/ondc/index.json";
import ondcTimeline from "./case-studies/ondc/timeline.json";
import ondcPapers from "./case-studies/ondc/papers.json";
import ondcLinkedTech from "./case-studies/ondc/linked-tech.json";

import ecMeta from "./case-studies/e-commerce/index.json";
import ecTimeline from "./case-studies/e-commerce/timeline.json";
import ecPapers from "./case-studies/e-commerce/papers.json";
import ecLinkedTech from "./case-studies/e-commerce/linked-tech.json";

import haarMeta from "./case-studies/haar-cascade/index.json";
import haarTimeline from "./case-studies/haar-cascade/timeline.json";
import haarPapers from "./case-studies/haar-cascade/papers.json";
import haarLinkedTech from "./case-studies/haar-cascade/linked-tech.json";

// ── Typed exports ──
export const profile = _profile as Profile;
export const techStack = _techStack as string[];
export const builderProjects = _builderProjects as BuilderProject[];
export const profileTimeline = _profileTimeline as ProfileTimelineEntry[];
export const certificates = _certificates as Certificate[];
export const credentials = _credentials as Credentials;
export const currentStatus = _currentStatus as CurrentStatusEntry[];

// ── Assemble full case studies ──
function assembleCaseStudy(
  meta: CaseStudyMeta,
  timeline: TimelineEvent[],
  papers: Paper[],
  linkedTech: LinkedTech[]
): CaseStudy {
  return { ...meta, timeline, papers, linkedTech };
}

export const caseStudies: CaseStudy[] = [
  assembleCaseStudy(bpMeta as CaseStudyMeta, bpTimeline as TimelineEvent[], bpPapers as Paper[], bpLinkedTech as LinkedTech[]),
  assembleCaseStudy(ondcMeta as CaseStudyMeta, ondcTimeline as TimelineEvent[], ondcPapers as Paper[], ondcLinkedTech as LinkedTech[]),
  assembleCaseStudy(ecMeta as CaseStudyMeta, ecTimeline as TimelineEvent[], ecPapers as Paper[], ecLinkedTech as LinkedTech[]),
  assembleCaseStudy(haarMeta as CaseStudyMeta, haarTimeline as TimelineEvent[], haarPapers as Paper[], haarLinkedTech as LinkedTech[]),
];

// ── Helpers ──
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudyMetas(): CaseStudyMeta[] {
  return caseStudies.map(({ timeline, papers, linkedTech, ...meta }) => meta);
}

// ── Builder project detail imports ──
import _traceaiDetail from "./projects/traceai/detail.json";
import _sansadDetail from "./projects/sansad/detail.json";
import _trekDetail from "./projects/trek/detail.json";

export const builderProjectDetails: BuilderProjectDetail[] = [
  _traceaiDetail as BuilderProjectDetail,
  _sansadDetail as BuilderProjectDetail,
  _trekDetail as BuilderProjectDetail,
];

export function getBuilderProject(slug: string): BuilderProjectDetail | undefined {
  return builderProjectDetails.find((p) => p.slug === slug);
}
