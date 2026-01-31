"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import PersonPanel from "@/components/PersonPanel";
import ActionButtons from "@/components/ActionButtons";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { LogIn, LogOut } from "lucide-react";
import { springTransition, BEMNET_SKIN_URL, NATI_SKIN_URL } from "../constants";

export type PersonId = "bemnet" | "nati";

export interface Task {
  id: string;
  text: string;
  done: boolean;
}

export interface PersonTasks {
  bemnet: Task[];
  nati: Task[];
}

// Skin URLs - proxied via API to avoid CORS when loading in canvas
// Bemnet: male, full beard, black glasses, orange t-shirt, grey shorts
// Nati: male, faded hair, olive green long-sleeve, black jeans, grey glasses

const initialTasks: PersonTasks = {
  bemnet: [
    { id: "b1", text: "Plan the week", done: false },
    { id: "b2", text: "Review goals", done: false },
  ],
  nati: [
    { id: "n1", text: "Check calendar", done: false },
    { id: "n2", text: "Sync up", done: false },
  ],
};


export default function Home() {
  const [tasks, setTasks] = useState<PersonTasks>(initialTasks);
  const [expandedPerson, setExpandedPerson] = useState<PersonId | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleExpand = useCallback((person: PersonId) => {
    setExpandedPerson((prev) => (prev === person ? null : person));
  }, []);

  const updateTasks = useCallback((person: PersonId, newTasks: Task[]) => {
    setTasks((prev) => ({ ...prev, [person]: newTasks }));
  }, []);

  const clearAllLists = useCallback(() => {
    setTasks({
      bemnet: [],
      nati: [],
    });
    setExpandedPerson(null);
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-deep)] text-cream">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Section 1 (Hero) - with glowy green radial gradient overlay */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-deep)] text-cream px-4 py-6 sm:py-8 relative overflow-hidden">
        {/* Glowy green radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(52,211,153,0.25),rgba(34,197,94,0.15),transparent)] pointer-events-none" aria-hidden />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="text-5xl sm:text-7xl font-extralight text-center mb-4 tracking-tight relative z-10 drop-shadow-[0_0_30px_rgba(52,211,153,0.2)]"
        >
          Another <span className="font-normal text-cream/90">MON</span>day!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.2 }}
          className="text-xl sm:text-2xl text-emerald-200/90 mb-12 relative z-10 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]"
        >
          Instead of the white board try this app to write and track tasks
        </motion.p>

        {!user && (
          <motion.button
            type="button"
            onClick={handleLogin}
            className="relative z-10 flex items-center gap-2 px-8 py-4 rounded-2xl bg-cream/20 backdrop-blur-md border border-white/20 text-cream font-medium text-lg hover:bg-cream/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-deep)] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springTransition}
          >
            <LogIn className="w-6 h-6" />
            Sign in with Google
          </motion.button>
        )}
      </section>

      {/* Section 2 (The Board) */}
      {user && (
        <section className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-deep)] text-cream px-4 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8"
          >
            <PersonPanel
              personId="bemnet"
              name="Bemnet"
              skinUrl={BEMNET_SKIN_URL}
              width={135}
              height={200}
              tasks={tasks.bemnet}
              isExpanded={expandedPerson === "bemnet"}
              onToggle={() => toggleExpand("bemnet")}
              onUpdateTasks={(newTasks) => updateTasks("bemnet", newTasks)}
              accentColor="bemnet"
            />
            <PersonPanel
              personId="nati"
              name="Nati"
              skinUrl={NATI_SKIN_URL}
              width={115}
              height={170}
              tasks={tasks.nati}
              isExpanded={expandedPerson === "nati"}
              onToggle={() => toggleExpand("nati")}
              onUpdateTasks={(newTasks) => updateTasks("nati", newTasks)}
              accentColor="nati"
            />
          </motion.div>

          <ActionButtons onClearAll={clearAllLists} />

          <motion.button
            type="button"
            onClick={handleLogout}
            className="mt-12 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-cream/10 hover:bg-cream/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream/30 transition-colors self-center text-sm text-cream/80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </motion.button>
        </section>
      )}
    </main>
  );
}
