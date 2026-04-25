import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const UserDetails = () => {
  const { id } = useParams(); // Grabs the ID from the URL (/user/5)
  const navigate = useNavigate(); // For the "Back" button
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <p>Loading Profile...</p>;

  return (
    <div className="p-10 max-w-xl mx-auto bg-white shadow-lg rounded-2xl mt-10">
      <button 
        onClick={() => navigate(-1)} // "-1" means go back one step in history
        className="text-blue-500 mb-4">
        ← Back to Team</button>
      <h1 className="text-4xl font-bold">{user.name}</h1>
      <p className="text-gray-500">@{user.username}</p>
      
      <div className="mt-6 space-y-2 border-t pt-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>City:</strong> {user.address.city}</p>
      </div>
    </div>
  );
};

export default UserDetails;