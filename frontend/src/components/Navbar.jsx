import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const isAuthenticated = !!localStorage.getItem('token');
    const role = localStorage.getItem('role');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDashboardRedirect = () => {
        if (role === 'doctor') navigate('/doctor-dashboard');
        else navigate('/patient-dashboard');
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-medical-600 rounded-xl flex items-center justify-center shadow-lg shadow-medical-200">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-navy-900 tracking-tight">MediPriority</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <a href="/#problem" className="hover:text-medical-600 transition-colors">Problem</a>
                    <a href="/#solution" className="hover:text-medical-600 transition-colors">Solution</a>
                    <a href="/#features" className="hover:text-medical-600 transition-colors">Features</a>
                    <a href="/#how-it-works" className="hover:text-medical-600 transition-colors">How it Works</a>
                </div>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <button
                            onClick={handleDashboardRedirect}
                            className="btn-primary py-2 text-sm shadow-md"
                        >
                            My Dashboard
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-semibold text-medical-600 hover:text-medical-700">Login</Link>
                            <Link to="/signup" className="btn-primary py-2 text-sm shadow-md">Get Started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
