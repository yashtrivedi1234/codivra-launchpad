import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedSection } from "./AnimatedSection";
import { motion } from "framer-motion";
import { Sparkles, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What services does Codivra Solution offer?",
    answer: "We offer comprehensive IT services including Web Development, Custom Software Development, Graphic Design, SEO Optimization, and Digital Marketing. Each service is tailored to meet your specific business needs and goals.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity and scope. A standard website typically takes 4-6 weeks, while custom software projects can range from 2-6 months. During our initial consultation, we'll provide a detailed timeline specific to your project.",
  },
  {
    question: "What is your pricing structure?",
    answer: "We offer flexible pricing with three main tiers: Starter ($99), Professional ($499), and Enterprise (custom quote). Each tier includes different features and support levels. We also offer custom quotes for projects that don't fit standard packages.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes! All our packages include post-launch support (30-90 days depending on the tier). We also offer ongoing maintenance contracts for continuous updates, security patches, and technical support.",
  },
  {
    question: "Can you work with existing websites or systems?",
    answer: "Absolutely. We specialize in both building new solutions and improving existing ones. Whether you need a website redesign, system integration, or performance optimization, we can help.",
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern, industry-standard technologies including React, Next.js, Node.js, Python, and various cloud platforms (AWS, Google Cloud). We select the best tech stack based on your project requirements.",
  },
  {
    question: "How do you handle project communication?",
    answer: "We believe in transparent communication. You'll have a dedicated project manager, access to our project management tools, and regular updates via your preferred channel (email, Slack, or video calls).",
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer: "Your satisfaction is our priority. We include revision rounds in all packages and work closely with you throughout the project. If issues arise, we'll address them promptly to ensure the final deliverable meets your expectations.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="relative py-24 md:py-32 bg-gradient-to-b from-[#0A0F1C] to-[#070B14] overflow-hidden">
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
              FAQ
            </span>
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
          </motion.div>

          <h2
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
          >
            FREQUENTLY
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
              ASKED QUESTIONS
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
            Got questions? We've got answers. Find everything you need to know about working with us
          </p>
        </AnimatedSection>

        {/* Accordion */}
        <AnimatedSection delay={0.1} className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="relative group bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-2xl px-8 hover:border-white/30 transition-all duration-500 data-[state=open]:border-[#00D9FF] data-[state=open]:bg-gradient-to-br data-[state=open]:from-[#00D9FF]/5 data-[state=open]:to-[#0066FF]/5"
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100 transition-opacity duration-500" />
                  
                  <AccordionTrigger className="relative text-left text-white font-black hover:text-[#00D9FF] hover:no-underline py-6 text-lg md:text-xl group-hover:tracking-wide transition-all uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    <span className="flex items-start gap-3 pr-4">
                      <HelpCircle className="w-6 h-6 text-[#00D9FF] flex-shrink-0 mt-1" />
                      <span className="flex-1">{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="relative text-white/70 pb-6 pl-9 leading-relaxed text-base font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.2} className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
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
                  <MessageCircle className="w-6 h-6 text-[#00D9FF]" />
                  <h3 
                    className="text-2xl font-black text-white uppercase tracking-wide" 
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Still Have Questions?
                  </h3>
                </div>
                <p className="text-white/70 text-lg mb-6 font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  Our team is here to help. Get in touch and we'll answer any questions you have.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-8 py-4 rounded-xl hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] transition-all uppercase tracking-wider text-sm group"
                  >
                    Contact Us Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&display=swap');
      `}</style>
    </section>
  );
};