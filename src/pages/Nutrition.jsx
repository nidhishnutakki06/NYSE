import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Plus } from 'lucide-react';

export default function Nutrition() {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const mockMeals = [
        { type: 'Breakfast', name: 'Oatmeal & Berries', cals: 320, p: 12, c: 54, f: 6 },
        { type: 'Lunch', name: 'Chicken Salad', cals: 450, p: 40, c: 15, f: 22 },
        { type: 'Dinner', name: 'Salmon & Quinoa', cals: 600, p: 45, c: 40, f: 28 },
        { type: 'Snack', name: 'Protein Shake', cals: 150, p: 25, c: 5, f: 2 },
    ];

    return (
        <div className="flex flex-col gap-8 h-full">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Nutrition Center</h1>
                    <p className="text-zinc-400 mt-1">Smart tracking mapped to your physical output.</p>
                </div>
                <Button className="md:px-4 px-2 py-2 text-sm"><Plus size={16} /> Log Meal</Button>
            </div>

            {/* Weekly Setup - Horizontal Scroll */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4">Weekly Planner</h2>
                <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                    {weekDays.map((day, i) => (
                        <div
                            key={day}
                            className={`min-w-[80px] h-24 rounded-2xl flex flex-col items-center justify-center border cursor-pointer transition-all ${i === new Date().getDay() - 1 ? 'bg-[#CBFB5E] border-[#CBFB5E] text-black shadow-[0_0_15px_rgba(203,251,94,0.3)]' : 'bg-[#18181B] border-[#27272A] text-zinc-400 hover:border-[#3F3F46]'}`}
                        >
                            <span className="text-sm font-semibold mb-1">{day}</span>
                            <span className={`text-2xl font-bold ${i === new Date().getDay() - 1 ? 'text-black' : 'text-white'}`}>{i + 15}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockMeals.map((meal, index) => (
                    <Card key={index} className="flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{meal.type}</span>
                            <h3 className="text-lg font-bold text-white mt-1 mb-4">{meal.name}</h3>
                            <div className="flex items-center gap-4 text-sm font-medium">
                                <div className="flex flex-col"><span className="text-zinc-500">CAL</span> <span className="text-white">{meal.cals}</span></div>
                                <div className="w-px h-8 bg-[#27272A]" />
                                <div className="flex flex-col"><span className="text-zinc-500">P</span> <span className="text-white">{meal.p}g</span></div>
                                <div className="w-px h-8 bg-[#27272A]" />
                                <div className="flex flex-col"><span className="text-zinc-500">C</span> <span className="text-white">{meal.c}g</span></div>
                                <div className="w-px h-8 bg-[#27272A]" />
                                <div className="flex flex-col"><span className="text-zinc-500">F</span> <span className="text-white">{meal.f}g</span></div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between border-t border-[#27272A] pt-4">
                            <span className="text-[#CBFB5E] text-xs font-bold">AVAILABLE IN PANTRY</span>
                            <input type="checkbox" className="rounded bg-[#27272A] border-[#3F3F46] text-[#CBFB5E] focus:ring-[#CBFB5E] w-5 h-5 cursor-pointer" />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
