import { Check, Star, Sparkles, Zap, Crown, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started",
    price: "99",
    period: "project",
    icon: Rocket,
    color: "from-blue-500 to-cyan-500",
    features: [
      "5-page responsive website",
      "Basic SEO setup",
      "Mobile optimization",
      "Contact form integration",
      "2 rounds of revisions",
      "30-day support",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses",
    price: "499",
    period: "project",
    icon: Zap,
    color: "from-[#00D9FF] to-[#0066FF]",
    features: [
      "10-page custom website",
      "Advanced SEO optimization",
      "Custom UI/UX design",
      "CMS integration",
      "E-commerce ready",
      "Unlimited revisions",
      "90-day priority support",
      "Analytics dashboard",
    ],
    highlighted: true,
    cta: "Most Popular",
  },
  {
    name: "Enterprise",
    description: "Full-scale digital solutions",
    price: "Custom",
    period: "quote",
    icon: Crown,
    color: "from-purple-500 to-pink-500",
    features: [
      "Unlimited pages",
      "Custom software development",
      "Full-stack solutions",
      "API integrations",
      "Dedicated project manager",
      "24/7 premium support",
      "Performance optimization",
      "Security audits",
      "Ongoing maintenance",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-gradient-to-b from-[#070B14] to-[#0A0F1C] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-[#00D9FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-[150px]"
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
              Our Services
            </span>
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
          </motion.div>

          <h2
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
          >
            SIMPLE &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
              HONEST PRICING
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
            Service-based solutions helping businesses build websites, apps, and digital experiences that drive growth
          </p>
        </AnimatedSection>

        {/* Pricing Cards */}
        <AnimatedStagger className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <AnimatedItem key={plan.name}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: plan.highlighted ? 0 : -12 }}
                className={`group relative h-full ${plan.highlighted ? 'md:scale-105' : ''}`}
              >
                {/* Popular Badge */}
                {plan.highlighted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] rounded-full blur-xl opacity-75" />
                      <div className="relative flex items-center gap-2 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-wider shadow-[0_0_30px_rgba(0,217,255,0.5)]">
                        <Star className="w-4 h-4 fill-white" />
                        Most Popular
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Glow Effect */}
                <div className={`absolute -inset-1 rounded-[2rem] blur-xl transition-opacity duration-500 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-br from-[#00D9FF]/30 to-[#0066FF]/30 opacity-100' 
                    : 'bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 opacity-0 group-hover:opacity-100'
                }`} />

                {/* Card */}
                <div className={`relative rounded-[2rem] p-8 lg:p-10 h-full transition-all duration-500 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 backdrop-blur-xl border-2 border-[#00D9FF]"
                    : "bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 hover:border-white/30"
                }`}>
                  {/* Icon */}
                  <motion.div 
                    className="mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl items-center justify-center shadow-lg`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Plan Header */}
                  <div className="mb-6">
                    <h3 
                      className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-wide" 
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-white/60 font-light leading-relaxed" style={{ fontFamily: "'Crimson Pro', serif" }}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-8 border-b-2 border-white/10">
                    <div className="flex items-baseline gap-2">
                      {plan.price !== "Custom" && (
                        <span className="text-2xl text-white/60 font-bold">$</span>
                      )}
                      <span 
                        className="text-5xl md:text-6xl font-black text-white" 
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        {plan.price}
                      </span>
                    </div>
                    <span className="text-sm text-white/50 font-bold uppercase tracking-wider">
                      {plan.period === "project" ? "per project" : "Get a custom quote"}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + (idx * 0.05) }}
                        className="flex items-start gap-3"
                      >
                        <div className="relative mt-0.5 flex-shrink-0">
                          <div className="absolute inset-0 bg-[#00D9FF] rounded-full blur-sm opacity-50" />
                          <div className="relative w-6 h-6 bg-gradient-to-br from-[#00D9FF] to-[#0066FF] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                        </div>
                        <span className="text-white/80 leading-relaxed font-semibold">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className={`w-full font-black py-7 text-base rounded-xl transition-all duration-300 uppercase tracking-wider group ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white hover:shadow-[0_0_50px_rgba(0,217,255,0.6)]"
                          : "bg-white/5 border-2 border-white/20 text-white hover:bg-white/10 hover:border-[#00D9FF]"
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {plan.cta}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>

        {/* Bottom Note */}
        <AnimatedSection delay={0.3} className="text-center max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-2xl p-8">
            <p className="text-white/70 leading-relaxed text-lg font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
              We work as a service partner, not a large agency. Pricing depends on scope, timelines, and requirements.
              <a href="#contact" className="text-[#00D9FF] hover:underline ml-1 font-bold">
                Talk to us
              </a> to get the right solution for your business.
            </p>
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