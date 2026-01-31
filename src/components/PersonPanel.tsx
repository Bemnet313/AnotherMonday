"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { PersonId } from "@/app/page";
import type { Task } from "@/app/page";
import TaskList from "./TaskList";
import AvatarViewer from "./AvatarViewer";
import { springTransition } from "../constants";

interface PersonPanelProps {
  personId: PersonId;
  name: string;
  skinUrl: string;
  width: number;
  height: number;
  tasks: Task[];
  isExpanded: boolean;
  onToggle: () => void;
  onUpdateTasks: (tasks: Task[]) => void;
  accentColor: "bemnet" | "nati";
}

export default function PersonPanel({
  personId,
  name,
  skinUrl,
  width,
  height,
  tasks,
  isExpanded,
  onToggle,
  onUpdateTasks,
  accentColor,
}: PersonPanelProps) {
  return (
    <motion.div
      layout
      transition={springTransition}
      className="flex flex-col items-center"
    >
      <motion.button
        type="button"
        onClick={onToggle}
        className="flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-deep)] rounded-full cursor-pointer"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${name}'s task list`}
        whileHover={{
          scale: 1.08,
          y: -4,
          transition: springTransition,
        }}
        whileTap={{
          scale: 0.98,
          transition: springTransition,
        }}
      >
        <div
          className="overflow-visible"
          style={{ width, height }}
        >
          <AvatarViewer skinUrl={skinUrl} width={width} height={height} />
        </div>
        <span className="font-medium text-cream text-sm drop-shadow-sm">{name}</span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springTransition}
            className="overflow-hidden mt-6"
          >
            <div className="px-4 pb-4 pt-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <TaskList
                personId={personId}
                tasks={tasks}
                onUpdate={onUpdateTasks}
                accentColor={accentColor}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
