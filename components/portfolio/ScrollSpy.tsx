import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "two-track", label: "Work & Research" },
  { id: "timeline", label: "Timeline" },
  { id: "credentials", label: "Credentials" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export default function ScrollSpy() {
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            title={label}
            aria-label={`Scroll to ${label}`}
            className="group relative flex items-center justify-end gap-2"
          >
            {/* Label tooltip */}
            <span className="absolute right-5 whitespace-nowrap text-xs font-medium text-foreground bg-background border border-border rounded-md px-2 py-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {label}
            </span>
            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "w-2.5 h-2.5 bg-foreground"
                  : "w-1.5 h-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
