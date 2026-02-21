import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import { Target, CheckCircle2 } from 'lucide-react';

export default function Habits() {
    // Generate dummy data for GitHub-style heatmap (last 30 days wrapper simulation)
    const heatmapData = useMemo(() => Array.from({ length: 90 }).map(() => Math.floor(Math.random() * 4)), []);

    const getColor = (level) => {
        switch (level) {
            case 0: return 'bg-[#27272A]';
            case 1: return 'bg-[#CBFB5E]/40';
            case 2: return 'bg-[#CBFB5E]/70';
            case 3: return 'bg-[#CBFB5E] shadow-[0_0_8px_rgba(203,251,94,0.5)]';
            default: return 'bg-[#27272A]';
        }
    };

    // State for interactive habits checklist
    const [habits, setHabits] = useState([
        { id: 1, task: 'Morning Mobility Routine', time: '08:00 AM', completed: true },
        { id: 2, task: 'Consume 1.5g Protein / KG', time: 'Ongoing', completed: false },
        { id: 3, task: 'Read 10 Pages', time: 'Evening', completed: false },
        { id: 4, task: 'Sleep by 11:30 PM', time: 'Target', completed: false },
    ]);

    // Handle Checkbox Toggles
    const toggleHabit = (id) => {
        setHabits(habits.map(habit =>
            habit.id === id ? { ...habit, completed: !habit.completed } : habit
        ));
    };

    // Derived Progress Calculations
    const completedCount = habits.filter(h => h.completed).length;
    const progressPercentage = Math.round((completedCount / habits.length) * 100) || 0;

    return (
        <div className="flex flex-col gap-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Habit Tracker</h1>
                <p className="text-zinc-400 mt-1">Consistency maps the path to mastery.</p>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Activity Heatmap</h2>
                    <span className="text-sm text-zinc-400">Past 90 days</span>
                </div>

                {/* Heatmap Grid */}
                <div className="flex flex-wrap gap-2">
                    {heatmapData.map((level, i) => (
                        <div
                            key={i}
                            className={`w-4 h-4 rounded-sm ${getColor(level)} transition-all hover:scale-125 cursor-pointer`}
                            title={`Level ${level} activity`}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-2 mt-6 justify-end text-xs text-zinc-400">
                    <span>Less</span>
                    <div className={`w-3 h-3 rounded-sm ${getColor(0)}`} />
                    <div className={`w-3 h-3 rounded-sm ${getColor(1)}`} />
                    <div className={`w-3 h-3 rounded-sm ${getColor(2)}`} />
                    <div className={`w-3 h-3 rounded-sm ${getColor(3)}`} />
                    <span>More</span>
                </div>
            </Card>

            {/* Routine Checklist & Progress Bar */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Target className="text-[#CBFB5E]" size={24} />
                        Today's Protocol
                    </h2>
                    <span className="text-sm font-bold text-[#CBFB5E]">{progressPercentage}% Completed</span>
                </div>

                {/* Dynamic Habits Check-bar */}
                <div className="w-full h-3 bg-[#27272A] rounded-full overflow-hidden mb-8">
                    <div
                        className="h-full bg-[#CBFB5E] rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                {/* Interactive Checklist */}
                <div className="space-y-4">
                    {habits.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => toggleHabit(item.id)}
                            className="flex items-center justify-between p-4 bg-[#09090B] border border-[#27272A] rounded-xl cursor-pointer hover:border-[#3F3F46] transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                {/* Custom Checkbox UI */}
                                <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${item.completed
                                    ? 'bg-[#CBFB5E] border-[#CBFB5E] text-black shadow-[0_0_10px_rgba(203,251,94,0.3)]'
                                    : 'bg-[#27272A] border-[#3F3F46] group-hover:border-zinc-400'
                                    }`}>
                                    {item.completed && <CheckCircle2 size={16} strokeWidth={3} />}
                                </div>

                                <div>
                                    <p className={`font-semibold transition-colors duration-200 ${item.completed ? 'text-zinc-500 line-through' : 'text-white group-hover:text-[#CBFB5E]'}`}>
                                        {item.task}
                                    </p>
                                    <p className="text-xs text-zinc-400">{item.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
