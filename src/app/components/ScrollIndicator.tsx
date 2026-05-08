import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-white/60 hover:text-white/90 transition-colors cursor-pointer"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </motion.div>
  );
}
