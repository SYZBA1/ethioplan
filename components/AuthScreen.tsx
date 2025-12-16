import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, LayoutTemplate, CheckCircle2 } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

const AuthScreen: React.FC<Props> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    if (!isLogin && !formData.name) return;

    setLoading(true);
    // Simulate API delay for better UX feel
    setTimeout(() => {
        setLoading(false);
        onLogin();
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side - Brand & Info */}
        <div className="md:w-1/2 bg-emerald-700 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-600 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-800 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <LayoutTemplate size={32} className="text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">EthioPlan</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Turn your business idea into reality.
            </h2>
            <p className="text-emerald-100 text-lg leading-relaxed mb-8">
              Generate professional, bank-standard feasibility studies and business plans tailored for the Ethiopian market in minutes using AI.
            </p>

            <div className="space-y-4">
                {[
                    'AI-Powered Content Generation',
                    'Ethiopian Market Context',
                    'Financial Feasibility Analysis',
                    'Automated SWOT Diagrams',
                    'Amharic & English Support'
                ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-emerald-50">
                        <CheckCircle2 size={20} className="text-emerald-300 flex-shrink-0" />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
          </div>
          
          <div className="relative z-10 text-xs text-emerald-200/60 mt-8">
            © 2024 EthioPlan. All rights reserved.
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-sm mx-auto w-full">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h3>
                <p className="text-slate-500 mb-8">
                    {isLogin 
                        ? 'Enter your details to access your workspace.' 
                        : 'Start your journey with a free account.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <User size={18} />
                                </div>
                                <input 
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                                    placeholder="Ato Kebede"
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Mail size={18} />
                            </div>
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-sm font-medium text-slate-700">Password</label>
                            {isLogin && <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Forgot password?</a>}
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Lock size={18} />
                            </div>
                            <input 
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-semibold transition-all shadow-lg shadow-emerald-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? (
                             <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                {isLogin ? 'Sign In' : 'Create Account'}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button 
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
