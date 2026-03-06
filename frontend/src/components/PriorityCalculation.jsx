import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Pill, Thermometer } from 'lucide-react';

const PriorityCalculation = () => {
    const metrics = [
        { label: "Symptom Severity", weight: "+40%", icon: <Thermometer />, color: "bg-rose-500" },
        { label: "Duration of Illness", weight: "+20%", icon: <Clock />, color: "bg-amber-500" },
        { label: "Number of Symptoms", weight: "+25%", icon: <Activity />, color: "bg-indigo-500" },
        { label: "Previous Medications", weight: "+15%", icon: <Pill />, color: "bg-medical-500" }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="section-title text-left">How Priority is <span className="text-medical-600">Calculated</span></h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Our AI engine uses a multi-weighted algorithm to determine the precise clinical urgency of every patient report. No more guesswork.
                        </p>

                        <div className="space-y-6">
                            {metrics.map((m, i) => (
                                <div key={i} className="group cursor-default">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-bold text-navy-900 flex items-center gap-2">
                                            {React.cloneElement(m.icon, { className: "w-4 h-4 text-slate-400" })}
                                            {m.label}
                                        </span>
                                        <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Impact: {m.weight}</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: m.weight }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className={`h-full ${m.color} rounded-full`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 p-12 bg-white rounded-[3rem] shadow-2xl border border-slate-100 text-center">
                            <div className="inline-block p-4 bg-medical-50 text-medical-600 rounded-full mb-6">
                                <Activity className="w-12 h-12" />
                            </div>
                            <h3 className="text-2xl font-bold text-navy-900 mb-4">Real-Time Evaluation</h3>
                            <div className="text-6xl font-black text-medical-600 mb-6 tabular-nums">87.5</div>
                            <p className="text-slate-500 text-sm max-w-[250px] mx-auto uppercase tracking-widest font-bold">Priority Score</p>

                            <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center gap-4">
                                <span className="px-3 py-1 bg-rose-100 text-rose-600 text-xs font-bold rounded-lg uppercase">Critical</span>
                                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg uppercase">Immediate Attention</span>
                            </div>
                        </div>

                        {/* Background decorative circles */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-medical-200 rounded-full blur-3xl opacity-30 animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-30" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriorityCalculation;
