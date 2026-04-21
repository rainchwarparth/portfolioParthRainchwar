import { useState } from "react";
import { motion } from "framer-motion";
import type { Certificate } from "@/data/types";
import CertificateCard from "./CertificateCard";
import CertificatePreviewModal from "./CertificatePreviewModal";

interface CertificatesShowcaseProps {
  certificates: Certificate[];
}

export default function CertificatesShowcase({
  certificates,
}: CertificatesShowcaseProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all unique categories
  const categories = Array.from(
    new Set(certificates.map((c) => c.category).filter(Boolean))
  ) as string[];

  // Filter certificates by selected category
  const filtered = selectedCategory
    ? certificates.filter((c) => c.category === selectedCategory)
    : certificates;

  // Sort by year (newest first)
  const sorted = [...filtered].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  const categoryNames: Record<string, string> = {
    programming: "Programming",
    data: "Data Science",
    ai: "Artificial Intelligence",
    "soft-skills": "Soft Skills",
    cloud: "Cloud Services",
    achievement: "Achievements & Awards",
    "side-quest": "Side Quests",
    other: "Other",
  };

  return (
    <>
      <section id="certificates" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              All Certifications
            </h2>
            <p className="text-muted-foreground">
              {sorted.length} credentials across{" "}
              {categories.length} categories
            </p>
          </motion.div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All ({certificates.length})
            </button>
            {categories.map((cat) => {
              const count = certificates.filter((c) => c.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {categoryNames[cat]} ({count})
                </button>
              );
            })}
          </div>

          {/* Certificates Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[1fr]"
          >
            {sorted.map((cert, i) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                index={i}
                variant="grid"
                onView={setSelectedCert}
              />
            ))}
          </motion.div>

          {/* Empty state */}
          {sorted.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                No certifications in this category
              </p>
            </motion.div>
          )}
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
