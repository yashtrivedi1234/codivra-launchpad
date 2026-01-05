import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.3,
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 w-16 h-16 border-4 border-[#00D9FF]/20 rounded-full blur-sm" />
              <div className="w-16 h-16 border-4 border-[#00D9FF] border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00D9FF] rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#00D9FF] rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-[#00D9FF] rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default PageTransition;