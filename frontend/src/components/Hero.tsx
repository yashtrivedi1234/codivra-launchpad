import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useGetPageQuery } from "@/lib/api";
import { Link } from "react-router-dom";

export const Hero = () => {
  const { data } = useGetPageQuery("home");
  const heroSection = data?.sections.find((s) => s.key === "hero");
  const content = heroSection?.data || {};

  const title: string =
    content.title ||
    "Build Your Digital Future with Codivra Solution";
  const subtitle: string =
    content.subtitle ||
    "We craft innovative web solutions, custom software, and digital strategies that drive business growth. Your trusted IT partner for scalable success.";
  const badge: string =
    content.badge || "Transforming Ideas into Digital Excellence";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1C]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #00D9FF 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #0066FF 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #00D9FF 1px, transparent 1px),
              linear-gradient(to bottom, #00D9FF 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00D9FF] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-4 mt-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] blur-xl opacity-50" />
              <div className="relative flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white px-5 py-2.5 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                <span>{badge}</span>
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span
              className="block"
              dangerouslySetInnerHTML={{ __html: title.split(" ").slice(0, 3).join(" ") }}
            />
            <span className="block bg-gradient-to-r from-[#00D9FF] via-[#0099FF] to-[#0066FF] bg-clip-text text-transparent">
              {title.split(" ").slice(3).join(" ")}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mb-12 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16"
          >
            <Button
              asChild
              className="group relative overflow-hidden bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-bold px-8 py-7 text-lg rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] hover:scale-105"
            >
              <Link to="/contact" className="flex items-center gap-3">
                Start Your Project
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              className="group relative bg-white/5 backdrop-blur-sm border-2 border-white/10 text-white font-semibold px-8 py-7 text-lg rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Link to="/portfolio" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                Watch Demo
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="border-t border-white/10 pt-10"
          >
            <p className="text-sm text-white/50 mb-6 tracking-wider uppercase">
              Trusted by Industry Leaders
            </p>
            <div className="flex flex-wrap items-center gap-8 lg:gap-12">
              {["TechStart", "InnovateCo", "GrowthLabs", "DigitalEdge", "ScaleUp"].map(
                (company, i) => (
                  <motion.span
                    key={company}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="text-xl lg:text-2xl font-bold text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {company}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-white/50 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Import Outfit font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Inter:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
};