import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            await login(email, password);
            navigate('/dashboard', { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-6 relative">
            {/* Background glow decoration */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#CBFB5E]/10 rounded-full blur-[100px] pointer-events-none" />

            <Card className="w-full max-w-md p-8 relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tighter text-[#CBFB5E] mb-2">
                        Adaptive<span className="text-white">Fit</span>
                    </h1>
                    <p className="text-zinc-400">Sign in to your training account</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="athlete@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-zinc-400 cursor-pointer hover:text-white">
                            <input type="checkbox" className="rounded bg-[#27272A] border-[#3F3F46] text-[#CBFB5E] focus:ring-[#CBFB5E]" />
                            Remember me
                        </label>
                        <a href="#" className="text-[#CBFB5E] hover:underline">Forgot Password?</a>
                    </div>

                    <Button type="submit" disabled={isLoading} className="mt-4 w-full justify-center">
                        {isLoading ? 'Authenticating...' : 'Sign In'}
                    </Button>
                </form>

                <p className="mt-8 text-center text-zinc-400 text-sm">
                    Don't have an account? <a href="#" className="text-white hover:text-[#CBFB5E] transition-colors">Apply for Invite</a>
                </p>
            </Card>
        </div>
    );
}
