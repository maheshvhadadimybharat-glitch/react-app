import type { AuthContextType } from "../../types/AuthType/AuthType";
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from '../../lib/supabase';
import type { User } from '@supabase/supabase-js';

// 1. Create the Context object
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect (()=>{
    // 1. Check for an existing session when the app starts
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // 2. Listen for changes (Login, Logout, Password Recovery)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();

  }, [])

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

// 2. Export the "useAuth" hook so AppRouter can see it
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};



