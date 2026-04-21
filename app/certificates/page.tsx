"use client";

import { motion } from "framer-motion";
import { certificates } from "@/data";
import CertificatesShowcase from "@/components/portfolio/CertificatesShowcase";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { navLinks } from "@/lib/navLinks";

export default function CertificatesPage() {
  return (
    <>
      <Navbar links={navLinks} />
      <main className="min-h-screen bg-background">
        <div className="pt-20 pb-12 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Certifications
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Recognized credentials in AI, data science, programming, and professional development.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {certificates.length} total credentials — certifications, achievements, and awards across psychology, technology, and business domains.
            </p>
          </motion.div>
        </div>

        <CertificatesShowcase certificates={certificates} />
      </main>
      <Footer />
    </>
  );
}
