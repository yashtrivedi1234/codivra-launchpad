import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, FileText, Mail, Scale, AlertCircle, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  const sections = [
    {
      icon: Shield,
      title: "Use of Services",
      color: "from-blue-500 to-cyan-500",
      items: [
        "You must use our services in compliance with all applicable laws and regulations",
        "You may not misuse our services or attempt to access them using unauthorized means",
        "You are responsible for maintaining the confidentiality of your account credentials",
      ]
    },
    {
      icon: FileText,
      title: "Intellectual Property",
      color: "from-purple-500 to-pink-500",
      items: [
        "All content and materials are the property of Codivra Solutions or its licensors",
        "You may not copy, modify, distribute, or create derivative works without explicit permission",
        "Unauthorized use of our intellectual property may result in legal action",
      ]
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      color: "from-orange-500 to-red-500",
      items: [
        "We are not liable for any direct, indirect, incidental, or consequential damages",
        "Our services are provided 'as is' without warranties of any kind, express or implied",
        "We do not guarantee uninterrupted or error-free service operation",
      ]
    },
    {
      icon: AlertCircle,
      title: "Changes to Terms",
      color: "from-green-500 to-emerald-500",
      items: [
        "We reserve the right to modify these Terms of Service at any time",
        "Continued use of our services after changes constitutes acceptance of new terms",
        "We will notify users of significant changes via email or website notification",
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <Header />

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
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

      <div className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div 
                className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 border border-[#00D9FF]/30 rounded-full px-6 py-3"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                <span className="text-[#00D9FF] font-bold text-sm tracking-[0.15em] uppercase">
                  Legal
                </span>
                <Sparkles className="w-4 h-4 text-[#00D9FF]" />
              </motion.div>

              <h1 
                className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
              >
                TERMS OF
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
                  SERVICE
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light mb-8" style={{ fontFamily: "'Crimson Pro', serif" }}>
                By using our website and services, you agree to the following terms and conditions. Please read them carefully.
              </p>

              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white/60 text-sm">
                <AlertCircle className="w-4 h-4 text-[#00D9FF]" />
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </motion.div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, idx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`} />

                  <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-3xl p-8 group-hover:border-white/20 transition-all">
                    {/* Section Header */}
                    <div className="flex items-start gap-5 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <section.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 
                          className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide mb-2"
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          {section.title}
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] rounded-full" />
                      </div>
                    </div>

                    {/* Items List */}
                    <ul className="space-y-4">
                      {section.items.map((item, itemIdx) => (
                        <motion.li
                          key={itemIdx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + (itemIdx * 0.1) }}
                          className="flex items-start gap-4 group/item"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:from-[#00D9FF]/30 group-hover/item:to-[#0066FF]/30 transition-all">
                            <CheckCircle className="w-4 h-4 text-[#00D9FF]" />
                          </div>
                          <span className="text-white/80 leading-relaxed text-lg font-light flex-1" style={{ fontFamily: "'Crimson Pro', serif" }}>
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16"
            >
              <div className="relative">
                {/* Glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 rounded-[2rem] blur-2xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 backdrop-blur-sm border-2 border-[#00D9FF]/30 rounded-[2rem] p-8 md:p-12 text-center">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Mail className="w-8 h-8 text-[#00D9FF]" />
                    <h2 
                      className="text-3xl md:text-4xl font-black text-white uppercase tracking-wide"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      Have Questions?
                    </h2>
                  </div>

                  <p className="text-white/70 text-lg mb-6 font-light max-w-2xl mx-auto" style={{ fontFamily: "'Crimson Pro', serif" }}>
                    If you have any questions about these Terms of Service or need clarification on any points, please don't hesitate to reach out to our legal team.
                  </p>

                  <motion.a
                    href="mailto:codivrasolutions@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-8 py-4 rounded-xl hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] transition-all uppercase tracking-wider text-sm"
                  >
                    <Mail className="w-5 h-5" />
                    codivrasolutions@gmail.com
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 pt-8 border-t-2 border-white/10 text-center"
            >
              <p className="text-white/50 text-sm font-semibold">
                These terms are effective as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} and govern your use of Codivra Solutions services.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&display=swap');
      `}</style>
    </div>
  );
};

export default TermsOfService;