"use client";

import { motion } from "framer-motion";
import { Sparkles, History } from "lucide-react";
import Link from "next/link";
import { springTransition } from "../constants";

interface ActionButtonsProps {
  onClearAll: () => void;
}

export default function ActionButtons({ onClearAll }: ActionButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springTransition, delay: 0.4 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
    >
      <motion.button
        type="button"
        onClick={onClearAll}
        className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-black/10 backdrop-blur-md border border-black/20 text-black font-medium hover:bg-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f9f9f9] transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={springTransition}
      >
        <Sparkles className="w-5 h-5" />
        Another Monday
      </motion.button>

      <Link href="/history" passHref>
        <motion.button
          type="button"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-black/15 text-black/60 font-medium hover:border-black/25 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f9f9f9] transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={springTransition}
        >
          <History className="w-4 h-4" />
          Previous Mondays
        </motion.button>
      </Link>
    </motion.div>
  );
}
