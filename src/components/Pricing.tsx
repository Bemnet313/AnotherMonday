"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Starter",
        price: "Free",
        description: "Perfect for personal organization.",
        features: ["Basic Task Management", "2 Lists", "Cloud Sync", "Mobile Access"],
        highlight: false,
    },
    {
        name: "Pro",
        price: "$9",
        period: "/mo",
        description: "Unlock advanced productivity tools.",
        features: ["Unlimited Lists", "Collaborative Shared Boards", "Advanced Analytics", "Priority Support", "Custom Themes"],
        highlight: true,
    },
    {
        name: "Team",
        price: "$29",
        period: "/mo",
        description: "Best for small teams and startups.",
        features: ["Everything in Pro", "Admin Controls", "Team Permissions", "Audit Logs", "Dedicated account manager"],
        highlight: false,
    },
];

export default function Pricing() {
    return (
        <section className="py-24 relative bg-[var(--bg-deep)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-5xl font-light text-cream mb-6">
                        Simple, Transparent <span className="font-normal text-neon">Pricing</span>
                    </h2>
                    <p className="text-lg text-olive-200/80">
                        Start for free, upgrade when you need to power up.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-3xl backdrop-blur-md border transition-all duration-300 ${plan.highlight
                                    ? "bg-olive-900/40 border-neon/50 shadow-[0_0_40px_rgba(52,211,153,0.15)] scale-105 z-10"
                                    : "bg-white/5 border-white/5 inview:scale-100 hover:bg-white/10"
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon text-bg-deep text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-medium text-cream mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-light text-white">{plan.price}</span>
                                    {plan.period && <span className="text-olive-300">{plan.period}</span>}
                                </div>
                                <p className="mt-4 text-olive-200/70 text-sm">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-cream/90">
                                        <Check className={`w-5 h-5 ${plan.highlight ? "text-neon" : "text-olive-400"}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-4 rounded-xl font-medium transition-all duration-200 ${plan.highlight
                                        ? "bg-neon text-forest-DEFAULT hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                                        : "bg-white/10 text-cream hover:bg-white/20"
                                    }`}
                            >
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
