import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    login: (email: string, password?: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isAdmin: false,
    login: async () => { },
    logout: async () => { }
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Try to get role from supabase, else default to customer
                let role = 'customer';
                try {
                    // Check if supabase is configured before making value
                    if (supabase) {
                        const { data: userProfile } = await supabase
                            .from('users')
                            .select('role')
                            .eq('id', firebaseUser.uid)
                            .single();
                        if (userProfile?.role) role = userProfile.role;
                    }
                } catch (e) {
                    console.log('Supabase fetch failed or not configured', e);
                }

                setUser({
                    id: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    role: role as 'admin' | 'customer'
                });
                setIsAdmin(role === 'admin');
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password?: string) => {
        if (auth) {
            // Real Firebase Login
            if (!password) throw new Error("Password required for real auth");
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            // Mock Login
            console.log("Using Mock Login");
            const isAdminUser = email.includes('admin');
            const mockUser: User = {
                id: 'mock-user-id-' + Math.random().toString(36).substr(2, 9),
                email: email,
                displayName: email.split('@')[0],
                role: isAdminUser ? 'admin' : 'customer'
            };
            setUser(mockUser);
            setIsAdmin(isAdminUser);
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    const logout = async () => {
        if (auth) {
            await firebaseSignOut(auth);
        } else {
            setUser(null);
            setIsAdmin(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
