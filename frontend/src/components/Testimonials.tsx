import { Star, Quote, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content: "Codivra delivered beyond expectations. Our new website has significantly increased our conversion rates and the team was incredibly professional throughout.",
    rating: 5,
    image: "SJ",
    color: "from-pink-500 to-rose-500"
  },
  {
    name: "Michael Chen",
    role: "Founder, GrowthLabs",
    content: "The custom software they built has streamlined our operations completely. Their attention to detail and commitment to quality is unmatched.",
    rating: 5,
    image: "MC",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director, ScaleUp",
    content: "Our SEO rankings improved dramatically within months. The Codivra team truly understands digital marketing and delivers results.",
    rating: 5,
    image: "ER",
    color: "from-purple-500 to-pink-500"
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-[#0A0F1C] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-[800px] h-[800px] bg-[#00D9FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-[150px]"
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
              Testimonials
            </span>
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
          </motion.div>

          <h2
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
          >
            WHAT OUR
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
              CLIENTS SAY
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
            Don't just take our word for it—hear from businesses we've helped succeed
          </p>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimatedItem key={testimonial.name}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                className="group relative h-full"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-3xl`} />

                {/* Card */}
                <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-3xl p-8 h-full group-hover:border-white/30 transition-all duration-500 flex flex-col">
                  {/* Quote Icon */}
                  <motion.div 
                    className="absolute -top-5 left-8"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.2 + (index * 0.1) }}
                  >
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-xl blur-lg opacity-70`} />
                      <div className={`relative w-14 h-14 bg-gradient-to-br ${testimonial.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Quote className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6 mt-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          type: "spring",
                          delay: 0.3 + (index * 0.1) + (i * 0.05)
                        }}
                      >
                        <Star className="w-5 h-5 fill-[#00D9FF] text-[#00D9FF]" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Content */}
                  <p 
                    className="text-white/80 leading-relaxed mb-8 text-lg font-light flex-1"
                    style={{ fontFamily: "'Crimson Pro', serif" }}
                  >
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t-2 border-white/20">
                    <div className="relative flex-shrink-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-full blur-md opacity-50`} />
                      <motion.div 
                        className={`relative w-16 h-16 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <span 
                          className="text-white font-black text-xl" 
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          {testimonial.image}
                        </span>
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <div 
                        className="font-black text-white text-lg uppercase tracking-wide" 
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-white/60 font-semibold">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute bottom-6 right-6 w-16 h-[2px] bg-gradient-to-r from-[#00D9FF] to-transparent" />
                    <div className="absolute bottom-6 right-6 w-[2px] h-16 bg-gradient-to-t from-[#00D9FF] to-transparent" />
                  </div>
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 rounded-2xl blur-2xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="relative bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 backdrop-blur-sm border-2 border-[#00D9FF]/30 rounded-2xl p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-[#00D9FF]" />
                  <h3 
                    className="text-2xl font-black text-white uppercase tracking-wide" 
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Join Our Success Stories
                  </h3>
                </div>
                <p className="text-white/70 text-lg mb-6 font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  Become part of our growing list of satisfied clients and transform your business vision into reality
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-8 py-4 rounded-xl hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] transition-all uppercase tracking-wider text-sm group"
                  >
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&display=swap');
      `}</style>
    </section>
  );
};