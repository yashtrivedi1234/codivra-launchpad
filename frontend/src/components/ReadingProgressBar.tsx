import { motion } from "framer-motion";

interface ReadingProgressBarProps {
  progress: number;
}

const ReadingProgressBar = ({ progress }: ReadingProgressBarProps) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] z-50 origin-left"
      style={{ scaleX: progress / 100 }}
    />
  );
};

export default ReadingProgressBar;