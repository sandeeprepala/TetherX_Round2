import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, BarChart3, Stethoscope, CheckCircle2 } from 'lucide-react';

const SolutionSection = () => {
    const steps = [
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Smart Symptom Intake",
            desc: "Patients provide detailed health context through our intuitive, AI-guided reporting interface.",
            color: "text-blue-500",
            bgColor: "bg-blue-50"
        },
        {
            icon: <Cpu className="w-6 h-6" />,
            title: "Neural Analysis Engine",
            desc: "Real-time processing of symptoms against vast medical databases to identify potential risks.",
            color: "text-medical-500",
            bgColor: "bg-medical-50"
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Precision Prioritization",
            desc: "Advanced algorithms calculate an urgency score, ensuring critical cases never wait.",
            color: "text-indigo-500",
            bgColor: "bg-indigo-50"
        },
        {
            icon: <Stethoscope className="w-6 h-6" />,
            title: "Clinical Decision Support",
            desc: "Doctors receive actionable insights and prioritized workflows to improve outcomes.",
            color: "text-emerald-500",
            bgColor: "bg-emerald-50"
        }
    ];

    return (
        <section id="solution" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-medical-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl m-auto mb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wide text-medical-600 uppercase bg-medical-50 rounded-full"
                    >
                        How It Works
                    </motion.span>
                    <h2 className="section-title">Bridging the Gap Between Reporting and Results</h2>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        Our intelligent triage system transforms unstructured patient data into actionable clinical priorities in seconds.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left side: Steps */}
                    <div className="space-y-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group flex gap-6 p-6 rounded-2xl transition-all hover:bg-slate-50 border border-transparent hover:border-slate-100"
                            >
                                <div className={`flex-shrink-0 w-12 h-12 ${step.bgColor} ${step.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-navy-900 mb-2 flex items-center gap-2">
                                        {step.title}
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right side: Visual Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <div className="glass-card p-1 bg-gradient-to-br from-medical-100 to-blue-100 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="bg-white rounded-[22px] p-8 overflow-hidden">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-medical-500 rounded-full flex items-center justify-center text-white font-bold text-sm">TX</div>
                                        <div>
                                            <div className="text-sm font-bold text-navy-900">TetherX AI Engine</div>
                                            <div className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Active Live Analysis</div>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">STABLE</div>
                                </div>

                                <div className="space-y-6">
                                    {/* Dashboard Like Elements */}
                                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xs font-semibold text-slate-500">Case Severity</span>
                                            <span className="text-xs font-bold text-medical-600">92% Priority</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '92%' }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-medical-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl border border-slate-100">
                                            <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Time Saved</div>
                                            <div className="text-2xl font-bold text-navy-900">4.2h</div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-slate-100">
                                            <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Risk Factors</div>
                                            <div className="text-2xl font-bold text-rose-500">None</div>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-navy-900 text-white">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Cpu className="w-4 h-4 text-medical-400" />
                                            <span className="text-xs font-bold uppercase tracking-wider">AI Recommendation</span>
                                        </div>
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            Immediate consultant review required. Symptoms indicate potential cardiorespiratory stress.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div className="text-xs font-bold text-navy-900">Verified Precision</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SolutionSection;
