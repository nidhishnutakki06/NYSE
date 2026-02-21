import React from 'react';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { MapPin, FileText, HelpCircle, Settings, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const menuOptions = [
        { title: 'Workshops', subtitle: 'Nearby workshops and events', icon: <MapPin size={24} />, color: 'text-blue-400' },
        { title: 'User Self Analysis Report', subtitle: 'Download or view your performance report', icon: <FileText size={24} />, color: 'text-[#CBFB5E]' },
        { title: 'Help & Support', subtitle: 'Quick queries regarding health', icon: <HelpCircle size={24} />, color: 'text-purple-400' },
        { title: 'Settings', subtitle: 'App configuration', icon: <Settings size={24} />, color: 'text-zinc-400' },
    ];

    return (
        <div className="flex flex-col gap-8 h-full pb-8 max-w-3xl mx-auto w-full">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Athlete Profile</h1>
                <p className="text-zinc-400 mt-1">Manage your identity and preferences.</p>
            </div>

            {/* Profile Identity Card */}
            <Card className="bg-gradient-to-br from-[#18181B] to-[#27272A] border-[#3F3F46] p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-24 h-24 rounded-full bg-[#CBFB5E]/10 border-2 border-[#CBFB5E] flex items-center justify-center text-4xl font-black text-[#CBFB5E]">
                        {user?.user_metadata?.name?.charAt(0) || 'A'}
                    </div>

                    <div className="flex-1 text-center md:text-left w-full">
                        <h2 className="text-2xl font-bold text-white mb-1">{user?.user_metadata?.name || 'Athlete'}</h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            Focus: <span className="text-[#CBFB5E]">{user?.user_metadata?.fitnessGoals || 'General Fitness'}</span>
                        </p>

                        {/* Characteristics Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                            <div className="bg-[#09090B] border border-[#27272A] rounded-xl p-4 text-center transition-colors hover:border-[#CBFB5E]/30">
                                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Age</p>
                                <p className="text-2xl font-black text-white">{user?.user_metadata?.age || 24}</p>
                            </div>
                            <div className="bg-[#09090B] border border-[#27272A] rounded-xl p-4 text-center transition-colors hover:border-[#CBFB5E]/30">
                                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Blood</p>
                                <p className="text-2xl font-black text-red-400">{user?.user_metadata?.bloodGroup || '-'}</p>
                            </div>
                            <div className="bg-[#09090B] border border-[#27272A] rounded-xl p-4 text-center transition-colors hover:border-[#CBFB5E]/30">
                                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Height</p>
                                <p className="text-2xl font-black text-white">
                                    {user?.user_metadata?.height || 180}<span className="text-sm text-zinc-500 ml-1 font-semibold">cm</span>
                                </p>
                            </div>
                            <div className="bg-[#09090B] border border-[#27272A] rounded-xl p-4 text-center transition-colors hover:border-[#CBFB5E]/30">
                                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Weight</p>
                                <p className="text-2xl font-black text-white">
                                    {user?.user_metadata?.weight || 75}<span className="text-sm text-zinc-500 ml-1 font-semibold">kg</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Menu Options List */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-white mb-2">Options</h3>
                {menuOptions.map((option, idx) => (
                    <Card
                        key={idx}
                        onClick={() => {
                            if (option.title === 'Workshops') {
                                navigate('/workshops');
                            }
                        }}
                        className="flex items-center gap-4 p-4 hover:bg-[#27272A] cursor-pointer transition-all hover:scale-[1.01] group border-transparent hover:border-[#3F3F46]"
                    >
                        <div className={`p-3 rounded-xl bg-[#09090B] border border-[#27272A] ${option.color} group-hover:scale-110 transition-transform`}>
                            {option.icon}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-md font-bold text-white group-hover:text-[#CBFB5E] transition-colors">{option.title}</h4>
                            <p className="text-sm text-zinc-400">{option.subtitle}</p>
                        </div>
                        <ChevronRight className="text-zinc-500 group-hover:text-white transition-colors" />
                    </Card>
                ))}
            </div>
        </div>
    );
}
