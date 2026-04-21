import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

interface ContactSectionProps {
  profile: { name: string; email: string; github: string; linkedin: string };
}

const ContactSection = ({ profile }: ContactSectionProps) => {
  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Let's connect
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Whether it's a technical challenge, research collaboration, or
            community initiative — I'm always open to meaningful conversations.
          </p>

          <div className="flex items-center justify-center gap-6">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>

      <footer className="mt-16 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </section>
  );
};

export default ContactSection;
