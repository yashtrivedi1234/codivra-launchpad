import { Loader2, Sparkles, Users as UsersIcon, Award, Mail, Linkedin } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import { useGetTeamQuery } from "@/lib/api";
import { motion } from "framer-motion";

export const Team = () => {
  const { data, isLoading } = useGetTeamQuery();
  const teamMembers = data?.items && data.items.length > 0
    ? data.items.map((member) => ({
        name: member.name,
        role: member.role,
        image: member.image,
      }))
    : [];

  return (
    <section id="team" className="relative py-24 md:py-32 bg-[#0A0F1C] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-[#00D9FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-[150px]"
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
              Our Team
            </span>
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
          </motion.div>

          <h2
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
          >
            MEET THE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
              EXPERTS
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
            A talented team of professionals dedicated to delivering exceptional results for your business
          </p>
        </AnimatedSection>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-20 h-20 mb-6">
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
            <p className="text-white/60 font-semibold text-lg">Loading team...</p>
          </div>
        )}

        {/* Team Grid */}
        {!isLoading && teamMembers.length > 0 && (
          <AnimatedStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {teamMembers.map((member, idx) => (
              <AnimatedItem key={member.name}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -12 }}
                  className="group relative h-full"
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-3xl overflow-hidden group-hover:border-[#00D9FF]/40 transition-all duration-500 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                      {member.image ? (
                        <>
                          <motion.img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.6 }}
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#0066FF] flex items-center justify-center"
                          >
                            <span className="text-5xl font-black text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
                              {member.name.charAt(0)}
                            </span>
                          </motion.div>
                        </div>
                      )}

                      {/* Floating Badge */}
                      <motion.div 
                        className="absolute top-4 right-4"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", delay: 0.3 + (idx * 0.05) }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-[#00D9FF] to-[#0066FF] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.5)]">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 
                        className="text-xl font-black text-white mb-2 uppercase tracking-wide group-hover:text-[#00D9FF] transition-colors"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        {member.name}
                      </h3>
                      <p className="text-[#00D9FF] font-bold text-sm mb-4 uppercase tracking-wider">
                        {member.role}
                      </p>

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* Social Links (placeholder) */}
                      <div className="flex items-center gap-2 pt-4 border-t-2 border-white/10">
                        <motion.button
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 bg-white/5 hover:bg-[#00D9FF]/20 border border-white/20 hover:border-[#00D9FF]/40 rounded-lg flex items-center justify-center transition-all group/btn"
                        >
                          <Mail className="w-4 h-4 text-white/60 group-hover/btn:text-[#00D9FF] transition-colors" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 bg-white/5 hover:bg-[#00D9FF]/20 border border-white/20 hover:border-[#00D9FF]/40 rounded-lg flex items-center justify-center transition-all group/btn"
                        >
                          <Linkedin className="w-4 h-4 text-white/60 group-hover/btn:text-[#00D9FF] transition-colors" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
        )}

        {/* Empty State */}
        {!isLoading && teamMembers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 flex items-center justify-center mx-auto mb-6">
              <UsersIcon className="w-12 h-12 text-[#00D9FF]" />
            </div>
            <h3 
              className="text-2xl font-black text-white mb-4 uppercase tracking-wide" 
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Coming Soon
            </h3>
            <p className="text-white/60 text-lg max-w-md mx-auto" style={{ fontFamily: "'Crimson Pro', serif" }}>
              We're building an amazing team. Check back soon to meet our experts.
            </p>
          </motion.div>
        )}
      </div>

      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&display=swap');
      `}</style>
    </section>
  );
};