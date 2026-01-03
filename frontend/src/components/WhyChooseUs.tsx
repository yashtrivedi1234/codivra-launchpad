import { motion } from "framer-motion";
import { Shield, Clock, Headphones, Award, Zap, Heart, Sparkles, TrendingUp, Rocket } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import { useTeamCount } from "@/hooks/use-team-count";

const reasons = [
  {
    icon: Heart,
    title: "Founder-Led Team",
    description: "Work directly with the founders and core team members who are personally involved in every project.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Zap,
    title: "Agile & Flexible",
    description: "As a young startup, we adapt quickly to your requirements and iterate fast without rigid processes.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Honest Commitment",
    description: "We commit only to what we can deliver and focus on building long-term trust with our clients.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Clear timelines, regular updates, and disciplined execution to ensure timely delivery.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Headphones,
    title: "Direct Communication",
    description: "No middle layers — you communicate directly with developers and decision-makers.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Award,
    title: "Quality-Focused Start",
    description: "We may be new, but we follow best practices to deliver clean, scalable, and maintainable solutions.",
    color: "from-[#00D9FF] to-[#0066FF]"
  },
];

const staticStats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "100%", label: "Client Commitment" },
];

const services = [
  {
    title: "Website Development",
    description: "Modern, responsive websites tailored to your business needs.",
    icon: Rocket,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Web & App Development",
    description: "Custom web apps and dashboards built for performance and scale.",
    icon: Zap,
    color: "from-[#00D9FF] to-[#0066FF]"
  },
  {
    title: "UI/UX & Design",
    description: "Clean, user-friendly designs focused on usability and branding.",
    icon: Award,
    color: "from-purple-500 to-pink-500"
  },
];

export const WhyChooseUs = () => {
  const { count, isLoading } = useTeamCount();
  const stats = [
    { value: "Dec 2025", label: "Founded" },
    { value: isLoading ? "..." : `${count}`, label: "Core Team Members" },
    ...staticStats,
  ].slice(0, 4);

  return (
    <section id="why-us" className="relative py-24 md:py-32 bg-gradient-to-b from-[#0A0F1C] to-[#070B14] overflow-hidden">
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
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-5xl mx-auto mb-16">
          <motion.div 
            className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 border border-[#00D9FF]/30 rounded-full px-6 py-3"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
            <span className="text-[#00D9FF] font-bold text-sm tracking-[0.15em] uppercase">
              Why Choose Us
            </span>
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
          </motion.div>

          <h2
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
          >
            WHY CLIENTS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
              CHOOSE OUR STARTUP
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
            A small, dedicated service-based startup focused on quality, transparency, and long-term partnerships
          </p>
        </AnimatedSection>

        {/* Stats Bar */}
        <AnimatedSection className="mb-20">
          <div className="relative max-w-6xl mx-auto">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 rounded-[2rem] blur-2xl"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="relative bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 backdrop-blur-xl border-2 border-[#00D9FF]/30 rounded-[2rem] p-10">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-6 h-6 text-[#00D9FF]" />
                <h3 
                  className="text-2xl font-black text-white uppercase tracking-wider" 
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  By The Numbers
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label + '-' + index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="text-center"
                  >
                    <div 
                      className="text-5xl md:text-6xl font-black text-[#00D9FF] mb-2" 
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60 font-bold uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Services Cards */}
        <AnimatedStagger className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {services.map((service, idx) => (
            <AnimatedItem key={service.title}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                <div className={`absolute -inset-1 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-2xl`} />
                
                <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-2xl p-8 text-center group-hover:border-white/30 transition-all duration-500 h-full flex flex-col">
                  <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 
                    className="text-xl font-black text-white mb-3 group-hover:text-[#00D9FF] transition-colors uppercase tracking-wide"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed font-light flex-1" style={{ fontFamily: "'Crimson Pro', serif" }}>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>

        {/* Reasons Grid */}
        <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reasons.map((reason, idx) => (
            <AnimatedItem key={reason.title}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                <div className={`absolute -inset-1 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-2xl`} />
                
                <div className="relative flex gap-5 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-2xl p-6 group-hover:border-white/30 transition-all duration-500 h-full">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <reason.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="font-black text-white text-lg mb-2 uppercase tracking-wide" 
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {reason.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>

      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&display=swap');
      `}</style>
    </section>
  );
};