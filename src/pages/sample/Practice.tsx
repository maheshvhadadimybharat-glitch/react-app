import React, { useState, useEffect } from "react";

interface UserProp {
  id: number,
  name: string,
  status: string
}

const Practice = () => {

  const initialData:UserProp[] = [
    { id: 1, name: "Mahesh", status: "online" },
    { id: 2, name: "Anjali", status: "offline" },
    { id: 3, name: "Manish", status: "online" },
  ];


  const [users, setUsers] = useState<UserProp[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=>{
    setUsers(initialData);
  }, []);

  const filteredUsers = users.filter((user: any) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <input
        id="name"
        type="text" 
        placeholder="Enter User Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
      {filteredUsers.map((user) => {
        return  <li key={user.id}>{user.name}</li>
      })}
      </ul>
        {/* Bonus: Total Online Count */}
      <p>Online: {filteredUsers.filter(u => u.status === 'online').length}</p>
      <p>Offline: {filteredUsers.filter(u => u.status === 'offline').length}</p>
    </div>
  )
}

export default Practice;


