import React, { useEffect, useState } from 'react';
import { Camera, AlertCircle, Maximize, Play, Pause, ChevronLeft, CheckCircle2, TrendingUp, Target, Award, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import PostureTracker from '../components/PostureTracker';
import { useWorkouts } from '../context/WorkoutContext';

export default function Training() {
    const navigate = useNavigate();
    const location = useLocation();
    const { addWorkout } = useWorkouts();

    // Safely retrieve workout from navigation state or assign a fallback
    const workout = location.state?.workout || {
        title: 'Full Body Core Crusher',
        duration: '45 Min',
        intensity: 'High',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    };

    // Status can be 'idle', 'active', 'completed'
    const [workoutStatus, setWorkoutStatus] = useState('idle');
    const [timeLeft, setTimeLeft] = useState(15); // 15 second timer
    const [reps, setReps] = useState(0);
    const [postureCorrect, setPostureCorrect] = useState(true);

    // Timer Logic
    useEffect(() => {
        let timer;
        if (workoutStatus === 'active' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
                // Randomly mock reps going up while active
                if (Math.random() > 0.5) setReps(r => r + 1);
            }, 1000);
        } else if (workoutStatus === 'active' && timeLeft === 0) {
            setWorkoutStatus('completed');
        }

        return () => clearInterval(timer);
    }, [workoutStatus, timeLeft]);

    const toggleWorkout = () => {
        if (workoutStatus === 'idle') {
            setWorkoutStatus('active');
        } else if (workoutStatus === 'active') {
            // If user pauses, we'll just mock it as going back to idle for now to keep it simple
            setWorkoutStatus('idle');
        }
    };

    const resetWorkout = () => {
        setWorkoutStatus('idle');
        setTimeLeft(15);
        setReps(0);
    };

    const handleScheduleSuggested = (suggestedWorkout) => {
        // Create a new workout object and push to global context
        const newWorkout = {
            id: Date.now().toString(),
            title: suggestedWorkout.title,
            duration: suggestedWorkout.duration.split(' • ')[0],
            intensity: suggestedWorkout.duration.split(' • ')[1],
            target: suggestedWorkout.tag,
            url: workout.url // Use the same base URL or a placeholder if a unique one isn't defined
        };
        addWorkout(newWorkout);
        navigate('/workouts');
    };

    // -------------------------------------------------------------------------------- //
    // RENDER: PERFORMANCE DASHBOARD (COMPLETED STATE)
    // -------------------------------------------------------------------------------- //
    if (workoutStatus === 'completed') {
        const mockAccuracy = 88;
        const mockRating = "A-";

        return (
            <div className="flex flex-col h-full gap-8 overflow-y-auto no-scrollbar pb-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center pt-8 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-[#CBFB5E]/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-[#CBFB5E]/10">
                        <CheckCircle2 size={40} className="text-[#CBFB5E]" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">Workout Complete!</h1>
                    <p className="text-zinc-400">Great job. Your AI posture analysis is ready.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Key Metrics */}
                    <Card className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#18181B] to-[#27272A] border-[#27272A] relative overflow-hidden group">
                        <Target size={24} className="text-[#CBFB5E] mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-zinc-400 font-medium uppercase tracking-wider mb-2 text-sm">Form Accuracy</h3>
                        <p className="text-6xl font-black text-white">{mockAccuracy}<span className="text-2xl text-zinc-500">%</span></p>
                    </Card>

                    <Card className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#18181B] to-[#27272A] border-[#27272A] group">
                        <Award size={24} className="text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-zinc-400 font-medium uppercase tracking-wider mb-2 text-sm">Session Rating</h3>
                        <p className="text-6xl font-black text-yellow-500">{mockRating}</p>
                    </Card>

                    <Card className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#18181B] to-[#27272A] border-[#27272A] group">
                        <TrendingUp size={24} className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-zinc-400 font-medium uppercase tracking-wider mb-2 text-sm">Total Reps</h3>
                        <p className="text-6xl font-black text-white">{reps}</p>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Feedback Points Lists */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <AlertCircle className="text-rose-500" size={20} /> AI Feedback Points
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                                <div className="min-w-2 mt-1.5 h-2 rounded-full bg-rose-500" />
                                <div>
                                    <p className="font-bold text-white">Depth on Squats</p>
                                    <p className="text-sm text-zinc-400 mt-1">You missed parallel depth on 15% of your recorded reps. Try widening your stance slightly next session.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                                <div className="min-w-2 mt-1.5 h-2 rounded-full bg-amber-500" />
                                <div>
                                    <p className="font-bold text-white">Upper Back Rounding</p>
                                    <p className="text-sm text-zinc-400 mt-1">Detected minor rounding during the last 30 seconds. Keep your chest proud when fatigued.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                                <div className="min-w-2 mt-1.5 h-2 rounded-full bg-emerald-500" />
                                <div>
                                    <p className="font-bold text-white">Consistent Tempo</p>
                                    <p className="text-sm text-zinc-400 mt-1">Excellent control on the eccentric portion of all movements.</p>
                                </div>
                            </li>
                        </ul>
                    </Card>

                    {/* Next Suggested Workouts */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <ArrowRight className="text-blue-400" size={20} /> Suggested Next Workouts
                        </h2>
                        <p className="text-zinc-400 text-sm mb-6">Based on your fatigue levels and form breakdown today, here is what our engine recommends for your next sessions:</p>

                        <div className="space-y-3">
                            {[
                                { title: 'Active Recovery Flow', desc: '15 Min • Low Intensity', tag: 'Mobility' },
                                { title: 'Core Crusher Vol. 2', desc: '20 Min • Medium Intensity', tag: 'Strength' },
                                { title: 'Upper Body Power', desc: '45 Min • High Intensity', tag: 'Strength' },
                            ].map((w, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[#27272A] hover:border-[#CBFB5E]/50 hover:bg-[#27272A]/30 transition-all cursor-pointer group">
                                    <div>
                                        <p className="font-bold text-white group-hover:text-[#CBFB5E] transition-colors">{w.title}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xs text-zinc-400">{w.desc}</span>
                                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#27272A] text-zinc-300">{w.tag}</span>
                                        </div>
                                    </div>
                                    <Button onClick={() => handleScheduleSuggested(w)} variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Schedule</Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="flex justify-center mt-4">
                    <Button onClick={resetWorkout} className="px-12 py-4 text-lg">Done</Button>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------------------------- //
    // RENDER: DEFAULT TRAINING STUDIO (IDLE & ACTIVE STATES)
    // -------------------------------------------------------------------------------- //
    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/workouts')} className="p-2 bg-[#18181B] border border-[#27272A] rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{workout.title}</h1>
                        <p className="text-zinc-400 text-sm mt-1">Intensity: {workout.intensity} • Duration: {workout.duration}</p>
                    </div>
                </div>
                <Button onClick={toggleWorkout} variant={workoutStatus === 'active' ? 'secondary' : 'primary'} className="w-32 justify-center">
                    {workoutStatus === 'active' ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
                </Button>
            </div>

            {/* Split Screen Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">

                {/* Left: YouTube Video Reference */}
                <Card className={`flex flex-col gap-4 !p-4 transition-all duration-300 ${workoutStatus === 'active' ? 'opacity-50 blur-sm scale-95 pointer-events-none' : ''}`}>
                    <div className="flex justify-between items-center px-2">
                        <h2 className="font-bold text-white text-lg">Trainer Guide</h2>
                        <button className="text-zinc-400 hover:text-white"><Maximize size={18} /></button>
                    </div>
                    <div className="w-full h-full rounded-xl overflow-hidden bg-black relative border border-[#27272A] min-h-[300px]">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`${workout.url}?autoplay=0&controls=1&showinfo=0`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                    </div>
                </Card>

                {/* Right: AI Feedback Panel & Webcam */}
                <Card className={`flex flex-col gap-4 !p-4 relative overflow-hidden transition-all duration-300 ${workoutStatus === 'active' ? 'ring-2 ring-[#CBFB5E] shadow-[0_0_30px_rgba(203,251,94,0.15)] scale-[1.02] z-10' : 'ring-1 ring-[#CBFB5E]/20'}`}>

                    {/* Header bar */}
                    <div className="flex justify-between items-center px-2 z-20">
                        <h2 className="font-bold text-white text-lg flex items-center gap-2">
                            <Camera size={18} className={workoutStatus === 'active' ? "text-red-500 animate-pulse" : "text-[#CBFB5E]"} />
                            {workoutStatus === 'active' ? 'Tracking Active' : 'AI Form Analysis'}
                        </h2>

                        <div className="flex items-center gap-3">
                            {workoutStatus === 'active' && (
                                <div className="bg-red-500/10 px-4 py-1.5 rounded-lg border border-red-500/30 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="font-bold text-red-500 font-mono text-xl">00:{timeLeft.toString().padStart(2, '0')}</span>
                                </div>
                            )}
                            <div className="bg-[#18181B] px-4 py-1.5 rounded-lg border border-[#3F3F46]">
                                <span className="text-zinc-400 text-sm mr-2">Reps:</span>
                                <span className="text-xl font-bold text-[#CBFB5E]">{reps}</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[400px] lg:h-full rounded-xl bg-black relative overflow-hidden border border-[#27272A]">
                        {workoutStatus === 'active' ? (
                            <PostureTracker onPostureStatusChange={setPostureCorrect} />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                                <Camera size={48} className="mb-4 opacity-50" />
                                <p>Waiting for tracker activation...</p>
                                <p className="text-xs mt-2 text-center px-8">Ensure your browser allows camera access to use real-time AI tracking.</p>
                            </div>
                        )}

                        {/* ML Live Telemetry Overlays - Only visible when ACTIVE */}
                        {workoutStatus === 'active' && (
                            <>
                                <div className={`absolute top-0 left-0 w-full h-full border-[3px] pointer-events-none transition-colors duration-300 ${postureCorrect ? 'border-[#CBFB5E]/40' : 'border-red-500/80 animate-pulse'}`} />

                                {/* Real-time Feedback Modals */}
                                <div className="absolute top-4 left-4 right-4 flex flex-col gap-2 pointer-events-none z-50">
                                    {postureCorrect ? (
                                        <div className="bg-[#09090B]/80 backdrop-blur border border-[#CBFB5E] text-[#CBFB5E] px-4 py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(203,251,94,0.2)] inline-block self-start">
                                            Posture Optimal • Tracking
                                        </div>
                                    ) : (
                                        <div className="bg-red-500/90 backdrop-blur border border-red-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-in slide-in-from-top-2">
                                            <AlertCircle size={16} /> Hands must be near head!
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Idle Overlay */}
                        {workoutStatus === 'idle' && (
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center backdrop-blur-[2px]">
                                <Button onClick={toggleWorkout} size="lg" className="pl-6 pr-8 text-xl rounded-full shadow-[0_0_30px_rgba(203,251,94,0.3)] hover:scale-105 transition-transform">
                                    <Play size={24} className="mr-2 fill-current" /> Start Session
                                </Button>
                                <p className="text-zinc-400 mt-4 text-sm max-w-xs text-center">Click start to activate real-time AI posture detection.</p>
                            </div>
                        )}
                    </div>
                </Card>

            </div>
        </div>
    );
}
