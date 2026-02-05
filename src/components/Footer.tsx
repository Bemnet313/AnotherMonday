"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="py-12 bg-[#111c11] border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                <div className="text-center md:text-left">
                    <h3 className="text-xl font-normal text-cream mb-1">
                        Another <span className="text-neon">MON</span>day
                    </h3>
                    <p className="text-sm text-olive-400">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>

                <nav className="flex items-center gap-8">
                    {["Privacy", "Terms", "Support", "Contact"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-sm text-olive-300 hover:text-neon transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
