import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import type { Certificate } from "@/data/types";

interface CertificatePreviewModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificatePreviewModal({
  certificate,
  isOpen,
  onClose,
}: CertificatePreviewModalProps) {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-8 z-50 flex flex-col bg-background rounded-lg border border-border overflow-hidden max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30 flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {certificate.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {certificate.issuer} · {certificate.year}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Content - Certificate Image */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-muted/10 to-muted/20">
              {certificate.fileName && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mx-auto w-full max-w-3xl"
                >
                  <img
                    src={certificate.fileName}
                    alt={certificate.name}
                    className="w-full h-auto rounded-lg border border-border shadow-2xl"
                  />
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-6 flex items-center justify-between bg-muted/30 flex-shrink-0">
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">{certificate.issuer}</span> • {certificate.year}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium"
                >
                  Close
                </button>
                {certificate.fileName && (
                  <a
                    href={certificate.fileName}
                    download={`${certificate.id}.png`}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
