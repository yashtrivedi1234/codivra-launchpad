import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, AlertTriangle, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0F1C] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-[#00D9FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-[150px]"
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

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Floating Alert Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="inline-flex items-center gap-3 mb-8 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 border-2 border-[#00D9FF]/30 rounded-full px-6 py-3"
        >
          <AlertTriangle className="w-5 h-5 text-[#00D9FF]" />
          <span className="text-[#00D9FF] font-bold text-sm tracking-[0.15em] uppercase">
            Page Not Found
          </span>
          <AlertTriangle className="w-5 h-5 text-[#00D9FF]" />
        </motion.div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-8"
        >
          {/* Glow Effect */}
          <motion.div 
            className="absolute inset-0 blur-[100px] opacity-60"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span 
              className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-black bg-gradient-to-r from-[#00D9FF] to-[#0066FF] bg-clip-text text-transparent"
              style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
            >
              404
            </span>
          </motion.div>
          
          {/* Main Number */}
          <h1 
            className="relative text-[10rem] md:text-[14rem] lg:text-[18rem] font-black bg-gradient-to-r from-[#00D9FF] to-[#0066FF] bg-clip-text text-transparent leading-none tracking-tight" 
            style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
          >
            404
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Oops! Lost in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">Space</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 mb-6 max-w-2xl mx-auto leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
            The page you're looking for doesn't exist or has been moved to another dimension.
          </p>
          <p className="text-base text-white/50 font-semibold">
            Error Code: <span className="text-[#00D9FF]">{location.pathname}</span>
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-10 py-7 text-lg rounded-2xl hover:shadow-[0_0_50px_rgba(0,217,255,0.7)] uppercase tracking-wider group"
            >
              <a href="/" className="flex items-center gap-3">
                <Home className="w-6 h-6" />
                Return Home
                <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              </a>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-2 border-white/20 text-white font-bold px-10 py-7 text-lg rounded-2xl hover:bg-white/10 hover:border-[#00D9FF]/40 uppercase tracking-wider group"
            >
              <a href="javascript:history.back()" className="flex items-center gap-3">
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <p className="text-white/50 text-sm font-bold uppercase tracking-wider mb-6">
            Popular Pages
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "Services", href: "#services" },
              { label: "About", href: "#about" },
              { label: "Portfolio", href: "#portfolio" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "#contact" },
            ].map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + (idx * 0.05), type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-[#00D9FF] hover:border-[#00D9FF]/30 hover:bg-white/10 transition-all font-bold text-sm uppercase tracking-wider"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Rotating Rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute inset-0 border-2 border-[#00D9FF]/5 rounded-full" />
        <div className="absolute inset-16 border-2 border-[#0066FF]/5 rounded-full" />
        <div className="absolute inset-32 border-2 border-[#00D9FF]/5 rounded-full" />
        <div className="absolute inset-48 border border-[#0066FF]/5 rounded-full" />
      </motion.div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00D9FF] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&display=swap');
      `}</style>
    </div>
  );
};

export default NotFound;