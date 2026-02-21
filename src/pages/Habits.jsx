import React from 'react';
import Card from '../components/Card';

export default function Habits() {
    // Generate dummy data for GitHub-style heatmap (last 30 days wrapper simulation)
    const heatmapData = Array.from({ length: 90 }).map(() => Math.floor(Math.random() * 4));

    const getColor = (level) => {
        switch (level) {
            case 0: return 'bg-[#27272A]';
            case 1: return 'bg-[#CBFB5E]/40';
            case 2: return 'bg-[#CBFB5E]/70';
            case 3: return 'bg-[#CBFB5E] shadow-[0_0_8px_rgba(203,251,94,0.5)]';
            default: return 'bg-[#27272A]';
        }
    };

    return (
        <div className="flex flex-col gap-8">
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

            {/* Routine Checklist */}
            <Card>
                <h2 className="text-xl font-bold text-white mb-6">Today's Routine</h2>
                <div className="space-y-4">
                    {[
                        { task: 'Morning Mobility Routine', time: '08:00 AM', completed: true },
                        { task: 'Consume 1.5g Protein / KG', time: 'Ongoing', completed: false },
                        { task: 'Read 10 Pages', time: 'Evening', completed: false },
                        { task: 'Sleep by 11:30 PM', time: 'Target', completed: false },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-[#09090B] border border-[#27272A] rounded-xl">
                            <div className="flex items-center gap-4">
                                <input type="checkbox" defaultChecked={item.completed} className="w-5 h-5 rounded border-[#3F3F46] text-[#CBFB5E] bg-[#27272A] focus:ring-0" />
                                <div>
                                    <p className={`font-semibold ${item.completed ? 'text-zinc-500 line-through' : 'text-white'}`}>{item.task}</p>
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
