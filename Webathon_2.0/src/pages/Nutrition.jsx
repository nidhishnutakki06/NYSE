import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { Plus, Sparkles, X, ChevronRight, Droplets, Coffee, UtensilsCrossed, Apple, Moon } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function Nutrition() {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // State
    const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
    const [ingredientInput, setIngredientInput] = useState('');
    const [ingredients, setIngredients] = useState(['Chicken Breast', 'Rice', 'Broccoli', 'Eggs']);
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGeneratedPlan, setHasGeneratedPlan] = useState(false);
    const [aiMeals, setAiMeals] = useState([]);
    const [fetchError, setFetchError] = useState('');

    // Handlers
    const addIngredient = (e) => {
        e.preventDefault();
        if (ingredientInput.trim() && !ingredients.includes(ingredientInput.trim())) {
            setIngredients([...ingredients, ingredientInput.trim()]);
            setIngredientInput('');
            setFetchError('');
        }
    };

    const removeIngredient = (ing) => {
        setIngredients(ingredients.filter(i => i !== ing));
        setFetchError('');
    };

    const getIconForType = (type) => {
        switch (type.toLowerCase()) {
            case 'breakfast': return <Coffee size={16} />;
            case 'snack 1': return <Apple size={16} />;
            case 'lunch': return <UtensilsCrossed size={16} />;
            case 'drinks': return <Droplets size={16} />;
            case 'dinner': return <UtensilsCrossed size={16} />;
            case 'supper': return <Moon size={16} />;
            default: return <UtensilsCrossed size={16} />;
        }
    };

    const generateAIPlan = async () => {
        if (ingredients.length === 0) return;
        setIsGenerating(true);
        setFetchError('');

        try {
            const ai = new GoogleGenAI({ apiKey: 'AIzaSyB_xIKcQiFHnJJUH6gShQ3VhOxI7YRjpyY' });

            const prompt = `You are an expert sports nutritionist AI. I have the following ingredients: ${ingredients.join(', ')}.
Generate a highly optimized, full 7-day weekly meal plan maximizing macronutrient needs using primarily these ingredients. Make each day's meals unique to provide variety across the week.
Return the response STRICTLY as a raw JSON array, without markdown formatting or code blocks.
The JSON array must contain exactly 7 inner arrays (representing Monday through Sunday).
Each of the 7 inner arrays must contain exactly 6 objects (representing that day's meals in order: Breakfast, Snack 1, Lunch, Drinks, Dinner, Supper).
Each meal object must have the following keys:
- type: the meal type (MUST BE EXACTLY ONE OF: "Breakfast", "Snack 1", "Lunch", "Drinks", "Dinner", "Supper")
- name: a creative, appetizing name for the meal
- desc: a short sentence describing the meal
- cals: integer representing total calories
- p: integer representing grams of protein
- c: integer representing grams of carbohydrates
- f: integer representing grams of fats
Ensure the JSON is perfectly formatted. Do not include any text outside the JSON array.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            const textResponse = response.text.trim();
            const jsonString = textResponse.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
            const parsedWeeklyMeals = JSON.parse(jsonString);

            if (Array.isArray(parsedWeeklyMeals) && parsedWeeklyMeals.length === 7) {
                const weeklyMealsWithIcons = parsedWeeklyMeals.map((dayMeals, dayIdx) =>
                    dayMeals.map((m, mealIdx) => ({
                        ...m,
                        id: `d${dayIdx}-m${mealIdx}`, // Ensure unique ID
                        icon: getIconForType(m.type)
                    }))
                );
                setAiMeals(weeklyMealsWithIcons);
                setHasGeneratedPlan(true);
            } else {
                setFetchError('Failed to generate a complete 7-day weekly plan. Please try again.');
            }
        } catch (error) {
            console.error('AI Generation Error:', error);
            setFetchError('Error connecting to the AI. Please verify the API key or try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const currentMeals = aiMeals.length === 7 ? aiMeals[selectedDay] : [];
    const dailyCals = currentMeals.reduce((acc, meal) => acc + (Number(meal.cals) || 0), 0);
    const dailyProtein = currentMeals.reduce((acc, meal) => acc + (Number(meal.p) || 0), 0);

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

                    <div className="lg:w-64 flex flex-col justify-end gap-2">
                        {fetchError && <p className="text-xs text-red-400 font-semibold">{fetchError}</p>}
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
