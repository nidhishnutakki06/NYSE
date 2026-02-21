import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../context/AuthContext';

export default function ProtectedLayout() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If you uncomment below, it forces the user to log in
        // if (!user) navigate('/login', { replace: true });
    }, [user, navigate]);

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
