"use client";

import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { caseStudies, builderProjects, certificates } from "@/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Bio */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-foreground mb-2">Parth Rainchwar</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Microservices architect & behavioral AI researcher exploring responsible innovation.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/rainchwarparth"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/in/parthrainchwar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="mailto:parthrainchwar@gmail.com"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Case Studies */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Research & Case Studies</h4>
            <ul className="space-y-2">
              {caseStudies.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/case/${study.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {study.title}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Builder Projects */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Builder Projects</h4>
            <ul className="space-y-2">
              {builderProjects.slice(0, 5).map((proj) => (
                <li key={proj.slug || proj.title}>
                  <Link
                    href={`/project/${proj.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {proj.title}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
              {builderProjects.length > 5 && (
                <li>
                  <Link
                    href="/sitemap"
                    className="text-sm text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1 group"
                  >
                    View All
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/workex"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                >
                  Work Experience
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/certificates"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                >
                  Certifications
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                >
                  Full Sitemap
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <a
                  href="https://parthrainchwar.vercel.app"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                >
                  Home
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Parth Rainchwar. Built with React, Vite, and Tailwind CSS.
          </p>
          <p className="text-xs text-muted-foreground">
            <a href="/sitemap" className="hover:text-foreground transition-colors">
              Sitemap
            </a>
            {" "} · {" "}
            <a href="https://github.com/rainchwarparth" className="hover:text-foreground transition-colors">
              Source Code
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
