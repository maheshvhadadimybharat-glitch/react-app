import type { User } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;  //  The logged-in user object
  loading: boolean;    // To prevent "flicker" on refresh
  signOut: ()=> Promise<void>; 
}