import React, { useState, useEffect } from 'react';
import { Flame, Target, Award, Star, Activity, Plus } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { MOCK_USER } from '../services/mockData';

// Mock Data for the Calendar Section
const generateWeekData = () => {
    const today = new Date();
    const week = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - today.getDay() + i); // Sunday to Saturday
        week.push({
            date: date,
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            dayNum: date.getDate(),
            workoutsTBD: Math.floor(Math.random() * 3), // 0 to 2 workouts
            caloriesRequired: 2000 + Math.floor(Math.random() * 500) // 2000 - 2500 cals
        });
    }
    return week;
};

export default function HomePage() {
    const [greeting, setGreeting] = useState('');
    const [weekData, setWeekData] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        // Set Greeting based on time
        const hour = new Date().getHours();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (hour < 12) setGreeting('Good Morning');
         
        else if (hour < 18) setGreeting('Good Afternoon');
         
        else setGreeting('Good Evening');

        // Initialize Calendar
        const data = generateWeekData();
        setWeekData(data);
        const todayIndex = new Date().getDay();
        setSelectedDay(data[todayIndex]);
    }, []);

    // Mock progress for the training course (e.g., 65%)
    const courseProgress = 65;

    return (
        <div className="flex flex-col gap-8 pb-8">
            {/* 1. Top Section: Greeting & Quote */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold text-white tracking-tight">
                    {greeting}, {MOCK_USER.name}!
                </h1>
                <p className="text-lg text-zinc-400 italic font-serif">
                    "The pain you feel today will be the strength you feel tomorrow."
                </p>
            </div>

            {/* 2. Progress Section */}
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-white">Current Training Program</h2>
                <Card className="bg-[#18181B] border-[#27272A] p-6 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-white">Full Body Transformation</h3>
                            <p className="text-zinc-400 mt-1">Week 4 of 12 • Intermediate</p>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-black text-[#CBFB5E]">{courseProgress}%</span>
                            <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Completed</p>
                        </div>
                    </div>
                    {/* Progress Bar UI */}
                    <div className="relative z-10 mt-6 h-3 bg-[#27272A] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-400 to-[#CBFB5E] rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${courseProgress}%` }}
                        />
                    </div>
                </Card>
            </section>

            {/* 3. Current Status Section (2x2 Layout) */}
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-white">Your Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Tile 1: Current Streak */}
                    <Card className="flex items-center gap-6 p-6 bg-gradient-to-br from-[#18181B] to-[#27272A] border-[#27272A] hover:border-[#CBFB5E]/50 transition-colors group">
                        <div className="p-4 bg-[#CBFB5E]/10 rounded-2xl group-hover:scale-110 transition-transform">
                            <Flame size={32} className="text-[#CBFB5E]" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-400 font-medium uppercase tracking-wider mb-1">Current Streak</p>
                            <p className="text-3xl font-black text-white">{MOCK_USER.streak} <span className="text-lg text-zinc-500 font-normal">Days</span></p>
                        </div>
                    </Card>

                    {/* Tile 2: Weekly Goal */}
                    <Card className="flex items-center gap-6 p-6 bg-gradient-to-br from-[#18181B] to-[#27272A] border-[#27272A] hover:border-[#CBFB5E]/50 transition-colors group">
                        <div className="p-4 bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                            <Target size={32} className="text-blue-400" />
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <p className="text-sm text-zinc-400 font-medium uppercase tracking-wider">Weekly Goal</p>
                                    <p className="text-xl font-bold text-white mt-1">3 / 5 <span className="text-sm font-normal text-zinc-500">Workouts</span></p>
                                </div>
                            </div>
                            <div className="h-2 w-full bg-[#27272A] rounded-full overflow-hidden">
                                <div className="h-full bg-blue-400 rounded-full" style={{ width: '60%' }} />
                            </div>
                        </div>
                    </Card>

                    {/* Tile 3: User Badge */}
                    <Card className="flex items-center gap-6 p-6 bg-gradient-to-br from-[#18181B] to-[#27272A] border-[#27272A] hover:border-[#CBFB5E]/50 transition-colors group">
                        <div className="p-4 bg-purple-500/10 rounded-2xl group-hover:scale-110 transition-transform flex-shrink-0">
                            <Award size={32} className="text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-400 font-medium uppercase tracking-wider mb-1">Current Rank</p>
                            <div className="flex items-center gap-2">
                                <p className="text-2xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                                    Gym Rat
                                </p>
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">Next: Advanced Beast (1500 XP)</p>
                        </div>
                    </Card>

                    {/* Tile 4: Achievements */}
                    <Card className="flex items-center gap-6 p-6 bg-gradient-to-br from-[#18181B] to-[#27272A] border-[#27272A] hover:border-[#CBFB5E]/50 transition-colors group">
                        <div className="p-4 bg-yellow-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                            <Star size={32} className="text-yellow-400" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-sm text-zinc-400 font-medium uppercase tracking-wider">Recent Achievement</p>
                                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-bold">New!</span>
                            </div>
                            <p className="text-lg font-bold text-white leading-tight">100kg Deadlift Club</p>
                            <p className="text-xs text-zinc-500 mt-1">Unlocked 2 days ago</p>
                        </div>
                    </Card>

                </div>
            </section>

            {/* 4. Calendar Section */}
            <section className="flex flex-col gap-4 mt-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Daily Schedule</h2>
                    <Button variant="ghost" size="sm" className="hidden sm:flex text-[#CBFB5E] hover:bg-[#CBFB5E]/10">View Full Calendar</Button>
                </div>

                {/* Horizontal Date Selector */}
                <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                    {weekData.map((day, idx) => {
                        const isSelected = selectedDay?.date.getTime() === day.date.getTime();
                        const isToday = new Date().toDateString() === day.date.toDateString();

                        return (
                            <button
                                key={idx}
                                onClick={() => setSelectedDay(day)}
                                className={`
                                    snap-start flex-shrink-0 flex flex-col items-center justify-center 
                                    w-16 h-20 sm:w-20 sm:h-24 rounded-2xl border transition-all duration-200
                                    ${isSelected
                                        ? 'bg-[#CBFB5E] border-[#CBFB5E] shadow-[0_0_15px_rgba(203,251,94,0.3)] scale-105'
                                        : 'bg-[#18181B] border-[#27272A] hover:bg-[#27272A] hover:border-zinc-500'}
                                `}
                            >
                                <span className={`text-xs font-medium uppercase mb-1 ${isSelected ? 'text-black/70' : 'text-zinc-500'}`}>
                                    {day.day}
                                </span>
                                <span className={`text-xl sm:text-2xl font-black ${isSelected ? 'text-black' : 'text-white'}`}>
                                    {day.dayNum}
                                </span>
                                {isToday && (
                                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-black' : 'bg-[#CBFB5E]'}`} />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Selected Day Details Card */}
                {selectedDay && (
                    <Card className="bg-[#18181B] border-[#27272A] mt-2 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex flex-col md:flex-row gap-8">

                            {/* Workouts TBD */}
                            <div className="flex-1 border-r-0 md:border-r border-[#27272A] pr-0 md:pr-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-rose-500/10 rounded-lg">
                                        <Activity className="text-rose-400" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Workouts to do</h3>
                                </div>

                                {selectedDay.workoutsTBD > 0 ? (
                                    <div className="flex flex-col gap-3">
                                        {[...Array(selectedDay.workoutsTBD)].map((_, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#27272A]/50 border border-[#3F3F46]">
                                                <div>
                                                    <p className="font-bold text-white">{i === 0 ? 'Upper Body Push' : 'Liss Cardio'}</p>
                                                    <p className="text-xs text-zinc-400 mt-1">{i === 0 ? '45 min • Strength' : '30 min • Recovery'}</p>
                                                </div>
                                                <Button size="sm">Start</Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center text-zinc-500 flex flex-col items-center">
                                        <p className="font-medium text-white mb-1">Rest Day!</p>
                                        <p className="text-sm">Enjoy your recovery or add an active session.</p>
                                    </div>
                                )}
                            </div>

                            {/* Nutrition / Calories */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                        <Flame className="text-emerald-400" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Nutrition Target</h3>
                                </div>

                                <div className="p-6 rounded-xl bg-gradient-to-br from-[#27272A]/50 to-transparent border border-[#3F3F46] flex flex-col items-center justify-center text-center h-[calc(100%-3rem)]">
                                    <p className="text-4xl font-black text-white mb-2">{selectedDay.caloriesRequired}</p>
                                    <p className="text-sm text-zinc-400 uppercase tracking-widest font-medium">Calories Required</p>

                                    {/* Mock Macro Breakdown */}
                                    <div className="w-full grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-[#3F3F46]">
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">Protein</p>
                                            <p className="font-bold text-white">180g</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">Carbs</p>
                                            <p className="font-bold text-white">250g</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">Fats</p>
                                            <p className="font-bold text-white">65g</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Card>
                )}
            </section>
        </div>
    );
}
