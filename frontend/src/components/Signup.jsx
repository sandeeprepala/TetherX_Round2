import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { User, Stethoscope, Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus, Phone, Briefcase, Award } from 'lucide-react';
import AuthLayout from './AuthLayout';
import api from '../api';
import toast, { Toaster } from 'react-hot-toast';

const signupSchema = z.object({
    name: z.string().min(2, "Full name is required"),
    phone: z.string().min(10, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    age: z.string().optional(),
    gender: z.string().optional(),
    specialization: z.string().optional(),
    experience: z.string().optional(),
});

const Signup = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('patient');
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        try {
            // Format payload to match backend expectations exactly
            const payload = {
                ...data,
                role,
                age: data.age ? parseInt(data.age, 10) : undefined,
                experience: data.experience ? parseInt(data.experience, 10) : undefined
            };

            console.log("Attempting Signup with Payload:", payload);
            const res = await api.post('/auth/register', payload);

            toast.success('Registration successful! Please login.');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Registration failed.';
            toast.error(errorMsg);
            console.error("Signup Conflict Details:", {
                error: errorMsg,
                backendResponse: err.response?.data
            });
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join MediPriority and start your healthcare journey"
            imageSide="left"
        >
            <Toaster position="top-right" />

            {/* Role Switcher */}
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <UserPlus className="h-5 w-5 text-slate-400 group-focus-within:text-medical-500 transition-colors" />
                        </div>
                        <input
                            {...register('name')}
                            placeholder="John Doe"
                            className={`w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.name ? 'border-rose-500 ring-rose-50' : 'border-slate-200 ring-medical-50'} rounded-2xl focus:ring-4 focus:border-medical-500 outline-none transition-all`}
                        />
                    </div>
                    {errors.name && <p className="text-[10px] text-rose-500 mt-1 ml-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-medical-500 transition-colors" />
                            </div>
                            <input
                                {...register('phone')}
                                placeholder="10 digit number"
                                className={`w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.phone ? 'border-rose-500 ring-rose-50' : 'border-slate-200 ring-medical-50'} rounded-2xl focus:ring-4 focus:border-medical-500 outline-none transition-all`}
                            />
                        </div>
                        {errors.phone && <p className="text-[10px] text-rose-500 mt-1 ml-1">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
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
                        {errors.password && <p className="text-[10px] text-rose-500 mt-1 ml-1">{errors.password.message}</p>}
                    </div>
                </div>

                {role === 'patient' ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Age</label>
                            <input
                                {...register('age')}
                                type="number"
                                placeholder="25"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-medical-50 focus:border-medical-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Gender</label>
                            <select
                                {...register('gender')}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-medical-50 focus:border-medical-500 outline-none transition-all"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Specialization</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Briefcase className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    {...register('specialization')}
                                    placeholder="Cardiology"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-medical-50 focus:border-medical-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Experience (Yrs)</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Award className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    {...register('experience')}
                                    type="number"
                                    placeholder="8"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-medical-50 focus:border-medical-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-medical-600 text-white rounded-2xl py-4 font-bold shadow-xl shadow-medical-100 hover:bg-medical-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            Create Your Account
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                <p className="text-center text-slate-500 text-sm mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-medical-600 font-bold hover:underline">
                        Log in here
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Signup;
