import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, Clock, Pill, AlertTriangle, CheckCircle } from 'lucide-react';

const DoctorDashboardPreview = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);

    const patients = [
        { id: 1, name: "Sarah Johnson", priority: 95, color: "text-rose-600 bg-rose-50", status: "Critical", symptoms: "Severe chest pain, short of breath", meds: "Aspirin, Lisinopril", duration: "2 days" },
        { id: 2, name: "Robert Wilson", priority: 82, color: "text-amber-600 bg-amber-50", status: "High", symptoms: "High fever (103F), deep cough", meds: "Acetaminophen", duration: "4 days" },
        { id: 3, name: "Emily Davis", priority: 45, color: "text-blue-600 bg-blue-50", status: "Moderate", symptoms: "Severe headache, blurred vision", meds: "Sumatriptan", duration: "1 day" },
        { id: 4, name: "Michael Chen", priority: 25, color: "text-emerald-600 bg-emerald-50", status: "Low", symptoms: "Mild skin rash and itching", meds: "Benadryl", duration: "6 hours" }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-4">
                        <h2 className="text-3xl font-bold text-navy-900 mb-6">Doctor-Centric <span className="text-medical-600">Prioritization</span></h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            No more messy stacks of files. Our dashboard automatically moves critical cases to the top based on AI severity scoring.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "AI Priority Scoring (1-100)",
                                "Instant Symptom Breakdown",
                                "Historical Medication Tracking",
                                "One-Click Prescription Export"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                    <CheckCircle className="w-5 h-5 text-medical-500" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="bg-slate-900 rounded-3xl p-1 shadow-2xl overflow-hidden border-8 border-slate-900">
                            {/* Dashboard UI Mockup */}
                            <div className="bg-white rounded-[1.5rem] overflow-hidden min-h-[500px] flex flex-col">
                                {/* Header */}
                                <div className="border-b border-slate-100 p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-medical-50 flex items-center justify-center font-bold text-medical-600 border border-medical-100">DR</div>
                                        <span className="font-bold text-navy-900">Dr. Alex Thompson</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Search className="w-5 h-5 text-slate-400" />
                                        <div className="relative">
                                            <Bell className="w-5 h-5 text-slate-400" />
                                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-1 overflow-hidden">
                                    {/* Patients List Sidebar */}
                                    <div className="w-1/3 border-r border-slate-100 p-4 overflow-y-auto max-h-[450px]">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Patient Queue</h4>
                                        <div className="space-y-3">
                                            {patients.map((p) => (
                                                <div
                                                    key={p.id}
                                                    onClick={() => setSelectedPatient(p)}
                                                    className={`p-3 rounded-xl cursor-pointer transition-all ${selectedPatient?.id === p.id ? 'bg-medical-50 border-medical-200' : 'bg-slate-50 hover:bg-white border-transparent border-slate-100'} border shadow-sm`}
                                                >
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="font-bold text-sm text-slate-900">{p.name}</span>
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${p.color}`}>{p.priority}</span>
                                                    </div>
                                                    <div className="text-[10px] text-slate-500 line-clamp-1">{p.symptoms}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Patient Details Content */}
                                    <div className="flex-1 p-6 bg-slate-50/50 overflow-y-auto max-h-[450px]">
                                        <AnimatePresence mode="wait">
                                            {selectedPatient ? (
                                                <motion.div
                                                    key={selectedPatient.id}
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                >
                                                    <div className="flex justify-between items-center mb-6">
                                                        <h3 className="text-xl font-bold text-navy-900">{selectedPatient.name}</h3>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedPatient.color}`}>
                                                            {selectedPatient.status} Priority
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                                        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                                                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1"><Clock className="w-3 h-3" /> Illness Duration</div>
                                                            <div className="font-bold text-navy-900">{selectedPatient.duration}</div>
                                                        </div>
                                                        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                                                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1"><Pill className="w-3 h-3" /> Medications</div>
                                                            <div className="font-bold text-navy-900 truncate">{selectedPatient.meds}</div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-medical-600 text-white p-5 rounded-2xl shadow-lg shadow-medical-200 mb-6">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Cpu className="w-4 h-4" />
                                                            <span className="text-xs font-bold uppercase">AI Recommendation</span>
                                                        </div>
                                                        <p className="text-sm font-medium leading-relaxed opacity-95">
                                                            Based on symptoms and medication history, possible severe respiratory infection. Recommend ordering a Chest X-Ray and starting Broad-spectrum antibiotics immediately.
                                                        </p>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Doctor's Prescription</label>
                                                            <textarea className="w-full h-20 p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-medical-500" placeholder="Type prescription here..." />
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <div className="flex-1">
                                                                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Duration</label>
                                                                <input type="text" className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm" placeholder="e.g. 7 days" />
                                                            </div>
                                                            <div className="flex-1 pt-6">
                                                                <button className="w-full py-2 bg-medical-600 text-white rounded-lg text-sm font-bold hover:bg-medical-700 transition-colors shadow-md">Submit Report</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                                    <User className="w-16 h-16 opacity-10 mb-4" />
                                                    <p>Select a patient to view details</p>
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Simple CPU icon for the dashboard mockup
const Cpu = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
);

export default DoctorDashboardPreview;
