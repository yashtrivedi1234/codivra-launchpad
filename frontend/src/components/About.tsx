import { motion } from "framer-motion";
import { Target, Users, Lightbulb, Check } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { useGetPageQuery } from "@/lib/api";
import { useTeamCount } from "@/hooks/use-team-count";

export const About = () => {
  const { data } = useGetPageQuery("about");
  const { count, isLoading } = useTeamCount();
  const main = data?.sections.find((s) => s.key === "main")?.data || {};

  const title: string =
    main.title ||
    "Your Trusted Partner in <span class=\"text-gradient\">Digital Innovation</span>";
  const paragraph1: string =
    main.paragraph1 ||
    "Codivra Solutions is a young, service-based IT startup that began its journey in December. We help startups and growing businesses build reliable digital products with clarity and care.";
  const paragraph2: string =
    main.paragraph2 ||
    "As a small and focused team, we work closely with our clients to understand their goals and deliver practical, scalable solutions without unnecessary complexity.";

  const stats =
    main.stats || [
      { value: "Dec 2025", label: "Founded" },
      { value: isLoading ? "..." : `${count}`, label: "Core Team" },
      { value: "10+", label: "Projects Delivered" },
      { value: "Direct", label: "Client Support" },
    ];

  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-[#0A0F1C] to-[#070B14] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-[#00D9FF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-[#0066FF]/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 sm:mb-6"
            >
              <span className="inline-flex items-center gap-2 text-[#00D9FF] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
                <span className="w-6 sm:w-8 h-[2px] bg-gradient-to-r from-transparent to-[#00D9FF]" />
                About Us
              </span>
            </motion.div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 sm:mb-8 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: title.replace('text-gradient', 'text-[#00D9FF]') }}
            />

            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4 sm:mb-6">
              {paragraph1}
            </p>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-8 sm:mb-10">
              {paragraph2}
            </p>

            {/* Values */}
            <div className="space-y-5 sm:space-y-6">
              {[
                { 
                  icon: Target, 
                  title: "Clear Mission", 
                  desc: "Delivering honest, practical technology solutions that help businesses grow." 
                },
                { 
                  icon: Users, 
                  title: "Client Partnership", 
                  desc: "We work as an extended team, not just a service provider." 
                },
                { 
                  icon: Lightbulb, 
                  title: "Smart Innovation", 
                  desc: "Using the right tools and technologies — not hype — to solve real problems." 
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 sm:gap-5 group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF] to-[#0066FF] rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#00D9FF] to-[#0066FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base sm:text-lg mb-1 sm:mb-2">{item.title}</h4>
                    <p className="text-sm sm:text-base text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right Visual */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              {/* Main Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-[#00D9FF]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#0066FF]/20 rounded-full blur-3xl" />

                {/* Stats Grid */}
                <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {stats.map((stat: { value: string; label: string }, index: number) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-white/5 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-28 sm:h-32 lg:h-36 flex flex-col items-center justify-center">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#00D9FF] mb-1 sm:mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-white/60 font-medium tracking-wide">
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
                  className="relative z-10 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10"
                >
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {["Quality Focused", "Agile Process", "24/7 Support"].map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                      >
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#00D9FF]" />
                        <span className="text-xs sm:text-sm text-white/70 font-medium">{badge}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};