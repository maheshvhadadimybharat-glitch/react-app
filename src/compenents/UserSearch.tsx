import React, { useState, useEffect } from "react";

interface User {
  id: number,
  name: string,
  email: string
}

const UserSearch = () => {
  
  const [users, setUsers] =  useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchUsers = async() => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
      } catch(error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false);
      }
    }; 
    fetchUsers();
  }, []);

  // 3. Derived State: Filter the list based on the search term
  // We don't need a separate state for "filteredUsers" because we can calculate it during render
  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading Directory...</p>;

  return (
    <div>
      <h2>User Directory</h2>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
  
      />

      <hr />

      {/* Results List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id} >
              <strong>{user.name}</strong>
              <br />
              <small style={{ color: "#666" }}>{user.email}</small>
            </li>
          ))
        ) : (
          <p>No users found matching "{searchTerm}"</p>
        )}
      </ul>
    </div>
  );

}

export default UserSearch;