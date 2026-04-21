"use client";

import Navbar from "@/components/portfolio/Navbar";
import InteractiveHero from "@/components/portfolio/InteractiveHero";
import About from "@/components/portfolio/About";
import TwoTrackSection from "@/components/portfolio/TwoTrackSection";
import WorkTeaserSection from "@/components/portfolio/WorkTeaserSection";
import CertificatesMarquee from "@/components/portfolio/CertificatesMarquee";
import UnifiedTimeline from "@/components/portfolio/UnifiedTimeline";
import CredentialsSection from "@/components/portfolio/CredentialsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import ScrollSpy from "@/components/portfolio/ScrollSpy";
import Footer from "@/components/portfolio/Footer";
import { navLinks } from "@/lib/navLinks";
import {
  profile,
  techStack,
  builderProjects,
  caseStudies,
  profileTimeline,
  credentials,
  certificates,
  currentStatus,
} from "@/data";

export default function Home() {
  return (
    <>
      <Navbar links={navLinks} />
      <ScrollSpy />
      <main>
        <article id="hero" role="main">
          <InteractiveHero
            name={profile.name}
            tagline={profile.tagline}
            positioning={profile.positioning}
          />
        </article>
        
        <article id="about" role="doc-introduction">
          <About paragraphs={profile.about} techStack={techStack} statusEntries={currentStatus} />
        </article>
        
        <article id="work" role="region" aria-label="Work Experience and Projects">
          <TwoTrackSection
            builderProjects={builderProjects}
            caseStudies={caseStudies}
          />
          <WorkTeaserSection />
        </article>
        
        <article id="timeline" role="region" aria-label="Professional Timeline">
          <UnifiedTimeline entries={profileTimeline} />
        </article>
        
        <article id="credentials" role="region" aria-label="Credentials and Recognition">
          <CredentialsSection
            communityWork={credentials.communityWork}
            certifications={certificates}
          />
        </article>
        
        <article id="certificates" role="region" aria-label="Certifications">
          <CertificatesMarquee certificates={certificates} />
        </article>
        
        <article id="contact" role="region" aria-label="Contact Information">
          <ContactSection profile={profile} />
        </article>
      </main>
      <Footer />
    </>
  );
}
