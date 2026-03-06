import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero-illustration.png';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-medical-100 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-60 -z-10" />

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-50 text-medical-700 text-xs font-bold mb-6 tracking-wide uppercase">
                        <span className="flex h-2 w-2 rounded-full bg-medical-500 animate-pulse" />
                        Empowering Hospitals with AI
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-navy-900 leading-[1.1] mb-6">
                        AI-Powered Patient <span className="text-medical-600">Prioritization</span> for Faster Medical Decisions
                    </h1>
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                        Patients report symptoms. AI analyzes severity. Doctors treat the most critical cases first. Streamlining healthcare with data-driven intelligence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/login" className="btn-primary text-center text-lg px-8">Get Started</Link>
                        <Link to="/login" className="btn-secondary text-center text-lg px-8">Doctor Access</Link>
                    </div>
                    <div className="mt-10 flex items-center gap-4 text-sm text-slate-500 font-medium">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden`}>
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="doctor" />
                                </div>
                            ))}
                        </div>
                        <span>Trusted by 500+ Medical Professionals</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative z-10 w-full max-w-xl mx-auto drop-shadow-2xl">
                        <img src={heroImg} alt="AI Patient Prioritization Illustration" className="w-full h-auto rounded-3xl" />
                    </div>
                    {/* Decorative stats card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute -bottom-6 -left-6 glass-card p-4 hidden lg:block z-20"
                    >
                        <div className="flex items-center gap-3 " >
                            <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 font-medium whitespace-nowrap z-200">Average Response Time</div>
                                <div className="text-lg font-bold text-navy-900 ">-40% Faster</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
