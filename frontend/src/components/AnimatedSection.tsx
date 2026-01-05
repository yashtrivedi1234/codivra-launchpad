import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSection = ({ children, className, delay = 0 }: AnimatedSectionProps) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedStagger = ({ children, className }: { children: ReactNode; className?: string }) => {
  const shouldReduceMotion = useReducedMotion();
  
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
  const shouldReduceMotion = useReducedMotion();
  
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
