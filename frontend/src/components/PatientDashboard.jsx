import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, LogOut, Clock, CheckCircle2, AlertCircle, Calendar, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast, { Toaster } from 'react-hot-toast';

const PatientDashboard = () => {
    const navigate = useNavigate();
    const [cases, setCases] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        symptoms: '',
        severity: '',
        sinceDays: '',
        previousMedication: false,
        medicationsTaken: ''
    });

    const userName = localStorage.getItem('name') || 'Patient';

    useEffect(() => {
        // Since there is no specific "get patient history" endpoint in the provided backend controller
        // but we might want to fetch some data or at least simulate it.
        // Actually the backend has a `getPendingCases` which is for doctors.
        // I'll just set an empty state for now or fetch something if available.
        setLoading(false);
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (err) {
            console.error("Logout error:", err);
        }
        localStorage.clear();
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // Mapping 1-10 severity to backend enum ["mild", "moderate", "severe"]
            let severityLabel = "mild";
            const sevNum = parseInt(formData.severity);
            if (sevNum > 7) severityLabel = "severe";
            else if (sevNum > 3) severityLabel = "moderate";

            const payload = {
                ...formData,
                // Backend expects symptoms and medicationsTaken as arrays
                symptoms: formData.symptoms.split(',').map(s => s.trim().toLowerCase()).filter(s => s !== ""),
                severity: severityLabel,
                sinceDays: Number(formData.sinceDays),
                medicationsTaken: formData.medicationsTaken ? formData.medicationsTaken.split(',').map(m => m.trim()) : []
            };

            const res = await api.post('/cases', payload);
            toast.success('Symptom report submitted successfully!');
            setShowForm(false);
            setCases([res.data, ...cases]);
            // Reset form
            setFormData({
                symptoms: '',
                severity: '',
                sinceDays: '',
                previousMedication: false,
                medicationsTaken: ''
            });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit report');
            console.error("Submission Error:", err.response?.data);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Toaster position="top-right" />

            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-medical-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-navy-900">MediPriority</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-bold text-navy-900">Welcome, {userName}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Patient Portal</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-navy-900 mb-2">My Health Overview</h1>
                        <p className="text-slate-500">Track your symptoms and clinical triage status</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="btn-primary flex items-center gap-2"
                    >
                        {showForm ? <Clock className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        {showForm ? 'View History' : 'Report New Symptom'}
                    </button>
                </div>

                {showForm ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xl"
                    >
                        <h2 className="text-xl font-bold text-navy-900 mb-6">Symptom Registration</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">What symptoms are you experiencing?</label>
                                <textarea
                                    required
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-medical-50 focus:border-medical-500 outline-none transition-all min-h-[120px]"
                                    placeholder="Please describe in detail..."
                                    value={formData.symptoms}
                                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Pain/Severity (1-10)</label>
                                    <input
                                        type="number" min="1" max="10" required
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-medical-50 focus:border-medical-500 outline-none transition-all"
                                        placeholder="7"
                                        value={formData.severity}
                                        onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Duration (days)</label>
                                    <input
                                        type="number" required
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-medical-50 focus:border-medical-500 outline-none transition-all"
                                        placeholder="3"
                                        value={formData.sinceDays}
                                        onChange={(e) => setFormData({ ...formData, sinceDays: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 accent-medical-600"
                                        checked={formData.previousMedication}
                                        onChange={(e) => setFormData({ ...formData, previousMedication: e.target.checked })}
                                    />
                                    <span className="text-sm font-semibold text-slate-700">Are you taking any current medication?</span>
                                </div>
                                {formData.previousMedication && (
                                    <input
                                        type="text"
                                        placeholder="List medications here..."
                                        className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-medical-500 text-sm"
                                        value={formData.medicationsTaken}
                                        onChange={(e) => setFormData({ ...formData, medicationsTaken: e.target.value })}
                                    />
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full btn-primary py-4 flex items-center justify-center gap-2 group"
                            >
                                {submitting ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Submit Report to Triage
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <div className="grid gap-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="w-10 h-10 border-4 border-medical-100 border-t-medical-600 rounded-full animate-spin" />
                            </div>
                        ) : cases.length > 0 ? (
                            cases.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-center gap-6 w-full">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                            {item.status === 'pending' ? <Clock className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-navy-900 truncate max-w-md">{item.symptoms}</h3>
                                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(item.createdAt).toLocaleDateString()}</span>
                                                <span className={`px-2 py-0.5 rounded-full ${item.priorityLevel === 'High' ? 'bg-rose-50 text-rose-600' : item.priorityLevel === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                                                    {item.priorityLevel} Priority
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0 flex items-center gap-4 px-6 md:border-l border-slate-100">
                                        <div className="text-center">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Status</p>
                                            <span className={`text-sm font-bold ${item.status === 'pending' ? 'text-amber-500' : 'text-emerald-500'}`}>
                                                {item.status === 'pending' ? 'Awaiting Doctor' : 'Prescription Ready'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-300">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 mb-2">No Reports Yet</h3>
                                <p className="text-slate-500 mb-8">You haven't submitted any health reports yet.</p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="btn-secondary"
                                >
                                    Get Started
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default PatientDashboard;
