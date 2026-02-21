import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { Plus, Sparkles, X, ChevronRight, Droplets, Coffee, UtensilsCrossed, Apple, Moon } from 'lucide-react';

export default function Nutrition() {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // State
    const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
    const [ingredientInput, setIngredientInput] = useState('');
    const [ingredients, setIngredients] = useState(['Chicken Breast', 'Rice', 'Broccoli', 'Eggs']);
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGeneratedPlan, setHasGeneratedPlan] = useState(false);

    // Handlers
    const addIngredient = (e) => {
        e.preventDefault();
        if (ingredientInput.trim() && !ingredients.includes(ingredientInput.trim())) {
            setIngredients([...ingredients, ingredientInput.trim()]);
            setIngredientInput('');
        }
    };

    const removeIngredient = (ing) => {
        setIngredients(ingredients.filter(i => i !== ing));
    };

    const generateAIPlan = () => {
        if (ingredients.length === 0) return;
        setIsGenerating(true);
        // Mock AI Loading delay
        setTimeout(() => {
            setIsGenerating(false);
            setHasGeneratedPlan(true);
        }, 2000);
    };

    // Mock Dynamic Data Generation (6 Meals)
    const getMealsForDay = (dayIndex) => {
        // Just adding some slight variation based on day index to prove it changes
        const v = dayIndex;

        return [
            { id: 'm1', type: 'Breakfast', icon: <Coffee size={16} />, name: `Power Scramble`, desc: `3 Eggs, Spinach, and 1 slice Whole Wheat Toast.`, cals: 320 + (v * 5), p: 24, c: 15, f: 18 },
            { id: 'm2', type: 'Snack 1', icon: <Apple size={16} />, name: `Greek Yogurt Twist`, desc: `Plain Greek Yogurt with mixed berries and a drizzle of honey.`, cals: 180 + (v * 2), p: 15, c: 22, f: 0 },
            { id: 'm3', type: 'Lunch', icon: <UtensilsCrossed size={16} />, name: `Lemon Herb Chicken Bowl`, desc: `Grilled Chicken Breast, Quinoa, and steamed Broccoli.`, cals: 450 + (v * 10), p: 45, c: 40, f: 12 },
            { id: 'm4', type: 'Drinks', icon: <Droplets size={16} />, name: `Pre-Workout Matrix`, desc: `Whey Protein isolate shake with Creatine and 1 Banana.`, cals: 220 + v, p: 25, c: 27, f: 2 },
            { id: 'm5', type: 'Dinner', icon: <UtensilsCrossed size={16} />, name: `Teriyaki Glazed Salmon`, desc: `Baked Salmon with Jasmine Rice and Asparagus.`, cals: 550 + (v * 12), p: 40, c: 45, f: 22 },
            { id: 'm6', type: 'Supper', icon: <Moon size={16} />, name: `Casein Pudding`, desc: `Casein protein mixed with almond milk, topped with walnuts.`, cals: 200 + (v * 4), p: 24, c: 8, f: 9 },
        ];
    };

    const currentMeals = getMealsForDay(selectedDay);
    const dailyCals = currentMeals.reduce((acc, meal) => acc + meal.cals, 0);
    const dailyProtein = currentMeals.reduce((acc, meal) => acc + meal.p, 0);

    return (
        <div className="flex flex-col gap-8 h-full pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Nutrition Center</h1>
                    <p className="text-zinc-400 mt-1">Smart tracking mapped to your physical output.</p>
                </div>
            </div>

            {/* 1. AI Ingredients Input Section */}
            <Card className="bg-gradient-to-br from-[#18181B] to-[#27272A] border-[#CBFB5E]/20">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-[#CBFB5E]" size={20} />
                    <h2 className="text-lg font-bold text-white">AI Pantry Planner</h2>
                </div>
                <p className="text-zinc-400 text-sm mb-6 max-w-2xl">
                    Enter the ingredients you currently have available. Our AI will automatically generate a highly optimized 6-meal daily protocol maximizing your macronutrient needs using only what you have.
                </p>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                        <form onSubmit={addIngredient} className="flex gap-2 mb-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="e.g., Chicken Breast, Oats, Almonds..."
                                    value={ingredientInput}
                                    onChange={(e) => setIngredientInput(e.target.value)}
                                />
                            </div>
                            <Button type="submit" variant="secondary" className="px-4"><Plus size={18} /></Button>
                        </form>

                        <div className="flex flex-wrap gap-2 min-h-[40px]">
                            {ingredients.length === 0 ? (
                                <span className="text-sm text-zinc-500 italic">No ingredients added yet.</span>
                            ) : (
                                ingredients.map((ing, idx) => (
                                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-[#27272A] border border-[#3F3F46] rounded-lg text-sm text-white group">
                                        {ing}
                                        <button onClick={() => removeIngredient(ing)} className="text-zinc-500 hover:text-red-400 focus:outline-none">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="lg:w-64 flex flex-col justify-end">
                        <Button
                            onClick={generateAIPlan}
                            disabled={ingredients.length === 0 || isGenerating}
                            className="w-full justify-center py-4 bg-[#CBFB5E] hover:bg-[#b5e550] text-black shadow-[0_0_20px_rgba(203,251,94,0.2)]"
                        >
                            {isGenerating ? (
                                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span> Processing...</span>
                            ) : (
                                <span className="flex items-center gap-2"><Sparkles size={18} /> Generate AI Plan</span>
                            )}
                        </Button>
                    </div>
                </div>
            </Card>

            {/* AI Results View */}
            {hasGeneratedPlan && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-8">

                    {/* 2. Weekly Calendar Day Switcher */}
                    <div>
                        <div className="flex items-end justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Your Protocol</h2>
                            <div className="text-right">
                                <p className="text-2xl font-black text-white">{dailyCals} <span className="text-sm font-medium text-zinc-400 uppercase">kcal</span></p>
                                <p className="text-sm text-[#CBFB5E] font-bold">{dailyProtein}g Protein Target</p>
                            </div>
                        </div>

                        <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
                            {weekDays.map((day, i) => {
                                const isSelected = selectedDay === i;
                                const isToday = i === (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);

                                return (
                                    <button
                                        key={day}
                                        onClick={() => setSelectedDay(i)}
                                        className={`
                                            snap-start flex-shrink-0 flex flex-col items-center justify-center 
                                            w-20 h-24 rounded-2xl border transition-all duration-200
                                            ${isSelected
                                                ? 'bg-[#CBFB5E] border-[#CBFB5E] shadow-[0_0_15px_rgba(203,251,94,0.3)] scale-105'
                                                : isToday
                                                    ? 'bg-[#18181B] border-zinc-500 hover:bg-[#27272A]'
                                                    : 'bg-[#18181B] border-[#27272A] hover:bg-[#27272A] hover:border-zinc-500'
                                            }
                                        `}
                                    >
                                        <span className={`text-xs font-semibold mb-1 ${isSelected ? 'text-black/70' : 'text-zinc-500'}`}>
                                            {day}
                                        </span>
                                        <span className={`text-2xl font-bold ${isSelected ? 'text-black' : 'text-white'}`}>
                                            {i + 15}
                                        </span>
                                        {isToday && !isSelected && (
                                            <div className="w-1.5 h-1.5 rounded-full mt-1 bg-[#CBFB5E]" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. Daily 6-Meal Display */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentMeals.map((meal) => (
                            <Card key={meal.id} className="flex flex-col h-full hover:border-[#CBFB5E]/30 transition-colors group">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2 bg-[#27272A]/50 px-3 py-1 rounded-full border border-[#3F3F46]">
                                            <span className="text-[#CBFB5E]">{meal.icon}</span>
                                            <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">{meal.type}</span>
                                        </div>
                                        <span className="text-sm font-bold text-white">{meal.cals} <span className="text-zinc-500 font-normal">kcal</span></span>
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-[#CBFB5E] transition-colors">{meal.name}</h3>
                                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed bg-[#18181B] p-3 rounded-lg border border-[#27272A]">{meal.desc}</p>
                                </div>

                                <div className="mt-auto grid grid-cols-3 gap-2 pt-4 border-t border-[#27272A]">
                                    <div className="bg-[#CBFB5E]/5 border border-[#CBFB5E]/10 rounded-lg p-2 text-center">
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Protein</p>
                                        <p className="font-bold text-white">{meal.p}<span className="text-zinc-500 text-xs">g</span></p>
                                    </div>
                                    <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-2 text-center">
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Carbs</p>
                                        <p className="font-bold text-white">{meal.c}<span className="text-zinc-500 text-xs">g</span></p>
                                    </div>
                                    <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-2 text-center">
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Fats</p>
                                        <p className="font-bold text-white">{meal.f}<span className="text-zinc-500 text-xs">g</span></p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
