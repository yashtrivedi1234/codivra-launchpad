import { Loader2, Sparkles, ArrowRight, Zap } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import { useGetServicesQuery } from "@/lib/api";
import { motion } from "framer-motion";

export const Services = () => {
  const { data, isLoading } = useGetServicesQuery();

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#0A0F1C] overflow-hidden">
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

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
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
              What We Do
            </span>
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
          </motion.div>

          <h2
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
          >
            COMPREHENSIVE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
              IT SOLUTIONS
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
            From concept to launch, we deliver end-to-end digital services that transform your business vision into reality
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
            <p className="text-white/60 font-semibold text-lg">Loading services...</p>
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && data?.items && (
          <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
            {data.items.map((service: { _id: string; title: string; icon?: string; image?: string }, idx: number) => {
              const imageUrl = service.image || service.icon;
              const isImageUrl =
                typeof imageUrl === "string" &&
                (imageUrl.startsWith("http://") ||
                  imageUrl.startsWith("https://") ||
                  imageUrl.startsWith("/") ||
                  imageUrl.startsWith("data:image"));

              return (
                <AnimatedItem key={service._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{ y: -16 }}
                    className="group relative h-full cursor-pointer"
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#00D9FF]/30 to-[#0066FF]/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Card Container */}
                    <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-3xl overflow-hidden group-hover:border-[#00D9FF]/40 transition-all duration-500 h-[400px]">
                      {/* Image Container */}
                      <div className="relative h-full overflow-hidden">
                        {isImageUrl ? (
                          <>
                            {/* Background Image */}
                            <div className="absolute inset-0">
                              <motion.img
                                src={imageUrl}
                                alt={service.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.15 }}
                                transition={{ duration: 0.7 }}
                                loading="lazy"
                                onError={(e) => {
                                  console.error("[Services] Image failed to load:", imageUrl);
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              {/* Dark Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/60 to-[#0A0F1C]/20" />
                              {/* Hover Glow Effect */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#00D9FF]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                          </>
                        ) : (
                          // Fallback gradient
                          <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/20 via-[#0066FF]/10 to-[#0A0F1C]">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Zap className="w-24 h-24 text-[#00D9FF]/30" />
                            </div>
                          </div>
                        )}

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                          {/* Service Number */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (idx * 0.1) }}
                            className="absolute top-6 left-6"
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#0066FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.4)]">
                              <span 
                                className="text-white font-black text-xl" 
                                style={{ fontFamily: "'Oswald', sans-serif" }}
                              >
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                            </div>
                          </motion.div>

                          {/* Title */}
                          <motion.h3 
                            className="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight uppercase tracking-wide transform transition-transform duration-300 group-hover:translate-y-[-8px]"
                            style={{ 
                              fontFamily: "'Oswald', sans-serif",
                              textShadow: '0 2px 20px rgba(0,0,0,0.8)'
                            }}
                          >
                            {service.title}
                          </motion.h3>
                          
                          {/* Action Bar */}
                          <div className="flex items-center justify-between pt-4 border-t-2 border-white/20">
                            <motion.div 
                              className="w-16 h-1 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] rounded-full transform origin-left transition-all duration-300 group-hover:w-24"
                            />
                            
                            <motion.div
                              className="w-10 h-10 rounded-full bg-[#00D9FF]/10 group-hover:bg-[#00D9FF]/20 flex items-center justify-center border border-[#00D9FF]/30 opacity-0 group-hover:opacity-100 transition-all"
                              whileHover={{ rotate: 45, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <ArrowRight className="w-5 h-5 text-[#00D9FF]" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Corner Accent */}
                        <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="absolute top-6 right-6 w-16 h-[2px] bg-gradient-to-l from-[#00D9FF] to-transparent" />
                          <div className="absolute top-6 right-6 w-[2px] h-16 bg-gradient-to-b from-[#00D9FF] to-transparent" />
                        </div>

                        {/* Shimmer Effect on Hover */}
                        <motion.div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00D9FF]/20 to-transparent" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedItem>
              );
            })}
          </AnimatedStagger>
        )}

        {/* Empty State */}
        {!isLoading && (!data?.items || data.items.length === 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-[#00D9FF]" />
            </div>
            <h3 
              className="text-2xl font-black text-white mb-4 uppercase tracking-wide" 
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Coming Soon
            </h3>
            <p className="text-white/60 text-lg max-w-md mx-auto" style={{ fontFamily: "'Crimson Pro', serif" }}>
              We're preparing our comprehensive service offerings. Check back soon to see how we can help your business.
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