import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; // Import your client
import type { UserProps } from '../../types/UserType/UserType'; // Use your existing type
import toast from 'react-hot-toast';

const UserDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecificUser = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('Users')
          .select('*')
          .eq('id', id) // "Equal to" - finds the specific row
          .single();   // Tells Supabase to return one object, not an array

        if (error) throw error;
        setUser(data);
      } catch (error: any) {
        toast.error("Could not find this user.");
        navigate('/userpage'); // Redirect back if user doesn't exist
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSpecificUser();
  }, [id, navigate]);

  if (loading) return <div className="p-20 text-center font-bold">Loading Profile...</div>;
  if (!user) return null;

  return (
    <div className="p-10 max-w-xl mx-auto bg-white dark:bg-slate-800 shadow-lg rounded-2xl mt-10">
      <button 
        onClick={() => navigate(-1)} 
        className="text-blue-500 mb-4 hover:underline flex items-center gap-2">
        ← Back to Team
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
          {user.name[0]}{user.lastname[0]}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            {user.name} {user.lastname}
          </h1>
          <span className={`text-xs uppercase font-bold px-2 py-1 rounded-full ${
            user.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {user.status}
          </span>
        </div>
      </div>
      
      <div className="mt-6 space-y-4 border-t pt-6 text-slate-600 dark:text-slate-300">
        <p><strong>Member ID:</strong> {user.id}</p>
        <p><strong>Joined:</strong> {new Date(user.id).toLocaleDateString()}</p>
        {/* Note: If you add email or city to your Supabase table later, add them here! */}
      </div>
    </div>
  );
};

export default UserDetails;