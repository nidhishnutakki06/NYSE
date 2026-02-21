import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import Card from '../components/Card';
import Button from '../components/Button';
import { Calendar, MapPin, Clock, Users, AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Workshops() {
    const [workshops, setWorkshops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                // Fetch the workshops ordered by nearest date
                const { data, error } = await supabase
                    .from('workshops')
                    .select('*')
                    .order('date', { ascending: true });

                if (error) throw error;
                setWorkshops(data || []);
            } catch (err) {
                console.error("Error fetching workshops:", err);
                setError(err.message || "Failed to load workshops");
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkshops();
    }, []);

    // Helper to format date string
    const formatDate = (dateStr) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    };

    return (
        <div className="flex flex-col gap-8 h-full pb-8 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Sparkles className="text-[#CBFB5E]" /> Exclusive Workshops
                    </h1>
                    <p className="text-zinc-400 mt-1">Enroll in specialized training clinics to elevate your performance.</p>
                </div>
                <Button variant="outline" onClick={() => navigate(-1)}>
                    Back
                </Button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl flex items-center gap-3">
                    <AlertCircle size={20} />
                    <p>{error}</p>
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-10 h-10 border-4 border-[#CBFB5E]/30 border-t-[#CBFB5E] rounded-full animate-spin" />
                </div>
            ) : workshops.length === 0 ? (
                <Card className="p-12 text-center flex flex-col items-center justify-center bg-gradient-to-b from-[#18181B] to-[#09090B]">
                    <div className="w-20 h-20 bg-[#27272A] rounded-full flex items-center justify-center mb-4 text-zinc-500">
                        <Calendar size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Workshops Available</h3>
                    <p className="text-zinc-400 max-w-md">There are currently no upcoming workshops scheduled. Check back later or make sure your database table is populated!</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workshops.map((workshop) => (
                        <Card key={workshop.id} className="flex flex-col h-full bg-[#18181B] border-[#27272A] hover:border-[#CBFB5E]/50 transition-colors group overflow-hidden">
                            {/* Card Hero Header */}
                            <div className="h-32 bg-gradient-to-br from-[#27272A] to-[#09090B] p-6 relative flex flex-col justify-end group-hover:scale-105 transition-transform duration-500 origin-bottom">
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#CBFB5E] border border-[#CBFB5E]/30">
                                    Upcoming
                                </div>
                                <h2 className="text-xl font-black text-white leading-tight relative z-10 translate-y-2 group-hover:translate-y-0 transition-transform">
                                    {workshop.title}
                                </h2>
                            </div>

                            {/* Card Body content */}
                            <div className="p-6 flex flex-col flex-1 gap-4 bg-[#18181B] relative z-20">
                                <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed border-b border-[#27272A] pb-4">
                                    {workshop.description || "Join us for an intensive training clinic focused on breaking through your plateaus."}
                                </p>

                                <div className="flex flex-col gap-3 mt-2">
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <div className="p-1.5 bg-[#27272A] rounded-md text-[#CBFB5E]">
                                            <Calendar size={16} />
                                        </div>
                                        <span className="font-medium">{formatDate(workshop.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <div className="p-1.5 bg-[#27272A] rounded-md text-blue-400">
                                            <Clock size={16} />
                                        </div>
                                        <span className="font-medium">{workshop.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <div className="p-1.5 bg-[#27272A] rounded-md text-rose-400">
                                            <MapPin size={16} />
                                        </div>
                                        <span className="font-medium">{workshop.location}</span>
                                    </div>
                                    {workshop.instructor && (
                                        <div className="flex items-center gap-3 text-sm text-zinc-300">
                                            <div className="p-1.5 bg-[#27272A] rounded-md text-purple-400">
                                                <Users size={16} />
                                            </div>
                                            <span className="font-medium">Coach: {workshop.instructor}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto pt-6 flex justify-between items-center">
                                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                        {workshop.capacity ? `${workshop.capacity} Spots` : 'Limited Capacity'}
                                    </p>
                                    <Button size="sm" className="shadow-[0_0_15px_rgba(203,251,94,0.15)] group-hover:shadow-[0_0_20px_rgba(203,251,94,0.3)] transition-shadow">
                                        Enroll Now
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
