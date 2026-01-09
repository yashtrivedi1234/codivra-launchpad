import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  priority?: boolean;
}

export const AnimatedSection = ({ children, className, delay = 0, priority = false }: AnimatedSectionProps) => {
  const shouldReduceMotion = useReducedMotion() || useIsMobile();
  const instant = priority || shouldReduceMotion;
  
  return (
    <motion.div
      initial={instant ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={instant ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={instant ? { duration: 0 } : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedStagger = ({ children, className }: { children: ReactNode; className?: string }) => {
  const shouldReduceMotion = useReducedMotion() || useIsMobile();
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.08,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedItem = ({ children, className }: { children: ReactNode; className?: string }) => {
  const shouldReduceMotion = useReducedMotion() || useIsMobile();
  
  return (
    <motion.div
      variants={{
        hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
        visible: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
