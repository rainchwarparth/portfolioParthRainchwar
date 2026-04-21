import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import type { Certificate } from "@/data/types";

interface CertificateCardProps {
  certificate: Certificate;
  index?: number;
  variant?: "grid" | "marquee";
  onView: (cert: Certificate) => void;
}

export default function CertificateCard({
  certificate,
  index = 0,
  variant = "grid",
  onView,
}: CertificateCardProps) {
  const categoryColors: Record<string, { bg: string; text: string }> = {
    programming:   { bg: "bg-blue-500/10",   text: "text-blue-600" },
    data:          { bg: "bg-purple-500/10", text: "text-purple-600" },
    ai:            { bg: "bg-amber-500/10",  text: "text-amber-600" },
    "soft-skills": { bg: "bg-green-500/10",  text: "text-green-600" },
    cloud:         { bg: "bg-sky-500/10",    text: "text-sky-600" },
    achievement:   { bg: "bg-rose-500/10",   text: "text-rose-600" },
    other:         { bg: "bg-gray-500/10",   text: "text-gray-600" },
  };

  const colors = categoryColors[certificate.category || "other"] ?? categoryColors["other"];

  if (variant === "marquee") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="flex-shrink-0 w-80 rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors group h-full flex flex-col"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${colors.bg}`} />
              <span className={`text-xs font-medium ${colors.text}`}>
                {certificate.category?.toUpperCase() || "CERT"}
              </span>
            </div>
            <h3 className="font-semibold text-foreground text-sm line-clamp-2">
              {certificate.name}
            </h3>
          </div>
          {certificate.featured && (
            <div className="text-lg flex-shrink-0">⭐</div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-2">
          {certificate.issuer} · {certificate.year}
        </p>

        <p className="text-xs text-muted-foreground/80 mb-3 line-clamp-2 flex-1">
          {certificate.description}
        </p>

        <button
          onClick={() => onView(certificate)}
          className="w-full px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs font-medium flex items-center justify-center gap-2 mt-auto"
        >
          <Eye className="w-3.5 h-3.5" />
          View Certificate
        </button>
      </motion.div>
    );
  }

  // Grid variant
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="relative rounded-xl border border-border bg-gradient-to-br from-muted/40 to-muted/10 p-4 hover:border-primary/30 hover:shadow-sm transition-all group cursor-pointer h-full flex flex-col"
      onClick={() => onView(certificate)}
    >
      {/* Category badge */}
      {certificate.category && (
        <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium ${colors.bg} ${colors.text}`}>
          {certificate.category.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Featured badge */}
      {certificate.featured && (
        <div className="absolute top-3 left-3 text-sm">⭐</div>
      )}

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3">
          <span className="text-lg font-bold text-muted-foreground/50">
            {certificate.issuer.charAt(0)}
          </span>
        </div>

        <h3 className="font-semibold text-foreground text-sm mb-1 leading-tight line-clamp-2">
          {certificate.name}
        </h3>

        <p className="text-xs text-muted-foreground mb-2">
          {certificate.issuer} · {certificate.year}
        </p>

        {certificate.description && (
          <p className="text-xs text-muted-foreground/70 mb-3 line-clamp-2">
            {certificate.description}
          </p>
        )}
      </div>

      {/* View button - always at bottom */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onView(certificate);
        }}
        className="w-full px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-medium flex items-center justify-center gap-1.5 mt-auto"
      >
        <Eye className="w-3.5 h-3.5" />
        View
      </button>
    </motion.div>
  );
}
