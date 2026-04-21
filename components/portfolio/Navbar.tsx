"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ArrowLeft, ChevronDown } from "lucide-react";
import type { NavLink } from "@/data/types";
import { caseStudies, builderProjects } from "@/data";

interface NavbarProps {
  links: NavLink[];
}

const Navbar = ({ links }: NavbarProps) => {
  const navLinks = links;
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setExploreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver only runs on the home page where sections exist
  useEffect(() => {
    if (!isHome) return;
    const anchorLinks = navLinks.filter((l) => l.href.startsWith("#"));
    const sections = anchorLinks.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, [isHome, navLinks]);

  const isLinkActive = (href: string) => {
    if (href.startsWith("/")) return pathname === href;
    return active === href;
  };

  const handleClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/")) {
      router.push(href);
    } else if (href.startsWith("#")) {
      if (isHome) {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Navigate home — scroll target handled by landing page
        router.push("/");
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {!isHome && (
            <button
              onClick={() => router.back()}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (isHome) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                router.push("/");
              }
            }}
            className="text-foreground font-semibold text-lg tracking-tight"
          >
            PR
          </a>
        </div>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleClick(link.href)}
                className={`text-sm transition-colors ${
                  isLinkActive(link.href)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
          
          {/* Explore Dropdown */}
          <li className="relative">
            <button
              onClick={() => setExploreOpen(!exploreOpen)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Explore
              <ChevronDown className={`w-3 h-3 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
            </button>
            
            {exploreOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg overflow-hidden">
                {/* Case Studies */}
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase px-2 py-1">Research</p>
                  <div className="space-y-1">
                    {caseStudies.slice(0, 3).map((cs) => (
                      <button
                        key={cs.slug}
                        onClick={() => {
                          router.push(`/case/${cs.slug}`);
                          setExploreOpen(false);
                        }}
                        className="w-full text-left px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                      >
                        {cs.title}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Builder Projects */}
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase px-2 py-1">Projects</p>
                  <div className="space-y-1">
                    {builderProjects.slice(0, 3).map((proj) => (
                      <button
                        key={proj.slug}
                        onClick={() => {
                          router.push(`/project/${proj.slug}`);
                          setExploreOpen(false);
                        }}
                        className="w-full text-left px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                      >
                        {proj.title}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quick Links */}
                <div className="px-3 py-2">
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        router.push("/sitemap");
                        setExploreOpen(false);
                      }}
                      className="w-full text-left px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors font-medium"
                    >
                      View All Content
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <ul className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleClick(link.href)}
                  className={`block w-full text-left text-sm py-2 transition-colors ${
                    isLinkActive(link.href)
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            
            {/* Mobile Explore Dropdown */}
            <li className="border-t border-border pt-3 mt-3">
              <button
                onClick={() => setExploreOpen(!exploreOpen)}
                className="flex items-center gap-2 w-full text-left text-sm py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Explore
                <ChevronDown className={`w-3 h-3 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
              </button>
              
              {exploreOpen && (
                <div className="mt-2 space-y-2 pl-2">
                  {/* Case Studies */}
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Research</p>
                  <div className="space-y-1">
                    {caseStudies.slice(0, 3).map((cs) => (
                      <button
                        key={cs.slug}
                        onClick={() => {
                          router.push(`/case/${cs.slug}`);
                          setMenuOpen(false);
                          setExploreOpen(false);
                        }}
                        className="block w-full text-left px-2 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                      >
                        {cs.title}
                      </button>
                    ))}
                  </div>
                  
                  {/* Builder Projects */}
                  <p className="text-xs font-semibold text-muted-foreground uppercase mt-3">Projects</p>
                  <div className="space-y-1">
                    {builderProjects.slice(0, 3).map((proj) => (
                      <button
                        key={proj.slug}
                        onClick={() => {
                          router.push(`/project/${proj.slug}`);
                          setMenuOpen(false);
                          setExploreOpen(false);
                        }}
                        className="block w-full text-left px-2 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                      >
                        {proj.title}
                      </button>
                    ))}
                  </div>
                  
                  {/* Quick Links */}
                  <button
                    onClick={() => {
                      router.push("/sitemap");
                      setMenuOpen(false);
                      setExploreOpen(false);
                    }}
                    className="block w-full text-left px-2 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors font-medium mt-3"
                  >
                    View All Content
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
