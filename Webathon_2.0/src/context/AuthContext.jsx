/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthInitialized, setIsAuthInitialized] = useState(false);

    useEffect(() => {
        // Check active session immediately
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setIsAuthInitialized(true);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setIsAuthInitialized(true);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email, password, profileData) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: profileData // Attaching custom metadata (Name, Age, etc) directly into Supabase user obj
                }
            });
            if (error) throw error;

            // Sync strictly to the profiles table
            if (data?.user) {
                const { error: profileError } = await supabase.from('profiles').insert([{
                    id: data.user.id,
                    name: profileData.name,
                    age: profileData.age,
                    height: profileData.height,
                    weight: profileData.weight,
                    blood_group: profileData.bloodGroup,
                }]);

                if (profileError) {
                    console.error("Profile Insert Error:", profileError);
                    throw profileError;
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    const updateProfile = async (profileData) => {
        setIsLoading(true);
        try {
            // Update Auth Metadata
            const { error: authError } = await supabase.auth.updateUser({
                data: profileData
            });
            if (authError) throw authError;

            // Update Profiles Table
            if (user?.id) {
                const { error: profileError } = await supabase.from('profiles')
                    .update({
                        name: profileData.name,
                        age: profileData.age,
                        height: profileData.height,
                        weight: profileData.weight,
                        blood_group: profileData.bloodGroup,
                    })
                    .eq('id', user.id);

                if (profileError) throw profileError;
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthInitialized, login, signup, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
