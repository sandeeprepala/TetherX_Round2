import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, History, Pill, Calendar } from 'lucide-react';

const PatientDashboardPreview = () => {
    const history = [
        { disease: "Seasonal Flu", date: "Jan 12, 2026", doctor: "Dr. Sarah Miller", symptoms: "Fever, Cough, Body ache", meds: "Oseltamivir", duration: "5 days" },
        { disease: "Acid Reflux", date: "Dec 05, 2025", doctor: "Dr. Alex Thompson", symptoms: "Heartburn, Chest pain", meds: "Omeprazole", duration: "14 days" },
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 max-w-lg mx-auto lg:mx-0">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-navy-900">Your Health Record</h3>
                                    <p className="text-sm text-slate-500">MediPriority Patient Portal</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-medical-600 flex items-center justify-center text-white font-bold">JD</div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                    <History className="w-4 h-4" /> Treatment History
                                </div>

                                {history.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.2 }}
                                        className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-medical-200 transition-all cursor-pointer"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-bold text-navy-900">{item.disease}</h4>
                                                <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                                                    <Calendar className="w-3 h-3" /> {item.date} • {item.doctor}
                                                </div>
                                            </div>
                                            <span className="p-1 px-2 bg-green-100 text-green-700 text-[10px] font-bold rounded-md">TREATED</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                            <div className="bg-white p-2 rounded-lg text-[10px] border border-slate-100">
                                                <span className="text-slate-400 block mb-1">Prescription:</span>
                                                <span className="font-bold text-medical-600">{item.meds}</span>
                                            </div>
                                            <div className="bg-white p-2 rounded-lg text-[10px] border border-slate-100">
                                                <span className="text-slate-400 block mb-1">Duration:</span>
                                                <span className="font-bold text-navy-900">{item.duration}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <h2 className="section-title text-left">Patients Stay Informed</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                            Empowering patients with clear, accessible health records. View your prescriptions, symptoms, and doctor recommendations anytime, anywhere.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Instant Access to Prescriptions",
                                "Historical Symptom Tracking",
                                "Direct Doctor Feedback Dashboard",
                                "Automated Medication Reminders"
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-medical-100 flex items-center justify-center text-medical-600">
                                        <CheckCircle className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-slate-700">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PatientDashboardPreview;
