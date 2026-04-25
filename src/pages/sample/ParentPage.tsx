import React, { useState, useEffect } from "react";
import UserSearch from "../../compenents/SearchableUser/UserSearch";
import UserList from "../../compenents/SearchableUser/UserList";

const ParentPage = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // Logic lives here in the parent
  const filteredUsers = users.filter((u: any) => 
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h1>Team Directory</h1>
      
      {/* 1. Pass state and setter to Search */}
      <UserSearch value={query} onChange={setQuery} />
      
      {/* 2. Pass the calculated results to List */}
      <UserList users={filteredUsers} />
    </div>
  );
};

export default ParentPage;