import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Stethoscope,
    LogOut,
    CheckCircle2,
    ChevronRight,
    Search,
    Filter,
    Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast, { Toaster } from 'react-hot-toast';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);

    const doctorName = localStorage.getItem('name') || 'Doctor';

    useEffect(() => {
        fetchPendingCases();
    }, []);

    const fetchPendingCases = async () => {
        try {
            const res = await api.get('/cases/pending');
            // Sort by priorityScore descending (Highest first)
            const sortedCases = res.data.sort((a, b) => b.priorityScore - a.priorityScore);
            setCases(sortedCases);
        } catch (err) {
            toast.error('Failed to fetch cases');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (err) {
            console.error("Logout error:", err);
        }
        localStorage.clear();
        navigate('/login');
    };

    const handleReviewCase = (caseId) => {
        // Navigating to the review page as requested
        navigate(`/doctor/review/${caseId}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            <Toaster position="top-right" />

            {/* Sidebar */}
            <aside className="w-full md:w-80 bg-white border-r border-slate-200 p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-medical-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-medical-100">
                        <Stethoscope className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-navy-900">MediDoctor</span>
                </div>

                <div className="space-y-2 flex-grow">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-medical-50 text-medical-600 rounded-xl font-bold transition-all">
                        <Activity className="w-5 h-5" />
                        Triage Queue
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-medium transition-all">
                        <CheckCircle2 className="w-5 h-5" />
                        Treated Cases
                    </button>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-3 mb-6 p-2">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold uppercase">
                            {doctorName.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-navy-900">{doctorName}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">On Shift</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-4 md:p-12 overflow-y-auto max-h-screen">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h1 className="text-3xl font-bold text-navy-900 mb-2">Triage Queue</h1>
                            <p className="text-slate-500">AI-prioritized cases waiting for Clinical Review</p>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-grow md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    placeholder="Search by patient ID..."
                                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-medical-500 text-sm shadow-sm"
                                />
                            </div>
                            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-medical-600 shadow-sm transition-all">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            <div className="col-span-full p-20 text-center">
                                <div className="w-8 h-8 border-4 border-medical-100 border-t-medical-600 rounded-full animate-spin mx-auto mb-4" />
                                <p className="text-slate-400 font-medium">Crunching Triage Data...</p>
                            </div>
                        ) : cases.length > 0 ? (
                            cases.map((item, idx) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => handleReviewCase(item._id)}
                                    className="p-6 bg-white rounded-3xl border border-slate-100 hover:shadow-xl hover:border-medical-200 transition-all cursor-pointer group flex flex-col h-full"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.priorityLevel === 'High' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-medical-500'}`}>
                                            <span className="font-bold text-lg">{item.priorityScore}</span>
                                        </div>
                                        {item.emergency && (
                                            <span className="px-2 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-lg animate-pulse">EMERGENCY</span>
                                        )}
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="font-bold text-navy-900 text-lg mb-1 group-hover:text-medical-600 transition-colors">
                                            {item.patientId?.name || 'Unknown Patient'}
                                        </h3>
                                        <div className="flex gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                                            <span>{item.patientId?.age || '??'} Yrs</span>
                                            <span>•</span>
                                            <span>{item.patientId?.gender || 'Other'}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-6">
                                            {item.symptoms}
                                        </p>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.priorityLevel === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-medical-50 text-medical-600'}`}>
                                            {item.priorityLevel} Priority
                                        </span>
                                        <div className="flex items-center gap-1 text-medical-600 font-bold text-sm">
                                            Treat
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full bg-white rounded-[40px] p-20 text-center border border-dashed border-slate-200">
                                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 mb-2">Queue Empty</h3>
                                <p className="text-slate-400">All patients have been triaged. Good work!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DoctorDashboard;
