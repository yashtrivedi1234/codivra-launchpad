import { ExternalLink, Sparkles, Eye, ArrowRight, Zap } from "lucide-react";
import { useGetPortfolioQuery } from "@/lib/api";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const Portfolio = () => {
  const { data, isLoading } = useGetPortfolioQuery();
  const [projects, setProjects] = useState<any[]>([]);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  // Prevent GSAP double-init in React 18 StrictMode dev
  const gsapInitializedRef = useRef(false);

  // Sync data ONCE when it arrives
  useEffect(() => {
    if (data?.items?.length) {
      setProjects(data.items);
    }
  }, [data]);

  // No longer need to refresh ScrollTrigger after images load for reveal


  useLayoutEffect(() => {
    if (
      typeof window === "undefined" ||
      !sectionRef.current ||
      projects.length === 0 ||
      gsapInitializedRef.current
    ) {
      return;
    }
    gsapInitializedRef.current = true;

    const ctx = gsap.context(() => {
      // GSAP background animation
      gsap.to(".portfolio-bg-1", {
        scale: 1.2,
        opacity: 0.05,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      gsap.to(".portfolio-bg-2", {
        scale: 1.15,
        opacity: 0.05,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Animate section header (NO ScrollTrigger, just play once)
      gsap.from(headerRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Animate project cards with stagger (NO ScrollTrigger, just play once)
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
        });

        // Parallax effect on images (KEEP ScrollTrigger for parallax only)
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
      // No need for ScrollTrigger.refresh here
    }, sectionRef);

    return () => {
      // Prevent cleanup in React 18 StrictMode dev double-mount
      if (process.env.NODE_ENV === "production") {
        ctx.revert();
      }
    };
  }, [projects.length]);

  if (isLoading) {
    return (
      <section
        ref={sectionRef}
        id="portfolio"
        className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-[#0A0F1C]"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div 
                  className="absolute inset-0 border-4 border-[#00D9FF]/30 rounded-full"
                />
                <div 
                  className="absolute inset-2 border-4 border-[#0066FF] rounded-full border-t-transparent"
                />
              </div>
              <p 
                className="text-white/60 font-semibold text-lg"
              >
                Loading Portfolio...
              </p>
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
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-[#0A0F1C]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="portfolio-bg-1 absolute top-1/4 right-0 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-[#00D9FF]/3 rounded-full blur-[150px]" />
        <div className="portfolio-bg-2 absolute bottom-1/4 left-0 w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] bg-[#0066FF]/3 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center max-w-5xl mx-auto mb-16"
          style={{ opacity: 1, transform: "none" }}
        >
          <div 
            className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 border border-[#00D9FF]/30 rounded-full px-6 py-3"
          >
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
            <span className="text-[#00D9FF] font-bold text-sm tracking-[0.15em] uppercase">
              Our Work
            </span>
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 leading-[0.95] tracking-tight text-center px-2 sm:px-0"
            style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
          >
            FEATURED{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
              PROJECTS
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light px-4 sm:px-0" style={{ fontFamily: "'Crimson Pro', serif" }}>
            Sample work representing the type of services we provide to startups and growing businesses
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div
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
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto"
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

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      const card = cardRef.current!;
      const glow = card.querySelector(".card-glow");
      const image = card.querySelector(".portfolio-image");
      const badge = card.querySelector(".category-badge");
      const overlay = card.querySelector(".hover-overlay");

      const tl = gsap.timeline({ paused: true });

      tl.to(glow, { opacity: 1, scale: 1.05, duration: 0.4 })
        .to(image, { scale: 1.15, duration: 0.6 }, 0)
        .to(badge, { y: -8, scale: 1.05, duration: 0.3 }, 0)
        .to(overlay, { opacity: 1, duration: 0.3 }, 0);

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const CardContent = (
    <div
      ref={cardRef}
      className="portfolio-card group relative h-full"
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
                decoding="async"
                fetchPriority="low"
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
          <div 
            className="category-badge absolute top-4 left-4"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(0,217,255,0.4)]">
              <Zap className="w-3 h-3" />
              {project.category}
            </div>
          </div>

          {/* View Project Icon */}
          {project.link && (
            <div
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
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
          
          <div className="flex-1" />

          {/* View Button */}
          <div className="pt-4 mt-4 border-t-2 border-white/10 flex items-center justify-between">
            {project.link ? (
              <>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00D9FF] font-bold text-sm uppercase tracking-wider hover:tracking-[0.15em] transition-all hover:underline underline-offset-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project
                </Link>
                <div
                  onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                  className="w-10 h-10 rounded-full bg-[#00D9FF]/10 hover:bg-[#00D9FF]/20 flex items-center justify-center border border-[#00D9FF]/30 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowRight className="w-5 h-5 text-[#00D9FF]" />
                </div>
              </>
            ) : (
              <>
                <span className="text-[#00D9FF] font-bold text-sm uppercase tracking-wider group-hover:tracking-[0.15em] transition-all">
                  Learn More
                </span>
                <div
                  className="w-10 h-10 rounded-full bg-[#00D9FF]/10 group-hover:bg-[#00D9FF]/20 flex items-center justify-center border border-[#00D9FF]/30"
                >
                  <ArrowRight className="w-5 h-5 text-[#00D9FF]" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (project.link) {
    return (
      <div 
        onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1C] rounded-3xl cursor-pointer"
      >
        {CardContent}
      </div>
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