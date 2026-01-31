"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springTransition } from "@/constants";
import HistoryModal from "@/components/HistoryModal";

interface PastMonday {
  id: string;
  date: string;
  summary: string;
  bemnetTasks: string[];
  natiTasks: string[];
}

const sampleHistory: PastMonday[] = [
  {
    id: "1",
    date: "January 22, 2026",
    summary: "Planned project milestones and reviewed Q1 goals.",
    bemnetTasks: ["Finalize project scope", "Research new libraries", "Team sync meeting"],
    natiTasks: ["Prepare client presentation", "Update design mockups", "Code review session"],
  },
  {
    id: "2",
    date: "January 15, 2026",
    summary: "Completed initial setup and integrated Firebase auth.",
    bemnetTasks: ["Set up Next.js project", "Configure Tailwind CSS", "Implement Firebase auth"],
    natiTasks: ["Design initial UI", "Create responsive layouts", "Test login flow"],
  },
  {
    id: "3",
    date: "January 08, 2026",
    summary: "Brainstormed V2 features and design overhaul ideas.",
    bemnetTasks: ["Research 3D character libraries", "Sketch new UI concepts", "Define core features"],
    natiTasks: ["Gather user feedback", "Analyze existing app", "Propose new color palettes"],
  },
];

export default function HistoryPage() {
  const [selectedMonday, setSelectedMonday] = useState<PastMonday | null>(null);

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-black flex flex-col items-center py-12 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
        className="text-7xl font-black tracking-tighter text-center mb-12"
      >
        PREVIOUS MONDAYS
      </motion.h1>

      <div className="w-full max-w-2xl">
        {sampleHistory.map((monday) => (
          <motion.div
            key={monday.id}
            className="flex items-center justify-between p-4 border-b border-black/10 cursor-pointer"
            whileHover={{
              backgroundColor: "rgba(0, 0, 0, 0.03)", // Very light grey
              x: 5, // Slide text slightly right
              transition: springTransition,
            }}
            onClick={() => setSelectedMonday(monday)}
          >
            <span className="font-bold text-black">{monday.date}</span>
            <span className="text-black/80 text-sm italic">{monday.summary}</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedMonday && (
          <HistoryModal monday={selectedMonday} onClose={() => setSelectedMonday(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
