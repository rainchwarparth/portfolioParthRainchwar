"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye } from "lucide-react";
import type { Certificate } from "@/data/types";
import CertificatePreviewModal from "./CertificatePreviewModal";

interface CertificatesMarqueeProps {
  certificates: Certificate[];
}

export default function CertificatesMarquee({
  certificates,
}: CertificatesMarqueeProps) {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragScrollLeftRef = useRef(0);

  const featuredCerts = certificates.filter((c) => c.featured);

  // Auto-scroll animation — pauses while user drags
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    let direction = 1;

    const interval = setInterval(() => {
      if (isDraggingRef.current) return; // pause during drag

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      scrollPosition += direction * 0.8;

      if (scrollPosition >= maxScroll - 20) direction = -1;
      else if (scrollPosition <= 20) direction = 1;

      scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
      container.scrollLeft = scrollPosition;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.pageX - container.offsetLeft;
    dragScrollLeftRef.current = container.scrollLeft;
    container.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    container.scrollLeft = dragScrollLeftRef.current - (x - dragStartXRef.current) * 1.2;
  };

  const stopDrag = () => {
    isDraggingRef.current = false;
    if (scrollContainerRef.current) scrollContainerRef.current.style.cursor = "grab";
  };

  if (featuredCerts.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-16 px-6 bg-gradient-to-b from-muted/20 to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Certifications
              </h2>
              <button
                onClick={() => router.push("/certificates")}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                title="View all certificates"
              >
                <ArrowRight className="w-5 h-5 text-foreground/60 hover:text-foreground" />
              </button>
            </div>
            <p className="text-muted-foreground text-sm mt-2">
              Recognized credentials in AI, data science, and digital skills
            </p>
          </div>
        </motion.div>

        {/* Auto-scrolling Carousel */}
        <div className="relative">
          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto pb-2 cursor-grab select-none"
            style={{ scrollbarWidth: "none" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            {featuredCerts.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex-shrink-0 w-56 rounded-xl border border-border bg-card p-3 hover:border-primary/50 transition-colors group hover:shadow-md flex flex-col"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30" />
                      <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">
                        {cert.category?.toUpperCase() || "CERT"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground text-xs line-clamp-2 leading-snug">
                      {cert.name}
                    </h3>
                  </div>
                  {cert.featured && (
                    <span className="text-base flex-shrink-0">⭐</span>
                  )}
                </div>

                <p className="text-[11px] text-muted-foreground mb-1.5">
                  {cert.issuer} · {cert.year}
                </p>

                <p className="text-[11px] text-muted-foreground/80 mb-3 line-clamp-2 flex-1 leading-relaxed">
                  {cert.description}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert(cert);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-[11px] font-medium flex items-center justify-center gap-1.5 mt-auto"
                >
                  <Eye className="w-3 h-3" />
                  View
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* Modal */}
      <CertificatePreviewModal
        certificate={selectedCert}
        isOpen={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
      />
    </>
  );
}
