import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { AlertCircle } from 'lucide-react';

export default function Login() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Additional fields for Signup Trial
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [fitnessGoals, setFitnessGoals] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');

    const [error, setError] = useState('');
    const { login, signup, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLoginMode) {
                if (email && password) {
                    await login(email, password);
                    // navigate('/', { replace: true }); <-- REMOVED: Managed by Context now
                }
            } else {
                if (email && password && name && age && height && weight && fitnessGoals && bloodGroup) {
                    await signup(email, password, {
                        name,
                        age: Number(age),
                        height: Number(height),
                        weight: Number(weight),
                        fitnessGoals,
                        bloodGroup
                    });
                    // navigate('/', { replace: true }); <-- REMOVED: Managed by Context now
                } else {
                    setError('Please fill in all fields.');
                }
            }
        } catch (err) {
            console.error("Supabase Auth Error:", err);
            // Supabase returns human readable `.message` directly
            setError(err.message || 'Failed to authenticate. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-6 relative">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#CBFB5E]/10 rounded-full blur-[100px] pointer-events-none" />

            <Card className="w-full max-w-md p-8 relative z-10 max-h-[90vh] overflow-y-auto no-scrollbar">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">
                        <span className="text-[#CBFB5E]">N</span>YSE
                    </h1>
                    <p className="text-zinc-400">
                        {isLoginMode ? 'Sign in to your training account' : 'Apply for a new athlete account'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 flex items-center gap-3 text-sm font-medium">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {!isLoginMode && (
                        <>
                            <Input
                                label="Full Name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Age"
                                    type="number"
                                    placeholder="25"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                />
                                <Input
                                    label="Height (cm)"
                                    type="number"
                                    placeholder="180"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Weight (kg)"
                                    type="number"
                                    placeholder="75"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                />
                                <div className="flex flex-col gap-2">
                                    <label className="text-zinc-400 font-medium text-sm">Blood Group</label>
                                    <select
                                        className="bg-[#27272A] border border-[#3F3F46] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CBFB5E] transition-colors appearance-none"
                                        value={bloodGroup}
                                        onChange={(e) => setBloodGroup(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled hidden>Select</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                            </div>
                            <Input
                                label="Fitness Goals"
                                type="text"
                                placeholder="Hypertrophy"
                                value={fitnessGoals}
                                onChange={(e) => setFitnessGoals(e.target.value)}
                                required
                            />
                        </>
                    )}

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

                    {isLoginMode && (
                        <div className="flex items-center justify-between text-sm mt-2">
                            <label className="flex items-center gap-2 text-zinc-400 cursor-pointer hover:text-white">
                                <input type="checkbox" className="rounded bg-[#27272A] border-[#3F3F46] text-[#CBFB5E] focus:ring-[#CBFB5E]" />
                                Remember me
                            </label>
                            <a href="#" className="text-[#CBFB5E] hover:underline">Forgot Password?</a>
                        </div>
                    )}

                    <Button type="submit" disabled={isLoading} className="mt-6 w-full justify-center">
                        {isLoading ? 'Authenticating...' : (isLoginMode ? 'Sign In' : 'Create Account')}
                    </Button>
                </form>

                <p className="mt-8 text-center text-zinc-400 text-sm">
                    {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setError('');
                        }}
                        className="text-white hover:text-[#CBFB5E] transition-colors font-bold"
                    >
                        {isLoginMode ? 'Apply for Invite' : 'Sign In'}
                    </button>
                </p>
            </Card>
        </div>
    );
}
