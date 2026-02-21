import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlaySquare, Flame, Trophy, CheckCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { MOCK_USER, MOCK_WEEKLY_ACTIVITY, MOCK_NEXT_WORKOUT } from '../services/mockData';

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
                    <p className="text-zinc-400 mt-1">Ready to crush your goals today?</p>
                </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Col (2 cols wide on LG) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Chart Card */}
                    <Card className="h-96 flex flex-col">
                        <h2 className="text-xl font-bold text-white mb-6">Weekly Activity (Minutes)</h2>
                        <div className="flex-1 w-full min-h-0">
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

                    {/* Next Workout Card */}
                    <Card className="bg-gradient-to-r from-[#18181B] to-[#27272A] border-l-4 border-l-[#CBFB5E]">
                        <h3 className="text-zinc-400 font-medium mb-2 uppercase tracking-widest text-sm">Up Next</h3>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{MOCK_NEXT_WORKOUT.title}</h2>
                                <div className="flex items-center gap-4 mt-2 text-zinc-400">
                                    <span className="flex items-center gap-1"><PlaySquare size={16} /> {MOCK_NEXT_WORKOUT.duration}</span>
                                    <span className="flex items-center gap-1"><Flame size={16} /> {MOCK_NEXT_WORKOUT.intensity} Intensity</span>
                                </div>
                            </div>
                            <Button>Start Now</Button>
                        </div>
                    </Card>
                </div>

                {/* Right Col */}
                <div className="flex flex-col gap-6">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="flex flex-col items-center justify-center py-8 text-center bg-[#CBFB5E]/5 border-[#CBFB5E]/20">
                            <Flame size={32} className="text-[#CBFB5E] mb-2" />
                            <p className="text-3xl font-bold text-white">{MOCK_USER.streak}</p>
                            <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Day Streak</p>
                        </Card>
                        <Card className="flex flex-col items-center justify-center py-8 text-center bg-[#CBFB5E]/5 border-[#CBFB5E]/20">
                            <Trophy size={32} className="text-[#CBFB5E] mb-2" />
                            <p className="text-3xl font-bold text-white">{MOCK_USER.level}</p>
                            <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Current Tier</p>
                        </Card>
                    </div>

                    {/* Quick Habits Toggle */}
                    <Card className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-4">Daily Habits</h3>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'Drink 3L Water', done: true },
                                { label: 'Stretch 10 Min', done: false },
                                { label: 'Hit Protein Goal', done: false }
                            ].map((habit, i) => (
                                <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-[#27272A] hover:bg-[#27272A] cursor-pointer transition-colors group">
                                    <div className={`w-5 h-5 rounded flex items-center justify-center border ${habit.done ? 'bg-[#CBFB5E] border-[#CBFB5E]' : 'border-zinc-500 group-hover:border-[#CBFB5E]'}`}>
                                        {habit.done && <CheckCircle size={14} className="text-black" />}
                                    </div>
                                    <span className={`font-medium ${habit.done ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{habit.label}</span>
                                </label>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-4 text-sm">View Full Tracker</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
