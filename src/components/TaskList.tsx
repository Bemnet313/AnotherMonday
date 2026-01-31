"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { PersonId } from "@/app/page";
import type { Task } from "@/app/page";
import TaskItem from "./TaskItem";
import { springTransition } from "../constants";

interface TaskListProps {
  personId: PersonId;
  tasks: Task[];
  onUpdate: (tasks: Task[]) => void;
  accentColor: "bemnet" | "nati";
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function TaskList({ personId, tasks, onUpdate, accentColor }: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addTask = useCallback(() => {
    onUpdate([...tasks, { id: generateId(), text: "New task", done: false }]);
  }, [tasks, onUpdate]);

  const updateTask = useCallback(
    (id: string, updates: Partial<Pick<Task, "text" | "done">>) => {
      onUpdate(
        tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
    },
    [tasks, onUpdate]
  );

  const removeTask = useCallback(
    (id: string) => {
      onUpdate(tasks.filter((t) => t.id !== id));
      setEditingId((prev) => (prev === id ? null : prev));
    },
    [tasks, onUpdate]
  );

  const startEdit = useCallback((id: string) => setEditingId(id), []);
  const stopEdit = useCallback(() => setEditingId(null), []);

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            isEditing={editingId === task.id}
            accentColor={accentColor}
            onToggleDone={(done) => updateTask(task.id, { done })}
            onUpdateText={(text) => updateTask(task.id, { text })}
            onRemove={() => removeTask(task.id)}
            onStartEdit={() => startEdit(task.id)}
            onStopEdit={stopEdit}
          />
        ))}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={addTask}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-white/20 text-cream/60 hover:border-white/40 hover:text-cream/80 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream/30 transition-colors"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={springTransition}
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Add task</span>
      </motion.button>
    </div>
  );
}
