import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../context/AuthContext';

export default function ProtectedLayout() {
    const { user, isAuthInitialized } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Only redirect if auth has finished initializing and no user is present
        if (isAuthInitialized && !user) {
            navigate('/login', { replace: true });
        }
    }, [user, isAuthInitialized, navigate]);

    // Show a sleek loading state while Supabase checks the session token
    if (!isAuthInitialized) {
        return (
            <div className="flex min-h-screen bg-[#09090B] items-center justify-center">
                <div className="w-8 h-8 rounded-full border-4 border-[#CBFB5E]/30 border-t-[#CBFB5E] animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#09090B]">
            <Sidebar />
            <div className="flex-1 flex flex-col md:ml-64 w-full h-screen overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 no-scrollbar relative min-h-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
