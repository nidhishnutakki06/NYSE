import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, PlaySquare, Apple, CalendarCheck, BarChart2 } from 'lucide-react';

export default function Sidebar() {
    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { name: 'Workouts', icon: <Dumbbell size={20} />, path: '/workouts' },
        { name: 'Training Studio', icon: <PlaySquare size={20} />, path: '/training' },
        { name: 'Nutrition', icon: <Apple size={20} />, path: '/nutrition' },
        { name: 'Habits', icon: <CalendarCheck size={20} />, path: '/habits' },
        { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/analytics' },
    ];

    return (
        <aside className="w-64 h-screen bg-[#09090B] border-r border-[#27272A] hidden md:flex flex-col fixed left-0 top-0">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-[#CBFB5E] tracking-tighter">Adaptive<span className="text-white">Fit</span></h1>
            </div>

            <nav className="flex-1 px-4 mt-6">
                <ul className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? 'bg-[#CBFB5E]/10 text-[#CBFB5E]' : 'text-zinc-400 hover:text-white hover:bg-[#18181B]'
                                    }`
                                }
                            >
                                {item.icon}
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
