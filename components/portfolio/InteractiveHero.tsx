import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
interface InteractiveHeroProps {
  name: string;
  tagline: string;
  positioning: string;
}

export default function InteractiveHero({ name, tagline, positioning }: InteractiveHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.3, y: 0.4, r: 220, color: "59,130,246" }, // builder blue
      { x: 0.7, y: 0.6, r: 200, color: "217,119,6" },   // thinker amber
      { x: 0.5, y: 0.3, r: 180, color: "99,102,241" },   // indigo bridge
    ];

    const draw = () => {
      time += 0.003;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      blobs.forEach((b, i) => {
        const ox = Math.sin(time + i * 2.1) * 60;
        const oy = Math.cos(time * 0.7 + i * 1.4) * 50;
        const cx = b.x * w + ox;
        const cy = b.y * h + oy;
        const pulse = b.r + Math.sin(time * 1.2 + i) * 30;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulse);
        grad.addColorStop(0, `rgba(${b.color},0.25)`);
        grad.addColorStop(0.5, `rgba(${b.color},0.08)`);
        grad.addColorStop(1, `rgba(${b.color},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 text-center max-w-3xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground"
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg sm:text-xl text-muted-foreground"
        >
          {tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base text-muted-foreground/80 max-w-xl mx-auto"
        >
          {positioning}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex items-center justify-center gap-6"
        >
          <a
            href="#builder"
            className="px-6 py-3 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            What I Build
          </a>
          <a
            href="#thinker"
            className="px-6 py-3 rounded-full bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition-colors"
          >
            What I Study
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16"
        >
          <div className="w-px h-12 bg-border mx-auto animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
