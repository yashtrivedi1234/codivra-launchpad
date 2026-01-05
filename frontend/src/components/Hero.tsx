import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Zap, Rocket } from "lucide-react";
import { useGetPageQuery } from "@/lib/api";
import { Link } from "react-router-dom";
import aitdLogo from "@/assets/aitd-logo.png";
import { useState, useEffect } from "react";

const trustedAvatars = [
  { src: aitdLogo, href: "https://aitd-events.club/", label: "AITDS Events" },
  { src: "https://i.pravatar.cc/100?img=24", label: "Client 2" },
  { src: "https://i.pravatar.cc/100?img=36", label: "Client 3" },
  { src: "https://i.pravatar.cc/100?img=48", label: "Client 4" },
  { src: "https://i.pravatar.cc/100?img=60", label: "Client 5" },
];

export const Hero = () => {
  const { data } = useGetPageQuery("home");
  const heroSection = data?.sections.find((s) => s.key === "hero");
  const content = heroSection?.data || {};
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Generate stable particle positions
    const particleCount = isMobile ? 10 : 30;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      left: (i * 37.5) % 100, // Distribute evenly
      top: (i * 23.7) % 100,
      delay: (i * 0.3) % 3,
      duration: 3 + (i % 3),
    }));
    setParticles(newParticles);
  }, [isMobile]);

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
        {/* Gradient Orbs - Optimized for mobile */}
        <motion.div
          className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] rounded-full opacity-[0.15]"
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
          initial={false}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full opacity-[0.12]"
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
          initial={false}
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

        {/* Floating Particles - Reduced on mobile for performance */}
        {!shouldReduceMotion && particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00D9FF] rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            initial={false}
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
            className="inline-flex items-center gap-3 mb-8 mt-8"
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white leading-[0.95] mb-6 sm:mb-8 tracking-tight"
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mb-8 sm:mb-12 leading-relaxed font-light px-2 sm:px-0"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            {subtitle}
          </motion.p>

          {/* Accessible CTA heading to maintain proper heading order */}
          <h2 id="hero-cta-heading" className="sr-only">
            Start your project or view our work
          </h2>
          
          {/* CTA Buttons */}
          <motion.div
            aria-labelledby="hero-cta-heading"
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.7 }}
             className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-12 sm:mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="group relative overflow-hidden bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8 text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,217,255,0.7)] uppercase tracking-wider w-full sm:w-auto"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="whitespace-nowrap">Start Your Project</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border-2 border-white/20 text-white font-bold px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8 text-base sm:text-lg rounded-xl sm:rounded-2xl hover:bg-white/10 hover:border-[#00D9FF]/40 transition-all duration-300 uppercase tracking-wider w-full sm:w-auto"
              >
                <Link to="/portfolio" className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00D9FF]/20 transition-all">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-1" />
                  </div>
                  <span className="whitespace-nowrap">View Our Work</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>


          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="border-t-2 border-white/10 pt-10"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-3 mb-6">
              <div className="flex -space-x-2 sm:-space-x-3">
                {trustedAvatars.map((item, i) => {
                  const avatar = (
                    <motion.div
                      key={item.src}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.1 + i * 0.05, type: "spring" }}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#0A0F1C] overflow-hidden ring-2 ring-[#00D9FF]/40"
                    >
                      <img 
                        src={item.src} 
                        alt={item.label} 
                        className="w-full h-full object-cover" 
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                    </motion.div>
                  );
                  return item.href ? (
                    <a
                      key={item.src}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="block"
                    >
                      {avatar}
                    </a>
                  ) : (
                    avatar
                  );
                })}
              </div>
              <p className="text-xs sm:text-sm text-white/50 font-bold uppercase tracking-wider">
                Trusted by 5+ Industry Leaders
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {[
                { name: "Aitds Events", href: "https://aitd-events.club/" },
                { name: "InnovateCo" },
                { name: "GrowthLabs" },
                { name: "DigitalEdge" },
                { name: "ScaleUp" },
              ].map((company, i) => {
                const sharedProps = {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 1.2 + i * 0.1 },
                  whileHover: { scale: 1.1, opacity: 0.8 },
                  className:
                    "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black text-white/30 hover:text-white/60 transition-all cursor-pointer uppercase tracking-wide",
                  style: { fontFamily: "'Oswald', sans-serif" },
                };

                return company.href ? (
                  <motion.a
                    key={company.name}
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...sharedProps}
                  >
                    {company.name}
                  </motion.a>
                ) : (
                  <motion.span key={company.name} {...sharedProps}>
                    {company.name}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};