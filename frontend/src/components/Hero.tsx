import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Zap, Rocket } from "lucide-react";
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
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-[0.15]"
          style={{
            background: "radial-gradient(circle, #00D9FF 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.12]"
          style={{
            background: "radial-gradient(circle, #0066FF 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #00D9FF 1px, transparent 1px),
              linear-gradient(to bottom, #00D9FF 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
          animate={{ 
            backgroundPosition: ["0px 0px", "80px 80px"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00D9FF] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] blur-xl opacity-60"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-3 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 backdrop-blur-sm border-2 border-[#00D9FF]/30 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(0,217,255,0.3)]">
                <Sparkles className="w-5 h-5 text-[#00D9FF]" />
                <span className="text-sm">{badge}</span>
                <Zap className="w-5 h-5 text-[#00D9FF]" />
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.95] mb-8 tracking-tight"
              style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                BUILD YOUR
              </motion.span>
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#0099FF] to-[#0066FF]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                DIGITAL FUTURE
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mb-12 leading-relaxed font-light"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="group relative overflow-hidden bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-10 py-8 text-lg rounded-2xl transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,217,255,0.7)] uppercase tracking-wider"
              >
                <Link to="#contact" className="flex items-center gap-3">
                  <Rocket className="w-6 h-6" />
                  Start Your Project
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border-2 border-white/20 text-white font-bold px-10 py-8 text-lg rounded-2xl hover:bg-white/10 hover:border-[#00D9FF]/40 transition-all duration-300 uppercase tracking-wider"
              >
                <Link to="#portfolio" className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00D9FF]/20 transition-all">
                    <Play className="w-5 h-5 fill-white ml-1" />
                  </div>
                  View Our Work
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {[
              { value: "50+", label: "Happy Clients" },
              { value: "100+", label: "Projects Done" },
              { value: "24/7", label: "Support" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + (i * 0.1), type: "spring" }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-2xl p-6 text-center group-hover:border-[#00D9FF]/40 transition-all">
                  <div 
                    className="text-4xl font-black text-[#00D9FF] mb-2" 
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60 font-bold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="border-t-2 border-white/10 pt-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.1 + (i * 0.05), type: "spring" }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D9FF]/30 to-[#0066FF]/30 border-2 border-[#0A0F1C] flex items-center justify-center"
                  >
                    <span className="text-white/60 text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-white/50 font-bold uppercase tracking-wider">
                Trusted by 50+ Industry Leaders
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-8 lg:gap-12">
              {["Aitds Events", "InnovateCo", "GrowthLabs", "DigitalEdge", "ScaleUp"].map(
                (company, i) => (
                  <motion.span
                    key={company}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    whileHover={{ scale: 1.1, opacity: 0.8 }}
                    className="text-xl lg:text-2xl font-black text-white/30 hover:text-white/60 transition-all cursor-pointer uppercase tracking-wide"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs font-bold uppercase tracking-wider">
            Scroll
          </span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-2.5 bg-gradient-to-b from-[#00D9FF] to-[#0066FF] rounded-full"
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&display=swap');
      `}</style>
    </section>
  );
};