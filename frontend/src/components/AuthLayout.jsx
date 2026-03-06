import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, imageSide = 'right' }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]"
            >
                {/* Form Side */}
                <div className={`flex-1 p-8 md:p-12 flex flex-col justify-center ${imageSide === 'left' ? 'md:order-2' : ''}`}>
                    <div className="mb-8">
                        <Link to="/" className="flex items-center gap-2 mb-8 group w-fit">
                            <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-navy-900">MediPriority</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-navy-900 mb-2">{title}</h1>
                        <p className="text-slate-500">{subtitle}</p>
                    </div>

                    {children}
                </div>

                {/* Visual Side */}
                <div className={`hidden md:flex flex-1 relative bg-medical-600 items-center justify-center p-12 overflow-hidden ${imageSide === 'left' ? 'md:order-1' : ''}`}>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 text-center text-white">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8 inline-block p-4 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20"
                        >
                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </motion.div>
                        <h2 className="text-3xl font-bold mb-4">Securing Your Health Data</h2>
                        <p className="text-medical-100 text-lg leading-relaxed max-w-sm mx-auto">
                            We use enterprise-grade encryption to ensure your medical records and personal information remain private and secure.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLayout;
