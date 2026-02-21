import React, { useEffect, useRef, useState } from 'react';
import { Camera, AlertCircle, Maximize, Play, Pause, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Training() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [hasCamera, setHasCamera] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [reps, setReps] = useState(0);

    useEffect(() => {
        // Attempt to access webcam
        async function setupCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setHasCamera(true);
            } catch (err) {
                console.error("Camera access denied or unavailable", err);
                setHasCamera(false);
            }
        }
        setupCamera();

        return () => {
            // Cleanup stream on dismount
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const toggleWorkout = () => {
        setIsRecording(!isRecording);
        // Simulate reps going up just for UI effect
        if (!isRecording) {
            setReps(r => r + 1);
        }
    };

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/workouts')} className="p-2 bg-[#18181B] border border-[#27272A] rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Full Body Core Crusher</h1>
                        <p className="text-zinc-400 text-sm mt-1">Intensity: High • Duration: 45 Min</p>
                    </div>
                </div>
                <Button onClick={toggleWorkout} variant={isRecording ? 'secondary' : 'primary'}>
                    {isRecording ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
                </Button>
            </div>

            {/* Split Screen Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">

                {/* Left: YouTube Video Reference */}
                <Card className="flex flex-col gap-4 !p-4 h-[400px] lg:h-auto">
                    <div className="flex justify-between items-center px-2">
                        <h2 className="font-bold text-white text-lg">Trainer Guide</h2>
                        <button className="text-zinc-400 hover:text-white"><Maximize size={18} /></button>
                    </div>
                    <div className="w-full h-full rounded-xl overflow-hidden bg-black relative border border-[#27272A]">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&showinfo=0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                    </div>
                </Card>

                {/* Right: AI Feedback Panel & Webcam */}
                <Card className="flex flex-col gap-4 !p-4 h-[500px] lg:h-auto relative overflow-hidden ring-1 ring-[#CBFB5E]/20">
                    <div className="flex justify-between items-center px-2">
                        <h2 className="font-bold text-white text-lg flex items-center gap-2">
                            <Camera size={18} className="text-[#CBFB5E]" /> AI Form Analysis
                        </h2>
                        <div className="bg-[#18181B] px-4 py-1 rounded-lg border border-[#3F3F46]">
                            <span className="text-zinc-400 text-sm mr-2">Reps:</span>
                            <span className="text-2xl font-bold text-[#CBFB5E]">{reps}</span>
                        </div>
                    </div>

                    <div className="w-full flex-1 rounded-xl bg-black relative overflow-hidden border border-[#27272A]">
                        {hasCamera ? (
                            <video ref={videoRef} autoPlay playsInline muted className="object-cover w-full h-full opacity-80" />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                                <Camera size={48} className="mb-4 opacity-50" />
                                <p>Waiting for camera permissions...</p>
                                <p className="text-xs mt-2 text-center px-8">Ensure your browser allows camera access to use real-time AI tracking.</p>
                            </div>
                        )}

                        {/* Mock AI Overlays */}
                        {isRecording && hasCamera && (
                            <>
                                <div className="absolute top-0 left-0 w-full h-full border-[3px] border-[#CBFB5E]/40" />
                                {/* Skeleton joints overlay (mock) */}
                                <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-[#CBFB5E] shadow-[0_0_10px_#CBFB5E]" />
                                <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-[#CBFB5E] shadow-[0_0_10px_#CBFB5E]" />
                                <div className="absolute top-3/4 right-1/3 w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_red]" />

                                {/* Feedback Modals */}
                                <div className="absolute top-4 left-4 right-4 flex flex-col gap-2 pointer-events-none">
                                    <div className="bg-[#09090B]/80 backdrop-blur border border-[#CBFB5E] text-[#CBFB5E] px-4 py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(203,251,94,0.2)]">
                                        Good form
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 pointer-events-none">
                                    <div className="bg-red-500/20 backdrop-blur border border-red-500 text-red-500 px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                        <AlertCircle size={16} /> Lower hips
                                    </div>
                                    <div className="bg-orange-500/20 backdrop-blur border border-orange-500 text-orange-500 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                                        <AlertCircle size={16} /> Adjust posture
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Card>

            </div>
        </div>
    );
}
