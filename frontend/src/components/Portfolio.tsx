import { ExternalLink, Sparkles, Eye, ArrowRight, Zap } from "lucide-react";
import { useGetPortfolioQuery } from "@/lib/api";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Portfolio = () => {
  const { data, isLoading } = useGetPortfolioQuery();
  const projects = data?.items || [];
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Mount state for hydration
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Smooth scroll progress with Framer Motion
  const { scrollYProgress } = useScroll(
    isMounted && sectionRef.current
      ? {
          target: sectionRef,
          offset: ["start end", "end start"],
        }
      : {}
  );

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    if (!sectionRef.current || isLoading || projects.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate section header
      gsap.from(headerRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate project cards with stagger
      const cards = gridRef.current?.querySelectorAll(".portfolio-card");
      if (cards) {
        gsap.from(cards, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          stagger: {
            amount: 0.6,
            from: "start",
            ease: "power2.out"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            end: "top 40%",
            toggleActions: "play none none reverse"
          }
        });

        // Parallax effect on images
        cards.forEach((card) => {
          const img = card.querySelector(".portfolio-image");
          if (img) {
            gsap.to(img, {
              yPercent: -15,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, projects]);

  if (isLoading) {
    return (
      <section id="portfolio" className="relative py-32 bg-[#0A0F1C]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <motion.div 
                  className="absolute inset-0 border-4 border-[#00D9FF]/30 rounded-full"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute inset-2 border-4 border-[#0066FF] rounded-full border-t-transparent"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <motion.p 
                className="text-white/60 font-semibold text-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading Portfolio...
              </motion.p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-24 md:py-32 bg-[#0A0F1C] overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[#00D9FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="text-center max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 border border-[#00D9FF]/30 rounded-full px-6 py-3"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
            <span className="text-[#00D9FF] font-bold text-sm tracking-[0.15em] uppercase">
              Our Work
            </span>
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
          </motion.div>

          <h2
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
          >
            FEATURED
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
              PROJECTS
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
            Sample work representing the type of services we provide to startups and growing businesses
          </p>
        </motion.div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 flex items-center justify-center mx-auto mb-6">
              <Eye className="w-12 h-12 text-[#00D9FF]" />
            </div>
            <h3 
              className="text-2xl font-black text-white mb-4 uppercase tracking-wide" 
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Coming Soon
            </h3>
            <p className="text-white/60 text-lg max-w-md mx-auto" style={{ fontFamily: "'Crimson Pro', serif" }}>
              We're currently curating our portfolio. Check back soon to see our latest work.
            </p>
          </motion.div>
        ) : (
          <div
            ref={gridRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {projects.map((project, index) => (
              <PortfolioCard
                key={project._id}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&display=swap');
      `}</style>
    </section>
  );
};

interface PortfolioCardProps {
  project: {
    _id: string;
    title: string;
    category: string;
    image?: string;
    link?: string;
  };
  index: number;
}

const PortfolioCard = ({ project, index }: PortfolioCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      const card = cardRef.current;
      const glow = card?.querySelector(".card-glow");
      const image = card?.querySelector(".portfolio-image");
      const badge = card?.querySelector(".category-badge");
      const overlay = card?.querySelector(".hover-overlay");

      card?.addEventListener("mouseenter", () => {
        gsap.to(glow, { opacity: 1, scale: 1.05, duration: 0.6, ease: "power2.out" });
        gsap.to(image, { scale: 1.15, duration: 0.8, ease: "power2.out" });
        gsap.to(badge, { y: -8, scale: 1.05, duration: 0.4, ease: "back.out(2)" });
        gsap.to(overlay, { opacity: 1, duration: 0.4 });
      });

      card?.addEventListener("mouseleave", () => {
        gsap.to(glow, { opacity: 0, scale: 1, duration: 0.6, ease: "power2.out" });
        gsap.to(image, { scale: 1, duration: 0.8, ease: "power2.out" });
        gsap.to(badge, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(overlay, { opacity: 0, duration: 0.4 });
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const CardContent = (
    <motion.div
      ref={cardRef}
      className="portfolio-card group relative h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Glow Effect */}
      <div className="card-glow absolute -inset-1 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 rounded-3xl blur-xl opacity-0 transition-all duration-500" />

      {/* Card */}
      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-3xl overflow-hidden group-hover:border-[#00D9FF]/40 transition-all duration-500 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0F1C]">
          {project.image ? (
            <div className="portfolio-image w-full h-full">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 flex items-center justify-center">
              <div className="text-center">
                <Eye className="w-12 h-12 text-white/30 mx-auto mb-3" />
                <span className="text-white/30 text-sm font-semibold uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/50 to-transparent" />

          {/* Hover Overlay */}
          <div className="hover-overlay absolute inset-0 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 opacity-0 transition-opacity duration-500" />

          {/* Category Badge */}
          <motion.div 
            className="category-badge absolute top-4 left-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(0,217,255,0.4)]">
              <Zap className="w-3 h-3" />
              {project.category}
            </div>
          </motion.div>

          {/* View Project Icon */}
          {project.link && (
            <motion.div
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              whileHover={{ scale: 1.1, rotate: 45 }}
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 
            className="text-xl lg:text-2xl font-black text-white mb-3 leading-tight group-hover:text-[#00D9FF] transition-colors duration-300"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {project.title}
          </h3>
          
          <p className="text-white/60 text-sm leading-relaxed flex-1 font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
            {project.link 
              ? "View complete project details and case study" 
              : "Project showcase - details available upon request"
            }
          </p>

          {/* View Button */}
          <div className="pt-4 mt-4 border-t-2 border-white/10 flex items-center justify-between">
            <span className="text-[#00D9FF] font-bold text-sm uppercase tracking-wider group-hover:tracking-[0.15em] transition-all">
              {project.link ? "View Project" : "Learn More"}
            </span>
            <motion.div
              className="w-10 h-10 rounded-full bg-[#00D9FF]/10 group-hover:bg-[#00D9FF]/20 flex items-center justify-center border border-[#00D9FF]/30"
              whileHover={{ rotate: 45 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRight className="w-5 h-5 text-[#00D9FF]" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1C] rounded-3xl"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

// CSS to add to your globals.css or component styles
const portfolioStyles = `
.portfolio-card {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.portfolio-image {
  will-change: transform;
  transform: translateZ(0);
}

.card-glow {
  will-change: opacity, transform;
  transform: translateZ(0);
}

.portfolio-card:focus-within {
  outline: 2px solid #00D9FF;
  outline-offset: 4px;
}

a.block:focus {
  outline: 2px solid #00D9FF;
  outline-offset: 2px;
  border-radius: 24px;
}

@media (max-width: 768px) {
  .portfolio-card {
    transform: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .portfolio-card,
  .portfolio-image,
  .card-glow {
    transform: none !important;
    animation: none !important;
  }
}

@media (prefers-contrast: high) {
  .portfolio-card {
    border-width: 3px;
  }
  
  .card-glow {
    display: none;
  }
}
`;