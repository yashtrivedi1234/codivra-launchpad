import { useState, useEffect, ReactNode, Suspense } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface PageLoaderProps {
  children: ReactNode;
  minLoadTime?: number;
}

const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-muted rounded-full" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-muted-foreground text-sm font-medium">Loading...</p>
    </motion.div>
  </div>
);

export const PageLoader = ({ children, minLoadTime = 300 }: PageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadTime);

    return () => clearTimeout(timer);
  }, [minLoadTime]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export { LoadingSpinner };
