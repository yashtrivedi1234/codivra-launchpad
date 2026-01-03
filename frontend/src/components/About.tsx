import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Users, Lightbulb, Check, Sparkles, TrendingUp } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { useGetPageQuery } from "@/lib/api";
import { useTeamCount } from "@/hooks/use-team-count";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const About = () => {
  const { data } = useGetPageQuery("about");
  const { count, isLoading } = useTeamCount();
  const main = data?.sections.find((s) => s.key === "main")?.data || {};
  
  const sectionRef = useRef<HTMLElement>(null);
  const statsCardRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  const title: string =
    main.title ||
    "Why Clients Choose <span class=\"text-gradient\">Our Startup</span>";
  const paragraph1: string =
    main.paragraph1 ||
    "A small, dedicated service-based startup focused on quality, transparency, and long-term partnerships.";
  const paragraph2: string =
    main.paragraph2 ||
    "We prioritize delivering value over volume, working closely with each client to understand their unique needs and build solutions that truly make a difference.";

  const stats =
    main.stats || [
      { value: isLoading ? "..." : `${count}`, label: "Core Team" },
      { value: "10+", label: "Projects Delivered" },
      { value: "100%", label: "Client Satisfaction" },
      { value: "Dec 2024", label: "Founded" },
    ];

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats
      if (statsCardRef.current) {
        gsap.fromTo(
          statsCardRef.current.querySelectorAll(".stat-item"),
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsCardRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate values
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.querySelectorAll(".value-item"),
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    { 
      icon: Target, 
      title: "Clear Mission", 
      desc: "Delivering honest, practical technology solutions that help businesses grow.",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Users, 
      title: "Client Partnership", 
      desc: "We work as an extended team, not just a service provider.",
      color: "from-[#00D9FF] to-[#0066FF]"
    },
    { 
      icon: Lightbulb, 
      title: "Smart Innovation", 
      desc: "Using the right tools and technologies — not hype — to solve real problems.",
      color: "from-purple-500 to-pink-500"
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#0A0F1C] to-[#070B14] overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#00D9FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div>
            <AnimatedSection>
              <motion.div 
                className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 border border-[#00D9FF]/30 rounded-full px-6 py-3"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                <span className="text-[#00D9FF] font-bold text-sm tracking-[0.15em] uppercase">
                  About Us
                </span>
              </motion.div>

              <motion.h2
                className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                WHY CLIENTS
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
                  CHOOSE US
                </span>
              </motion.h2>

              <motion.p 
                className="text-xl text-white/70 leading-relaxed mb-6 font-light"
                style={{ fontFamily: "'Crimson Pro', serif" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {paragraph1}
              </motion.p>
              <motion.p 
                className="text-lg text-white/60 leading-relaxed mb-10 font-light"
                style={{ fontFamily: "'Crimson Pro', serif" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {paragraph2}
              </motion.p>

              {/* Values */}
              <div ref={valuesRef} className="space-y-6">
                {values.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="value-item group relative"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    whileHover={{ x: 8 }}
                  >
                    {/* Glow */}
                    <div className={`absolute -inset-1 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-2xl`} />
                    
                    <div className="relative flex gap-5 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-2xl p-6 group-hover:border-white/30 transition-all">
                      <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 
                          className="font-black text-white text-xl mb-2 uppercase tracking-wide" 
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          {item.title}
                        </h4>
                        <p className="text-base text-white/70 leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right Stats Visual */}
          <div>
            <AnimatedSection delay={0.2}>
              <div className="relative">
                {/* Main Stats Card */}
                <motion.div
                  ref={statsCardRef}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  {/* Glow */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 rounded-[2rem] blur-2xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <div className="relative bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 backdrop-blur-xl border-2 border-[#00D9FF]/30 rounded-[2rem] p-10 overflow-visible">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                      <TrendingUp className="w-6 h-6 text-[#00D9FF]" />
                      <h3 
                        className="text-2xl font-black text-white uppercase tracking-wider" 
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        Our Stats
                      </h3>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {stats.map((stat: { value: string; label: string }, index: number) => (
                        <motion.div
                          key={stat.label}
                          className="stat-item relative group"
                          whileHover={{ y: -5, scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="relative bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-[#00D9FF]/40 transition-all duration-300">
                            <motion.div 
                              className="text-5xl font-black text-[#00D9FF] mb-2" 
                              style={{ fontFamily: "'Oswald', sans-serif" }}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ 
                                type: "spring",
                                stiffness: 200,
                                delay: 0.5 + index * 0.1 
                              }}
                            >
                              {stat.value}
                            </motion.div>
                            <div className="text-sm text-white/60 font-bold uppercase tracking-wider">
                              {stat.label}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Achievement Badges */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="pt-8 border-t-2 border-white/20"
                    >
                      <div className="flex flex-wrap gap-3">
                        {["Quality Focused", "Agile Process", "24/7 Support"].map((badge, idx) => (
                          <motion.div
                            key={badge}
                            className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border-2 border-white/20 px-4 py-2 rounded-full cursor-pointer group"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 + idx * 0.1 }}
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: "rgba(0, 217, 255, 0.1)",
                              borderColor: "rgba(0, 217, 255, 0.4)"
                            }}
                          >
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#0066FF] flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                            <span className="text-sm text-white/80 font-bold uppercase tracking-wider">
                              {badge}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&display=swap');
      `}</style>
    </section>
  );
};