import React, { createContext, useState, useContext, useEffect } from 'react';
import type { UserProps } from "../../types/UserType/UserType";
import { supabase } from '../../lib/supabase';
import { useAuth } from './AuthContext';

interface UserContextType {
  users: UserProps[],
  isLoading: boolean,
  addUser: (user: UserProps) => void,
  deleteUser: (id: number) => void,
  toggleStatus: (id: number) => void,
  toggleSort: () => void,
  sortOrder: string,
  updateUser: (id: number, data: { name: string; lastname: string }) => Promise<void>; // 👈 Add this line
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // sort state
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Create a function to toggle the sort
  const toggleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc': 'asc'))
  }

  // Move your Fetch Logic here!
  useEffect(()=>{
    const fetchUsers = async () => {
      setIsLoading(true);

      // const res = await fetch("https://jsonplaceholder.typicode.com/users");
      // const data = await res.json();

      // This is the Supabase "magic" syntax
      const {data, error} = await supabase
        .from('Users')
        .select('*')
        .order('created_at', { ascending: false }); // Newest users first!
      
      if (error) {
        console.error("Supabase Error:", error.message);
      } else {
        //console.log("Users fetched:", data); // Check your console!
        setUsers(data || []);
      } 

      // const formatted = data.map((u: any)=>({
      //   id: u.id,
      //   name: u.name.split(' ')[0],
      //   lastname: u.name.split(' ')[1] || "User",
      //   status: "online"
      // }))
      // setUsers(formatted);
      setIsLoading(false);
    }
    // Only fetch if we aren't in the middle of a "Login Check"
    if (!authLoading) {
      fetchUsers();
    }
  }, [authLoading, user]); // Re-run if the auth loading state changes or if the user changes (logs in/out)

  // Shared functions
  //const deleteUser = (id: number) => setUsers(users.filter(u => u.id !== id));
  //const addUser = (u: UserProps) => setUsers([...users, u]);
  const toggleStatus = async (id: number) => {
  const user = users.find(u => u.id === id);
  if (!user) return;

  const newStatus = user.status === 'online' ? 'offline' : 'online';

  // 🚀 The Database Call
  const { error } = await supabase
    .from('Users') // Ensure case matches (Users vs users)
    .update({ status: newStatus })
    .eq('id', id); // CRITICAL: This targets the specific user

  if (error) {
    console.error("Supabase Update Error:", error.message);
  } else {
    // The UI Update
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: newStatus } : u
    ));
  }
};
  

  // Update these to talk to the DB later, for now we update local state
  // const deleteUser = (id: number) => setUsers(users.filter(u => u.id !== id));

  const deleteUser = async (id: number) => {
    // 1. Tell Supabase to remove the row where 'id' matches
    const { error } = await supabase
      .from('Users')
      .delete()
      .eq('id', id); // 'eq' means 'where id equals'

      if (error) {
        console.error("Delete error:", error.message);
        alert("Could not delete user from database.");
      } else {
        // 2. Only if the DB is successful, update the UI
        setUsers(prev => prev.filter(u => u.id !== id));
      }

  }

  const addUser = (u: UserProps) => setUsers([u, ...users]);

  const updateUser = async (id: number, updatedData: { name: string; lastname: string }) => {
  const { error } = await supabase
    .from('Users')
    .update(updatedData)
    .eq('id', id);

  if (error) {
    console.error("Update Error:", error.message);
    alert("Could not update user.");
  } else {
    // Update local state so the UI changes immediately
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...updatedData } : u)));
  }
};

  const sortedUsers = [...users].sort((a, b)=>{
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if(sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }

  }) 

  // console.log("Sort Order:", sortOrder);
  // console.log("First User in Sorted List:", sortedUsers[0]?.name);

  return (
    <UserContext.Provider value={{ 
      users: sortedUsers, // we "rename" sortedUsers to 'users' here so the UI gets the sorted version! 
      isLoading, 
      addUser,
      deleteUser, 
      updateUser, // 👈 Without this, UserCard can't see it!
      toggleStatus, 
      toggleSort,
      sortOrder
      }}>
      {children}
    </UserContext.Provider>
  );

}  

// 3. A custom hook to make it easy to use
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used within a UserProvider");
  return context;
};
