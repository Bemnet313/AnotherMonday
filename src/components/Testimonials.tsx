"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Product Manager",
        text: "This app completely transformed how I organize my Monday mornings. The interface is simply beautiful.",
        avatar: "S",
    },
    {
        name: "David Chen",
        role: "Freelancer",
        text: "Finally, a task manager that doesn't feel like a spreadsheet. The olive theme is so calming.",
        avatar: "D",
    },
    {
        name: "Elena Rodriguez",
        role: "Designer",
        text: "The aesthetics are top-notch. It's not just functional; it's a joy to look at every day.",
        avatar: "E",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 relative overflow-hidden bg-[var(--bg-deep)]">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-olive-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-neon/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-5xl font-light text-cream mb-6">
                        Loved by <span className="font-normal text-neon">Productive People</span>
                    </h2>
                    <p className="text-lg text-olive-200/80 max-w-2xl mx-auto">
                        See what our community has to say about their new favorite way to start the week.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass-panel p-8 rounded-2xl flex flex-col items-start border border-white/5 hover:border-olive-400/30 transition-colors"
                        >
                            <div className="mb-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-olive-600/50 flex items-center justify-center text-xl font-medium text-neon border border-olive-500/30">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-cream">{testimonial.name}</h4>
                                    <p className="text-sm text-olive-300">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-olive-100/90 leading-relaxed">"{testimonial.text}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
