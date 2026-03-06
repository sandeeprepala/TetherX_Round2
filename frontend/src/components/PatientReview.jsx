import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    User,
    Activity,
    Brain,
    Clipboard,
    Send,
    AlertTriangle,
    CheckCircle2,
    ShieldCheck,
    Info
} from 'lucide-react';
import api from '../api';
import toast, { Toaster } from 'react-hot-toast';

const PatientReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [treating, setTreating] = useState(false);
    const [prescription, setPrescription] = useState({
        medicines: '',
        duration: '',
        notes: ''
    });

    useEffect(() => {
        fetchCaseDetails();
    }, [id]);

    const fetchCaseDetails = async () => {
        try {
            const res = await api.get(`/cases/${id}`);
            console.log(res.data);
            
            setCaseData(res.data);
        } catch (err) {
            toast.error('Failed to load case details');
            navigate('/doctor-dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleTreat = async (e) => {
        e.preventDefault();
        setTreating(true);
        try {
            // Structuring prescription to match the backend Case model
            const finalPrescription = {
                medicines: [
                    {
                        name: prescription.medicines,
                        dosage: "As prescribed",
                        duration: prescription.duration || "N/A"
                    }
                ],
                notes: prescription.notes
            };

            await api.put(`/cases/treat/${id}`, finalPrescription);
            toast.success('Patient treated successfully!');
            setTimeout(() => navigate('/doctor-dashboard'), 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Treatment failed');
        } finally {
            setTreating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-medical-200 border-t-medical-600 rounded-full animate-spin" />
            </div>
        );
    }

    const ai = caseData?.aiRecommendation || {};

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <Toaster position="top-right" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <button
                    onClick={() => navigate('/doctor-dashboard')}
                    className="flex items-center gap-2 text-slate-500 hover:text-medical-600 font-bold mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Queue
                </button>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side: Patient Info & Prescription */}
                    <div className="space-y-8">
                        {/* Patient Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
                        >
                            <div className="flex items-start gap-6 mb-8">
                                <div className="w-20 h-20 bg-medical-50 rounded-3xl flex items-center justify-center text-medical-600 shadow-inner">
                                    <User className="w-10 h-10" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h1 className="text-3xl font-extrabold text-navy-900 mb-1">
                                            {caseData?.patientId?.name}
                                        </h1>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${caseData?.priorityLevel === 'high' ? 'bg-rose-50 text-rose-500' : 'bg-medical-50 text-medical-500'}`}>
                                            {caseData?.priorityLevel?.toUpperCase()} Priority
                                        </span>
                                    </div>
                                    <div className="flex gap-4 text-slate-400 font-bold text-sm">
                                        <span>{caseData?.patientId?.age} yrs</span>
                                        <span>•</span>
                                        <span>{caseData?.patientId?.gender}</span>
                                        <span>•</span>
                                        <span className="text-medical-500 uppercase tracking-widest text-[10px]">Triage #{caseData?._id.slice(-6)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Activity className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Reported Symptoms</span>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <ul className="list-disc list-inside text-slate-600 font-medium space-y-1">
                                        {Array.isArray(caseData?.symptoms) ?
                                            caseData.symptoms.map((s, i) => <li key={i}>{s}</li>) :
                                            <li>{caseData?.symptoms}</li>}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Prescription Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <Clipboard className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-900">Clinical Triage Prescription</h3>
                            </div>

                            <form onSubmit={handleTreat} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Medicines & Dosage</label>
                                    <textarea
                                        required
                                        className="w-full p-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-medical-50 focus:border-medical-500 outline-none transition-all text-sm min-h-[120px]"
                                        placeholder="e.g. Paracetamol 500mg - twice a day after meals"
                                        value={prescription.medicines}
                                        onChange={(e) => setPrescription({ ...prescription, medicines: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Duration</label>
                                        <input
                                            required
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-medical-50 focus:border-medical-500 outline-none transition-all text-sm"
                                            placeholder="e.g. 5 Days"
                                            value={prescription.duration}
                                            onChange={(e) => setPrescription({ ...prescription, duration: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Doctor's Notes</label>
                                        <input
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-medical-50 focus:border-medical-500 outline-none transition-all text-sm"
                                            placeholder="Avoid cold water..."
                                            value={prescription.notes}
                                            onChange={(e) => setPrescription({ ...prescription, notes: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={treating}
                                    className="w-full btn-primary py-5 flex items-center justify-center gap-3 group text-lg"
                                >
                                    {treating ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Complete Treatment
                                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Right Side: AI Insights */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-navy-900 rounded-[40px] p-8 shadow-2xl relative overflow-hidden"
                        >
                            <Brain className="absolute right-[-20px] top-[-20px] w-64 h-64 text-white/5" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="p-3 bg-medical-500/20 text-medical-300 rounded-2xl border border-medical-500/30">
                                        <Brain className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">AI Diagnostic Support</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-medical-200/60 text-xs font-bold uppercase tracking-widest">Confidence Score: </span>
                                            <span className="text-medical-400 text-xs font-bold font-mono">{(ai.confidence * 100).toFixed(0)}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {/* AI Recommended Medicines */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-medical-300">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Suggested Medicines</span>
                                        </div>
                                        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                                            <div className="flex flex-wrap gap-2">
                                                {ai.medicines?.map((m, i) => (
                                                    <span key={i} className="px-3 py-1 bg-medical-500/20 text-medical-200 rounded-lg text-sm font-bold border border-medical-500/30">
                                                        {m}
                                                    </span>
                                                )) || <span className="text-slate-500 italic">No specific medicines suggested</span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reasoning */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-indigo-300">
                                            <Info className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Medical Rationale</span>
                                        </div>
                                        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                                            <ul className="space-y-2">
                                                {ai.reasons?.map((r, i) => (
                                                    <li key={i} className="text-xs text-slate-300 leading-relaxed flex gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 flex-shrink-0" />
                                                        {r}
                                                    </li>
                                                )) || <li className="text-slate-500 italic">No rationale provided</li>}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Side Effects & Precautions */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-rose-500/10 rounded-3xl p-6 border border-rose-500/20">
                                            <div className="flex items-center gap-2 text-rose-300 mb-3">
                                                <AlertTriangle className="w-3 h-3" />
                                                <span className="text-[10px] font-bold uppercase">Side Effects</span>
                                            </div>
                                            <ul className="space-y-1">
                                                {ai.sideEffects?.map((s, i) => <li key={i} className="text-[10px] text-rose-100/70">• {s}</li>)}
                                            </ul>
                                        </div>
                                        <div className="bg-emerald-500/10 rounded-3xl p-6 border border-emerald-500/20">
                                            <div className="flex items-center gap-2 text-emerald-300 mb-3">
                                                <ShieldCheck className="w-3 h-3" />
                                                <span className="text-[10px] font-bold uppercase">Precautions</span>
                                            </div>
                                            <ul className="space-y-1">
                                                {ai.precautions?.map((p, i) => <li key={i} className="text-[10px] text-emerald-100/70">• {p}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Urgency Monitor */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-[40px] p-8 border border-slate-100"
                        >
                            <h4 className="text-sm font-bold text-navy-900 mb-6 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-medical-500" />
                                Triage Calculation
                            </h4>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span>Urgency Grade</span>
                                    <span>{caseData?.priorityScore}% Severity</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${caseData?.priorityScore}%` }}
                                        className={`h-full rounded-full ${caseData?.priorityScore > 75 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-medical-500 shadow-[0_0_10px_rgba(30,174,152,0.4)]'}`}
                                    />
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 italic text-[11px] text-slate-500 leading-relaxed">
                                    "Clinical priority determined via AI assessment of sympomatology, chronicity, and historical pathology correlations."
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientReview;
