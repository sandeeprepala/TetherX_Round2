import React from 'react';
import { AlertCircle, Clock, Users } from 'lucide-react';

const ProblemSection = () => {
    const problems = [
        {
            icon: <Users className="w-8 h-8 text-rose-500" />,
            title: "Overwhelmed Queues",
            description: "Doctors are constantly buried under massive patient waitlists with no way to filter the most urgent needs."
        },
        {
            icon: <AlertCircle className="w-8 h-8 text-rose-500" />,
            title: "Unstructured Prioritization",
            description: "Current triage relies on manual human assessment, which can be inconsistent or prone to oversight during peak hours."
        },
        {
            icon: <Clock className="w-8 h-8 text-rose-500" />,
            title: "Treatment Delays",
            description: "Critical cases may sit in the same queue as minor ones, leading to dangerous delays in life-saving treatment."
        }
    ];

    return (
        <section id="problem" className="py-24 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="section-title">The Bottleneck in Modern Healthcare</h2>
                <p className="section-subtitle">Hospitals and clinics face a growing crisis of efficiency that directly impacts patient outcomes.</p>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    {problems.map((prob, idx) => (
                        <div key={idx} className="p-8 rounded-2xl border border-slate-100 hover:border-medical-200 hover:shadow-xl hover:shadow-medical-50 transition-all group">
                            <div className="mb-6 p-4 bg-rose-50 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform">
                                {prob.icon}
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-4">{prob.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{prob.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
