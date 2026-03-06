import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Zap, ShieldAlert, Pill } from 'lucide-react';

const AIRecommendationSystem = () => {
    const features = [
        {
            icon: <Pill className="w-6 h-6 text-indigo-600" />,
            title: "Medication Suggestions",
            description: "AI cross-references thousands of clinical guidelines to suggest the most effective treatments."
        },
        {
            icon: <BrainCircuit className="w-6 h-6 text-purple-600" />,
            title: "Diagnostic Rationale",
            description: "Get detailed explanations for every recommendation, including linked symptoms and research papers."
        },
        {
            icon: <ShieldAlert className="w-6 h-6 text-rose-600" />,
            title: "Side Effect Alerts",
            description: "Real-time warnings about potential drug interactions or allergic reactions based on patient history."
        },
        {
            icon: <Zap className="w-6 h-6 text-amber-600" />,
            title: "Severity Prediction",
            description: "Machine learning models predict the risk of condition worsening in the next 24-48 hours."
        }
    ];

    return (
        <section className="py-24 bg-navy-950 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-900/20 rounded-full blur-[120px] -z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Precision Intelligence at Your Fingertips</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Our AI doesn't just score patients; it provides doctors with actionable insights to speed up diagnosis and reduce clinical errors.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-white/5">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AIRecommendationSystem;
