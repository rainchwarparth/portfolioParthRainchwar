"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Code2, Award, Briefcase, Home } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { navLinks } from "@/lib/navLinks";
import { caseStudies, builderProjects, certificates } from "@/data";

export default function Sitemap() {
  const sections = [
    {
      id: "home",
      title: "Home",
      icon: Home,
      description: "Main portfolio page with overview",
      links: [
        { label: "Back to Home", href: "/", description: "Main portfolio landing page" },
      ],
    },
    {
      id: "research",
      title: "Research & Case Studies",
      icon: BookOpen,
      description: "Deep dives into research projects and analysis",
      links: caseStudies.map((cs) => ({
        label: cs.title,
        href: `/case/${cs.slug}`,
        description: cs.summary,
      })),
    },
    {
      id: "projects",
      title: "Builder Projects",
      icon: Code2,
      description: "Engineering and technical projects",
      links: builderProjects.map((proj) => ({
        label: proj.title,
        href: `/project/${proj.slug}`,
        description: proj.description,
      })),
    },
    {
      id: "work",
      title: "Work Experience",
      icon: Briefcase,
      description: "Professional journey and roles",
      links: [
        { label: "Full Work History", href: "/workex", description: "Detailed work experience timeline" },
      ],
    },
    {
      id: "credentials",
      title: "Certifications & Credentials",
      icon: Award,
      description: "Learning and professional development",
      links: [
        { label: "All Certifications", href: "/certificates", description: "Complete list of courses and credentials" },
      ],
    },
  ];

  return (
    <>
      <Navbar links={navLinks} />
      <main className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">Sitemap</h1>
            <p className="text-muted-foreground">
              Explore all pages and sections of my portfolio
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, si) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: si * 0.1 }}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>

                  {/* Links list */}
                  <div className="space-y-2 ml-11">
                    {section.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="group flex items-start justify-between rounded-lg p-3 bg-muted/30 hover:bg-muted/60 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                            {link.label}
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </p>
                          {link.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">{link.description}</p>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Info section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 rounded-xl bg-muted/30 border border-border"
          >
            <h3 className="font-semibold text-foreground mb-2">Navigation Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Click any link above to jump directly to that page</li>
              <li>• Use the navbar at the top to access main sections</li>
              <li>• Footer links are available on every page for quick navigation</li>
              <li>• Use the back button to return to the previous page</li>
            </ul>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
