"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import PersonPanel from "@/components/PersonPanel";
import ActionButtons from "@/components/ActionButtons";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { LogIn, LogOut } from "lucide-react";
import { springTransition, BEMNET_SKIN_URL, NATI_SKIN_URL } from "../constants";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Founder from "@/components/Founder";
import Footer from "@/components/Footer";
import { ArrowDown } from "lucide-react";

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
      <main className="min-h-screen flex flex-col items-center justify-center bg-forest-DEFAULT text-cream">
        <div className="w-8 h-8 border-2 border-olive-500 border-t-neon rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-forest-DEFAULT text-cream selection:bg-neon selection:text-forest-DEFAULT">
      {/* Section 1 (Hero) */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(52,211,153,0.15),rgba(34,197,94,0.05),transparent)] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-olive-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto mt-20 sm:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-olive-900/50 border border-olive-500/30 text-neon text-xs font-medium tracking-wide mb-6 backdrop-blur-sm">
              REIMAGINE YOUR START
            </span>
            <h1 className="text-6xl sm:text-8xl font-light tracking-tight mb-8 leading-[0.9]">
              Another <span className="font-normal text-neon drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">MON</span>day
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl sm:text-2xl text-olive-200/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Instead of the white board, try this app to write and track tasks.
            Simple, calm, and effective.
          </motion.p>

          {/* Main Action or User Greeting */}
          {!user ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                type="button"
                onClick={handleLogin}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cream text-forest font-medium text-lg hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,240,230,0.3)]"
              >
                <LogIn className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                <span>Sign in with Google</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-olive-300">Welcome back, <span className="text-neon">{user.displayName?.split(' ')[0]}</span></p>
              <button
                onClick={() => document.getElementById('board')?.scrollIntoView({ behavior: 'smooth' })}
                className="animate-bounce p-2 rounded-full border border-olive-500/30 text-olive-300 hover:text-neon hover:border-neon transition-colors"
              >
                <ArrowDown className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* App Board Section (Only if logged in) */}
      {user && (
        <section id="board" className="min-h-screen py-24 relative bg-forest-DEFAULT border-t border-white/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),transparent)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-16 w-full">
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
              </div>

              <ActionButtons onClearAll={clearAllLists} />

              <motion.button
                type="button"
                onClick={handleLogout}
                className="mt-16 flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Marketing Sections */}
      <Testimonials />
      <Pricing />
      <Founder />
      <Footer />
    </main>
  );
}
