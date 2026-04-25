import React, { useState, useEffect } from "react"

interface UserInfo {
  id: number,
  name: string,
} 

const UserList = () => {
  const [users, setUser] = useState<UserInfo[]>([]);

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res)=> res.json())
    .then((data)=>{
      setUser(data);
    })
  }, []); // The empty [] means "only run once on load"



  return (
    <div>
      <h2>Team Members</h2>
      {users.map(user => <div key={user.id}> {user.name}</div>)}
    </div>
  )
}

export default UserList;