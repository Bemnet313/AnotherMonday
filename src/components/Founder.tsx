"use client";

import { motion } from "framer-motion";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Founder() {
    return (
        <section className="py-24 relative overflow-hidden bg-[var(--bg-deep)]">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-panel p-8 sm:p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-12 text-center md:text-left"
                >
                    <div className="relative shrink-0">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-olive-500/20 relative z-10 bg-gradient-to-br from-olive-400 to-forest-light flex items-center justify-center">
                            {/* Placeholder for founder image if unavailable */}
                            <span className="text-6xl select-none">🧔🏾‍♂️</span>
                        </div>
                        {/* Decorative orbit ring */}
                        <div className="absolute inset-0 -m-4 rounded-full border border-neon/20 animate-spin-slow" style={{ animationDuration: '10s' }} />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-3xl font-light text-cream mb-4">
                            Meet <span className="font-normal text-neon">Bemnet</span>
                        </h2>
                        <p className="text-olive-100/80 leading-relaxed mb-8 text-lg">
                            "I built Another Monday to solve a personal pain point: the chaos of starting the week.
                            My mission is to replace cluttered whiteboards with meaningful, organized digital spaces
                            that feel as good as they function."
                        </p>

                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-neon transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-neon transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-neon transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <button className="ml-4 px-6 py-2 rounded-full border border-olive-500/30 text-sm hover:border-neon/50 transition-colors">
                                Read more
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
