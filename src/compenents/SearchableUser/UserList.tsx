interface UserProps {
  id: number,
  name: string,
}

const UserList = ({ users }: {users : UserProps[]}) => {
  return (
    <div>
      <ul>
        {users.map(user => (
      <li key={user.id} style={{ padding: "5px 0" }}>
        👤 {user.name}
      </li>
    ))}
      </ul>
      {users.length === 0 && <p>No results found.</p>}
    </div>
  )
}

export default UserList;