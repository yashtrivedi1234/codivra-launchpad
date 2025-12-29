import { Link } from "react-router-dom";
import { useGetServicesQuery, useSubmitSubscriptionMutation } from "@/lib/api";
import { Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin, ArrowRight, ExternalLink } from "lucide-react";
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
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  // Prepare services from backend
  const services = data?.items?.map((service) => ({
    label: service.title,
    href: `/services/${service._id}`,
  })) || [];

  return (
    <footer className="relative bg-[#070B14] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#00D9FF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#0066FF]/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img
                src={logo}
                alt="Codivra Solutions"
                className="h-12 sm:h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 mb-6 leading-relaxed max-w-sm text-sm sm:text-base">
              Innovative IT solutions for modern businesses. We transform ideas into powerful digital experiences.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ y: -4 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF] to-[#0066FF] rounded-lg blur-md opacity-0 group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-[#00D9FF] transition-all duration-300">
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg mb-4 sm:mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm sm:text-base text-white/60 hover:text-[#00D9FF] transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg mb-4 sm:mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Services
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {isLoading && <li className="text-sm sm:text-base text-white/40">Loading...</li>}
              {isError && <li className="text-sm sm:text-base text-red-400">Failed to load services</li>}
              {!isLoading && !isError && services.length === 0 && (
                <li className="text-sm sm:text-base text-white/40">No services found</li>
              )}
              {!isLoading && !isError && services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.href}
                    className="text-sm sm:text-base text-white/60 hover:text-[#00D9FF] transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:-ml-4">
            <h4 className="font-bold text-white text-base sm:text-lg mb-4 sm:mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 text-white/60 group">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 group-hover:text-[#00D9FF] transition-colors" />
                <a 
                  href="mailto:codivrasolutions@gmail.com" 
                  className="hover:text-[#00D9FF] transition-colors text-sm sm:text-base leading-relaxed whitespace-nowrap"
                >
                  codivrasolutions@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60 group">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 group-hover:text-[#00D9FF] transition-colors" />
                <a href="tel:+919452819739" className="hover:text-[#00D9FF] transition-colors text-sm sm:text-base">
                  +91 9452819739
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60 group">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 group-hover:text-[#00D9FF] transition-colors" />
                <a
                  href="https://maps.google.com/?q=27.5716743,80.6592147"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base leading-relaxed hover:text-[#00D9FF] transition-colors"
                >
                  813, Vikas Nagar Colony,<br />
                  Khoobpur, Sitapur, UP
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 sm:pt-12 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <h4 className="font-bold text-white text-lg sm:text-xl mb-2 sm:mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Stay Updated
            </h4>
            <p className="text-white/60 mb-4 sm:mb-6 text-sm sm:text-base">
              Subscribe to our newsletter for the latest tech insights and updates.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newsletterEmail.trim()) return;
                setIsSubscribing(true);
                try {
                  const res = await submitSubscription({ email: newsletterEmail.trim(), source: "footer" }).unwrap();
                  setNewsletterEmail("");
                  toast({ title: "Subscribed", description: res.message || "Thanks for subscribing!" });
                } catch (err) {
                  toast({ title: "Subscription failed", description: "Please try again later.", variant: "destructive" });
                } finally {
                  setIsSubscribing(false);
                }
              }}
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-14 sm:h-16 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] focus:outline-none transition-colors text-sm sm:text-base"
                required
                disabled={isSubscribing}
              />
              <button
                type="submit"
                className="h-14 sm:h-16 px-6 sm:px-8 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300 whitespace-nowrap text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubscribing}
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/50">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Codivra Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link to="/privacy-policy" className="hover:text-[#00D9FF] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-[#00D9FF] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};