import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Clock, Zap, Target, Footprints, Droplet, HeartPulse, Moon, BrainCircuit, HeartHandshake } from 'lucide-react';
import Card from '../components/Card';
import { MOCK_WEEKLY_ACTIVITY, MOCK_USER } from '../services/mockData';

export default function Analytics() {
    const stats = [
        { title: 'Total Workouts', value: MOCK_USER.totalWorkouts, icon: <Target size={24} />, trend: '+12% this month' },
        { title: 'Minutes Trained', value: MOCK_USER.minutesTrained, icon: <Clock size={24} />, trend: '+18% this month' },
        { title: 'Max Streak', value: `${MOCK_USER.maxStreak} Days`, icon: <Zap size={24} />, trend: 'Personal Best' },
        { title: 'Avg Intensity', value: 'High', icon: <Activity size={24} />, trend: 'Optimal Range' },
    ];

    const healthStats = [
        { title: 'Daily Steps', value: '11,240', icon: <Footprints size={20} />, unit: 'steps/day', color: 'text-zinc-300' },
        { title: 'Avg Sleep Time', value: '7h 14m', icon: <Moon size={20} />, unit: 'last 7 days', color: 'text-zinc-300' },
        { title: 'Resting HR', value: '54', icon: <HeartPulse size={20} />, unit: 'bpm', color: 'text-[#CBFB5E]' },
        { title: 'Blood Pressure', value: '118/76', icon: <HeartHandshake size={20} />, unit: 'mmHg', color: 'text-zinc-300' },
        { title: 'Fasting Glucose', value: '88', icon: <Droplet size={20} />, unit: 'mg/dL', color: 'text-zinc-300' },
        { title: 'Avg Stress', value: 'Low', icon: <BrainCircuit size={20} />, unit: 'HRV baseline', color: 'text-[#CBFB5E]' },
    ];

    return (
        <div className="flex flex-col gap-8 h-full pb-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
                <p className="text-zinc-400 mt-1">Deep dive into your performance metrics.</p>
            </div>

            {/* Top Primary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <Card key={i} className="flex flex-col relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-6 opacity-10 text-[#CBFB5E] group-hover:scale-110 transition-transform duration-500">
                            {s.icon}
                        </div>
                        <p className="text-zinc-400 font-medium">{s.title}</p>
                        <h2 className="text-4xl font-bold text-white mt-2 mb-4">{s.value}</h2>
                        <p className="text-xs text-[#CBFB5E] bg-[#CBFB5E]/10 w-fit px-2 py-1 rounded font-bold uppercase tracking-wider">{s.trend}</p>
                    </Card>
                ))}
            </div>

            {/* Intensity Distribution Chart */}
            <Card className="flex-1 min-h-[400px]">
                <h2 className="text-xl font-bold text-white mb-8">Intensity Distribution (This Week)</h2>
                <div className="w-full h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={MOCK_WEEKLY_ACTIVITY} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                            <XAxis dataKey="name" stroke="#A1A1AA" tickLine={false} axisLine={false} />
                            <YAxis stroke="#A1A1AA" tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: '#27272A' }}
                                contentStyle={{ backgroundColor: '#18181B', border: '1px solid #3F3F46', borderRadius: '8px' }}
                                itemStyle={{ color: '#CBFB5E' }}
                            />
                            <Bar dataKey="minutes" fill="#CBFB5E" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Expanded Health Stats Grid */}
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <Activity className="text-[#CBFB5E]" size={20} />
                    <h2 className="text-xl font-bold text-white">Biometrics & Demographics</h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {healthStats.map((stat, i) => (
                        <Card key={i} className="flex flex-col items-center justify-center p-6 bg-[#09090B] border border-[#27272A] hover:border-[#3F3F46] transition-colors group text-center">
                            <div className="mb-3 text-zinc-500 group-hover:text-[#CBFB5E] transition-colors">
                                {stat.icon}
                            </div>
                            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{stat.title}</h3>
                            <p className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</p>
                            <p className="text-[10px] text-zinc-600 uppercase font-semibold">{stat.unit}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
