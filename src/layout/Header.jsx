import React from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="h-20 w-full backdrop-blur-md bg-[#09090B]/80 border-b border-[#27272A] sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10">
            <div className="flex items-center gap-4">
                <button className="md:hidden text-zinc-400 hover:text-white transition-colors">
                    <Menu size={24} />
                </button>
                <span className="text-xl font-bold md:hidden">
                    <span className="text-[#CBFB5E]">Adaptive</span>Fit
                </span>
            </div>

            <div className="flex items-center gap-6">
                <button className="text-zinc-400 hover:text-[#CBFB5E] transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#CBFB5E]">
                        <User size={18} />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-white">{user?.name || 'Athlete'}</p>
                        <button onClick={logout} className="text-xs text-zinc-400 hover:text-white transition-colors">Sign out</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
