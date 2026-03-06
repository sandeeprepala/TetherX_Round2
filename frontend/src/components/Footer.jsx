import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-navy-900">MediPriority</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-8">
                            Transforming patient triage with enterprise-grade AI. Built for doctors, loved by patients, trusted by hospitals.
                        </p>
                        <div className="flex gap-4">
                            {['twitter', 'linkedin', 'facebook'].map(social => (
                                <div key={social} className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 hover:bg-medical-100 hover:text-medical-600 cursor-pointer transition-colors">
                                    <span className="sr-only">{social}</span>
                                    <div className="w-4 h-4 bg-current rounded-sm" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-navy-900 mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-medical-600 transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-medical-600 transition-colors">AI Engine</a></li>
                            <li><a href="#" className="hover:text-medical-600 transition-colors">Case Studies</a></li>
                            <li><a href="#" className="hover:text-medical-600 transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-navy-900 mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-medical-600 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-medical-600 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-medical-600 transition-colors">Hospital Partners</a></li>
                            <li><a href="#" className="hover:text-medical-600 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-navy-900 mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-medical-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-medical-600 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-medical-600 transition-colors">HIPAA Compliance</a></li>
                            <li><a href="#" className="hover:text-medical-600 transition-colors">Security</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400 font-medium">© 2026 MediPriority AI Inc. All rights reserved.</p>
                    <div className="flex gap-8 text-xs text-slate-400 font-medium font-bold uppercase tracking-widest">
                        <span>Made with Care for Humanity</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
