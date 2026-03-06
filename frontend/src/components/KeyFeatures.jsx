import React from 'react';
import { ShieldCheck, Zap, LayoutDashboard, History, HeartPulse } from 'lucide-react';

const KeyFeatures = () => {
    const features = [
        { title: "AI Priority Scoring", desc: "Real-time urgency assessment based on medical data.", icon: <Zap /> },
        { title: "Doctor Dashboard", desc: "Intuitive interface for handling prioritized cases.", icon: <LayoutDashboard /> },
        { title: "Symptom Reporting", desc: "Patient-friendly forms for accurate data collection.", icon: <HeartPulse /> },
        { title: "Medical History", desc: "Secure tracking of past illnesses and treatments.", icon: <History /> },
        { title: "HIPAA Compliant", desc: "Enterprise-grade security for sensitive patient data.", icon: <ShieldCheck /> }
    ];

    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="section-title">Everything You Need to Scale Care</h2>
                <p className="section-subtitle">Powerful tools designed for hospitals that prioritize patient well-being.</p>

                <div className="flex flex-wrap justify-center gap-6 mt-16">
                    {features.map((f, i) => (
                        <div key={i} className="flex-1 min-w-[280px] max-w-[320px] p-8 rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-medical-100 transition-all bg-slate-50/50 text-left">
                            <div className="w-12 h-12 rounded-2xl bg-medical-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-medical-200">
                                {React.cloneElement(f.icon, { className: "w-6 h-6" })}
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-3">{f.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
