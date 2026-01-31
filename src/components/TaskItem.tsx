"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "@/app/page";
import { springTransition } from "../constants";

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  accentColor: "bemnet" | "nati";
  onToggleDone: (done: boolean) => void;
  onUpdateText: (text: string) => void;
  onRemove: () => void;
  onStartEdit: () => void;
  onStopEdit: () => void;
}

export default function TaskItem({
  task,
  isEditing,
  accentColor,
  onToggleDone,
  onUpdateText,
  onRemove,
  onStartEdit,
  onStopEdit,
}: TaskItemProps) {
  const [localText, setLocalText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalText(task.text);
  }, [task.text]);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleSubmit = () => {
    const trimmed = localText.trim();
    if (trimmed) onUpdateText(trimmed);
    else onUpdateText(task.text);
    onStopEdit();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={springTransition}
      className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => onToggleDone(e.target.checked)}
        className="w-5 h-5 rounded border-2 flex-shrink-0 cursor-pointer bg-transparent border-cream/50 text-cream/80 accent-cream focus:ring-cream/30"
        aria-label={`Mark "${task.text}" as ${task.done ? "not done" : "done"}`}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") {
              setLocalText(task.text);
              onStopEdit();
            }
          }}
          className="flex-1 min-w-0 px-2 py-1 text-sm bg-white/5 border border-white/20 rounded-lg text-cream placeholder-cream/50 focus:outline-none focus:ring-2 focus:ring-cream/30"
        />
      ) : (
        <>
          <span
            className={`flex-1 min-w-0 text-sm ${
              task.done ? "line-through text-cream/50" : "text-cream"
            }`}
          >
            {task.text}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              type="button"
              onClick={onStartEdit}
              className="p-1.5 rounded-lg text-cream/70 hover:text-cream hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream/30"
              aria-label={`Edit "${task.text}"`}
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="p-1.5 rounded-lg text-cream/50 hover:text-red-400/90 hover:bg-red-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/30"
              aria-label={`Delete "${task.text}"`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
