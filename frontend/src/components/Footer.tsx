import { Link } from "react-router-dom";
import { useGetServicesQuery, useSubmitSubscriptionMutation } from "@/lib/api";
import { Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin, ArrowRight, Send, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Footer = () => {
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [submitSubscription] = useSubmitSubscriptionMutation();
  const { toast } = useToast();
  
  // Fetch services from backend
  const { data, isLoading, isError } = useGetServicesQuery();
  
  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "from-blue-600 to-blue-400" },
    { icon: Twitter, href: "#", label: "Twitter", color: "from-sky-500 to-blue-500" },
    { icon: Facebook, href: "#", label: "Facebook", color: "from-blue-700 to-blue-500" },
    { icon: Instagram, href: "#", label: "Instagram", color: "from-pink-500 to-purple-500" },
  ];

  const quickLinks = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ];

  // Prepare services from backend
  const services = data?.items?.map((service) => ({
    label: service.title,
    href: `#services`,
  })) || [];

  return (
    <footer className="relative bg-[#070B14] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00D9FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0066FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={logo}
                alt="Codivra Solutions"
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 mb-8 leading-relaxed text-lg font-light max-w-sm" style={{ fontFamily: "'Crimson Pro', serif" }}>
              Innovative IT solutions for modern businesses. We transform ideas into powerful digital experiences.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1, type: "spring" }}
                  whileHover={{ y: -6, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className={`absolute -inset-1 bg-gradient-to-br ${social.color} rounded-xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity`} />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-xl flex items-center justify-center group-hover:border-[#00D9FF]/40 transition-all duration-300">
                    <social.icon className="w-5 h-5" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 
              className="font-black text-white text-xl mb-6 uppercase tracking-wide" 
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (idx * 0.05) }}
                >
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-[#00D9FF] transition-all inline-flex items-center gap-2 group font-semibold"
                  >
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 3 }}
                    >
                      <ArrowRight className="w-4 h-4 text-[#00D9FF]" />
                    </motion.div>
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 
              className="font-black text-white text-xl mb-6 uppercase tracking-wide" 
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {isLoading && (
                <li className="text-white/50 font-semibold">Loading services...</li>
              )}
              {isError && (
                <li className="text-red-400 font-semibold">Failed to load services</li>
              )}
              {!isLoading && !isError && services.length === 0 && (
                <li className="text-white/50 font-semibold">No services available</li>
              )}
              {!isLoading && !isError && services.slice(0, 6).map((service, idx) => (
                <motion.li 
                  key={service.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (idx * 0.05) }}
                >
                  <Link
                    to={service.href}
                    className="text-white/70 hover:text-[#00D9FF] transition-all inline-flex items-center gap-2 group font-semibold"
                  >
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 3 }}
                    >
                      <ArrowRight className="w-4 h-4 text-[#00D9FF]" />
                    </motion.div>
                    <span className="group-hover:translate-x-1 transition-transform">{service.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 
              className="font-black text-white text-xl mb-6 uppercase tracking-wide" 
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <motion.li 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-3 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-[#00D9FF]/30 group-hover:to-[#0066FF]/30 transition-all">
                  <Mail className="w-5 h-5 text-[#00D9FF]" />
                </div>
                <a 
                  href="mailto:codivrasolutions@gmail.com" 
                  className="hover:text-[#00D9FF] transition-colors leading-relaxed font-semibold pt-2 break-all"
                >
                  codivrasolutions@gmail.com
                </a>
              </motion.li>
              
              <motion.li 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-3 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-[#00D9FF]/30 group-hover:to-[#0066FF]/30 transition-all">
                  <Phone className="w-5 h-5 text-[#00D9FF]" />
                </div>
                <a 
                  href="tel:+919452819739" 
                  className="hover:text-[#00D9FF] transition-colors font-semibold pt-2"
                >
                  +91 9452819739
                </a>
              </motion.li>
              
              <motion.li 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-3 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-[#00D9FF]/30 group-hover:to-[#0066FF]/30 transition-all">
                  <MapPin className="w-5 h-5 text-[#00D9FF]" />
                </div>
                <a
                  href="https://maps.google.com/?q=27.5716743,80.6592147"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-relaxed hover:text-[#00D9FF] transition-colors font-semibold pt-2"
                >
                  813, Vikas Nagar Colony,<br />
                  Khoobpur, Sitapur, UP
                </a>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-t-2 border-white/10 pt-12 mb-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-[#00D9FF]" />
              <h4 
                className="font-black text-white text-3xl uppercase tracking-wide" 
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Stay Updated
              </h4>
              <Sparkles className="w-6 h-6 text-[#00D9FF]" />
            </div>
            <p className="text-white/70 mb-8 text-lg font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
              Subscribe to our newsletter for the latest tech insights, industry trends, and exclusive updates
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newsletterEmail.trim()) return;
                setIsSubscribing(true);
                try {
                  const res = await submitSubscription({ 
                    email: newsletterEmail.trim(), 
                    source: "footer" 
                  }).unwrap();
                  setNewsletterEmail("");
                  toast({ 
                    title: "Subscribed Successfully! 🎉", 
                    description: res.message || "Thanks for subscribing!" 
                  });
                } catch (err) {
                  toast({ 
                    title: "Subscription failed", 
                    description: "Please try again later.", 
                    variant: "destructive" 
                  });
                } finally {
                  setIsSubscribing(false);
                }
              }}
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 h-16 px-6 rounded-xl bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-[#00D9FF] focus:bg-white/10 focus:outline-none transition-all font-semibold"
                required
                disabled={isSubscribing}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-16 px-8 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black rounded-xl hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] transition-all duration-300 whitespace-nowrap uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed group"
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Subscribe
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-white/10 relative z-10">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/60 font-semibold text-center md:text-left"
            >
              © {new Date().getFullYear()} Codivra Solutions. All rights reserved. Built with ❤️ in India.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6"
            >
              <Link 
                to="/privacy-policy" 
                className="text-white/60 hover:text-[#00D9FF] transition-colors font-bold uppercase tracking-wider text-xs"
              >
                Privacy Policy
              </Link>
              <span className="text-white/30">•</span>
              <Link 
                to="/terms-of-service" 
                className="text-white/60 hover:text-[#00D9FF] transition-colors font-bold uppercase tracking-wider text-xs"
              >
                Terms of Service
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&display=swap');
      `}</style>
    </footer>
  );
};