import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Camera, Leaf } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Landing() {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Activity className="text-[#CBFB5E] mb-4" size={32} />,
            title: "Personalized Plans",
            description: "Adaptive routines scaled perfectly to your current metrics, ensuring you only push past your limits safely."
        },
        {
            icon: <Camera className="text-[#CBFB5E] mb-4" size={32} />,
            title: "AI Posture Detection",
            description: "Real-time webcam analysis tracks your form. Get instant rep feedback so you maximize every contraction."
        },
        {
            icon: <Leaf className="text-[#CBFB5E] mb-4" size={32} />,
            title: "Smart Nutrition",
            description: "A synchronized dashboard measuring calories against your goals natively mapped to daily habits."
        }
    ];

    return (
        <div className="min-h-screen bg-[#09090B] flex flex-col items-center">
            {/* Header */}
            <header className="w-full h-20 flex items-center justify-between px-8 lg:px-16 border-b border-[#27272A] backdrop-blur-md sticky top-0 bg-[#09090B]/80 z-50">
                <h1 className="text-2xl font-bold tracking-tighter text-[#CBFB5E]">
                    Adaptive<span className="text-white">Fit</span>
                </h1>
                <Button onClick={() => navigate('/login')} variant="ghost">Sign In</Button>
            </header>

            {/* Hero */}
            <main className="flex-1 w-full max-w-6xl px-6 py-20 flex flex-col items-center text-center">
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
                    Unlock Your True<br />
                    <span className="text-[#CBFB5E]">Physical Potential</span>
                </h2>
                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12">
                    The intelligent fitness companion that dynamically adapts to your lifestyle, posture, and diet—bringing elite coaching to your home setup.
                </p>

                <div className="flex gap-4">
                    <Button onClick={() => navigate('/login')} className="px-8 py-4 text-lg">Start Free Trial</Button>
                    <Button onClick={() => navigate('/login')} variant="secondary" className="px-8 py-4 text-lg">View Demo</Button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-32 text-left">
                    {features.map((f, i) => (
                        <Card key={i} hoverEffect>
                            {f.icon}
                            <h3 className="text-white text-xl font-bold mb-2">{f.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{f.description}</p>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
