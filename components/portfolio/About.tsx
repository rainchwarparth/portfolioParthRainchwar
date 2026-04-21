import { motion } from "framer-motion";
import CurrentStatusBadges from "./CurrentStatusBadges";
import type { CurrentStatusEntry } from "@/data/types";

interface AboutProps {
  paragraphs: string[];
  techStack: string[];
  statusEntries?: CurrentStatusEntry[];
}

const About = ({ paragraphs, techStack, statusEntries }: AboutProps) => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
            About
          </h2>
          <div className="space-y-4">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className="text-lg md:text-xl text-foreground/80 leading-relaxed"
              >
                {text}
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm text-muted-foreground bg-secondary rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          {statusEntries && statusEntries.length > 0 && (
            <div className="mt-16">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Currently
              </h3>
              <CurrentStatusBadges entries={statusEntries} variant="card" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
