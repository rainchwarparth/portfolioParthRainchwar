import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Trophy } from "lucide-react";
import type { CommunityWork, Certificate } from "@/data/types";
import CertificatePreviewModal from "./CertificatePreviewModal";

interface CredentialsSectionProps {
  communityWork: CommunityWork[];
  certifications: Certificate[];
}

const CredentialsSection = ({ communityWork, certifications }: CredentialsSectionProps) => {
  const achievements = certifications.filter((c) => c.category === "achievement");

  const tabs = achievements.map((a) => ({
    id: a.id,
    label: a.name.split("—")[0].split("·")[0].trim(),
    icon: Trophy,
  }));

  const [activeTab, setActiveTab] = useState(achievements[0]?.id ?? "");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const activeCert = achievements.find((a) => a.id === activeTab) ?? null;

  return (
    <>
      <section id="credentials" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-12">
              Achievements & Credentials
            </h2>
          </motion.div>

          {/* Unified tabbed card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 border border-border rounded-xl overflow-hidden"
          >
            {/* Tab bar */}
            <div className="flex overflow-x-auto border-b border-border bg-muted/30" style={{ scrollbarWidth: "none" }}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0 ${
                      isActive
                        ? "border-primary text-foreground bg-background"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeCert ? (
                <motion.div
                  key={activeCert.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col md:flex-row min-h-[320px]"
                >
                  {activeCert.fileName && (
                    <div className="md:w-[44%] bg-white dark:bg-white/5 flex items-center justify-center border-b md:border-b-0 md:border-r border-border p-6">
                      <img
                        src={activeCert.fileName}
                        alt={activeCert.name}
                        className="max-h-64 w-full object-contain"
                      />
                    </div>
                  )}

                  <div className="flex-1 p-6 md:p-8 flex flex-col">
                    <div className="flex-1">
                      <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full mb-4">
                        Achievement
                      </span>
                      <h3 className="text-xl font-semibold text-foreground mb-2 leading-snug">
                        {activeCert.name}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {activeCert.issuer}
                      </p>
                      {activeCert.year && (
                        <p className="text-xs text-muted-foreground/70 mb-5">
                          {activeCert.year}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {activeCert.description}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedCert(activeCert)}
                      className="mt-6 self-start flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View Full Certificate
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>

          {/* Community work */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h3 className="text-base font-semibold text-foreground mb-6">
              Community Impact
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {communityWork.map((item) => (
                <div
                  key={item.name}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  {item.certificate && (
                    <img
                      src={item.certificate}
                      alt={`${item.name} membership certificate`}
                      className="w-full object-cover h-36"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                  )}
                  <div className="p-5">
                    <h4 className="text-sm font-medium text-foreground mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CertificatePreviewModal
        certificate={selectedCert}
        isOpen={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
      />
    </>
  );
};

export default CredentialsSection;
