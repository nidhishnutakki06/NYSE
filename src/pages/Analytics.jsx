import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Clock, Zap, Target } from 'lucide-react';
import Card from '../components/Card';
import { MOCK_WEEKLY_ACTIVITY, MOCK_USER } from '../services/mockData';

export default function Analytics() {
    const stats = [
        { title: 'Total Workouts', value: MOCK_USER.totalWorkouts, icon: <Target size={24} />, trend: '+12% this month' },
        { title: 'Minutes Trained', value: MOCK_USER.minutesTrained, icon: <Clock size={24} />, trend: '+18% this month' },
        { title: 'Max Streak', value: `${MOCK_USER.maxStreak} Days`, icon: <Zap size={24} />, trend: 'Personal Best' },
        { title: 'Avg Intensity', value: 'High', icon: <Activity size={24} />, trend: 'Optimal Range' },
    ];

    return (
        <div className="flex flex-col gap-8 h-full">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
                <p className="text-zinc-400 mt-1">Deep dive into your performance metrics.</p>
            </div>

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
        </div>
    );
}
