import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { User, Stethoscope, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import AuthLayout from './AuthLayout';
import api from '../api';
import toast, { Toaster } from 'react-hot-toast';

const loginSchema = z.object({
    phone: z.string().min(10, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["patient", "doctor"]),
});

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('patient');
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { role: 'patient' }
    });

    const onSubmit = async (data) => {
        try {
            const res = await api.post('/auth/login', { ...data, role });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('name', res.data.name);

            toast.success('Successfully logged in!');

            if (res.data.role === 'doctor') {
                navigate('/doctor-dashboard');
            } else {
                navigate('/patient-dashboard');
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(errorMsg);
            console.error("Login Error:", err.response?.data || err.message);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Enter your credentials to access your account"
        >
            <Toaster position="top-right" />

            <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-8">
                <button
                    type="button"
                    onClick={() => setRole('patient')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${role === 'patient' ? 'bg-white shadow-sm text-medical-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-bold">Patient</span>
                </button>
                <button
                    type="button"
                    onClick={() => setRole('doctor')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${role === 'doctor' ? 'bg-white shadow-sm text-medical-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Stethoscope className="w-4 h-4" />
                    <span className="text-sm font-bold">Doctor</span>
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-medical-500 transition-colors" />
                        </div>
                        <input
                            {...register('phone')}
                            placeholder="Your phone number"
                            className={`w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.phone ? 'border-rose-500 ring-rose-50' : 'border-slate-200 ring-medical-50'} rounded-2xl focus:ring-4 focus:border-medical-500 outline-none transition-all`}
                        />
                    </div>
                    {errors.phone && <p className="text-xs text-rose-500 mt-1 ml-1">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-sm font-semibold text-slate-700">Password</label>
                        <Link to="/forgot-password" size="sm" className="text-xs font-bold text-medical-600 hover:text-medical-700">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-medical-500 transition-colors" />
                        </div>
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className={`w-full pl-11 pr-12 py-3 bg-slate-50 border ${errors.password ? 'border-rose-500 ring-rose-50' : 'border-slate-200 ring-medical-50'} rounded-2xl focus:ring-4 focus:border-medical-500 outline-none transition-all`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-xs text-rose-500 mt-1 ml-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-medical-600 text-white rounded-2xl py-4 font-bold shadow-xl shadow-medical-100 hover:bg-medical-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            Sign In to MediPriority
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                <p className="text-center text-slate-500 text-sm mt-8">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-medical-600 font-bold hover:underline">
                        Create an account
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Login;
