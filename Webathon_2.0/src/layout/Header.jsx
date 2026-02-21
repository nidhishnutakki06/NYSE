import React, { useState, useEffect } from 'react';
import { Bell, User, Menu, Activity, Zap, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabaseClient';

export default function Header() {
    const { user, logout } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);
    const [workshopNotif, setWorkshopNotif] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the absolute neatest upcoming workshop for the notification bell
        const fetchUpcomingWorkshop = async () => {
            const { data, error } = await supabase
                .from('workshops')
                .select('*')
                .order('date', { ascending: true })
                .limit(1)
                .single();

            if (!error && data) {
                setWorkshopNotif({
                    id: 3,
                    type: 'Workshop',
                    icon: <Calendar size={16} />,
                    title: `Upcoming: ${data.title}`,
                    desc: `${data.date} at ${data.time}`,
                    color: 'text-purple-400',
                    link: '/workshops'
                });
            }
        };

        fetchUpcomingWorkshop();
    }, []);

    const notifications = [
        { id: 1, type: 'Energy', icon: <Zap size={16} />, title: 'Energy Levels: High (88%)', desc: 'Optimal time for a high-intensity workout.', color: 'text-[#CBFB5E]' },
        { id: 2, type: 'Recovery', icon: <Activity size={16} />, title: 'Enthusiasm: Peaking', desc: 'Fully recovered. Let\'s crush today\'s goals.', color: 'text-blue-400' },
    ];

    if (workshopNotif) {
        notifications.push(workshopNotif);
    }

    return (
        <header className="h-20 w-full backdrop-blur-md bg-[#09090B]/80 border-b border-[#27272A] sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10">
            <div className="flex items-center gap-4">
                <button className="md:hidden text-zinc-400 hover:text-white transition-colors">
                    <Menu size={24} />
                </button>
                <span className="text-xl md:hidden font-bold tracking-tighter text-white">
                    <span className="text-[#CBFB5E]">N</span>YSE
                </span>
            </div>

            <div className="flex items-center gap-6">

                {/* Notification Dropdown Container */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`transition-colors relative ${showNotifications ? 'text-white' : 'text-zinc-400 hover:text-[#CBFB5E]'}`}
                    >
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </button>

                    {/* Dropdown Menu */}
                    {showNotifications && (
                        <div className="absolute right-0 top-10 w-80 bg-[#18181B] border border-[#27272A] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-4 border-b border-[#27272A] bg-[#09090B]">
                                <h3 className="text-sm font-bold text-white">Notifications</h3>
                            </div>
                            <div className="max-h-96 overflow-y-auto no-scrollbar">
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        onClick={() => {
                                            if (notif.link) {
                                                navigate(notif.link);
                                                setShowNotifications(false);
                                            }
                                        }}
                                        className="p-4 border-b border-[#27272A] hover:bg-[#27272A]/50 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-0.5 ${notif.color} group-hover:scale-110 transition-transform`}>
                                                {notif.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-[#CBFB5E] transition-colors">{notif.title}</h4>
                                                <p className="text-xs text-zinc-400 leading-relaxed">{notif.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Controls */}
                <div className="flex items-center gap-3">
                    <Link to="/profile" className="focus:outline-none hover:scale-105 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#CBFB5E] hover:bg-[#27272A] transition-colors shadow-sm cursor-pointer font-bold">
                            {user?.user_metadata?.name ? user.user_metadata.name.charAt(0).toUpperCase() : <User size={18} />}
                        </div>
                    </Link>
                    <div className="flex flex-col items-start">
                        <p className="text-sm font-semibold text-white">{user?.user_metadata?.name || 'Athlete'}</p>
                        <button onClick={logout} className="text-xs text-zinc-400 hover:text-white transition-colors">Sign out</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
