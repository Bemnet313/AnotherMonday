"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import AvatarViewer from "@/components/AvatarViewer";
import { springTransition } from "@/constants";
import { BEMNET_SKIN_URL, NATI_SKIN_URL } from "@/app/page"; // Import skin URLs from page.tsx

interface PastMonday {
  id: string;
  date: string;
  summary: string;
  bemnetTasks: string[];
  natiTasks: string[];
}

interface HistoryModalProps {
  monday: PastMonday;
  onClose: () => void;
}

export default function HistoryModal({ monday, onClose }: HistoryModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={springTransition}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose} // Close when clicking outside modal content
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={springTransition}
        className="relative bg-[#f9f9f9] text-black rounded-2xl p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-full p-1"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-4">{monday.date}</h2>
        <p className="text-gray-700 mb-6">{monday.summary}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          {/* Bemnet&apos;s Section */}
          <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Bemnet&apos;s Tasks</h3>
            <div className="mb-6">
              <AvatarViewer skinUrl={BEMNET_SKIN_URL} width={80} height={120} />
            </div>
            <ul className="list-disc list-inside space-y-2 text-left w-full pl-4">
              {monday.bemnetTasks.map((task, index) => (
                <li key={index} className="text-gray-800">
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Nati&apos;s Section */}
          <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Nati&apos;s Tasks</h3>
            <div className="mb-6">
              <AvatarViewer skinUrl={NATI_SKIN_URL} width={70} height={100} />
            </div>
            <ul className="list-disc list-inside space-y-2 text-left w-full pl-4">
              {monday.natiTasks.map((task, index) => (
                <li key={index} className="text-gray-800">
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
