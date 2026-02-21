import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Play } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import { MOCK_WORKOUT_LIBRARY } from '../services/mockData';

export default function Workouts() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredWorkouts = MOCK_WORKOUT_LIBRARY.filter(w =>
        w.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8 h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Workout Library</h1>
                    <p className="text-zinc-400 mt-1">Browse and filter highly adaptive routines.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <Input
                            placeholder="Search workouts..."
                            className="pl-10 !mb-0"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="bg-[#27272A] p-3 flexitems-center justify-center border border-[#3F3F46] hover:border-[#CBFB5E] transition-colors rounded-xl text-white">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.map(workout => (
                    <Card key={workout.id} hoverEffect className="group flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-[#CBFB5E]/20 text-[#CBFB5E] text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                                    {workout.target}
                                </span>
                                <span className="text-zinc-400 text-sm font-medium">{workout.duration}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{workout.title}</h3>
                            <p className="text-zinc-400 text-sm">Intensity: <span className="text-white font-medium">{workout.intensity}</span></p>
                        </div>

                        <button
                            onClick={() => navigate('/training')}
                            className="mt-6 w-full py-3 rounded-lg flex items-center justify-center gap-2 bg-[#18181B] border border-[#27272A] group-hover:bg-[#CBFB5E] group-hover:border-[#CBFB5E] group-hover:text-black text-white font-bold transition-all duration-300"
                        >
                            <Play size={18} /> Start Workout
                        </button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
