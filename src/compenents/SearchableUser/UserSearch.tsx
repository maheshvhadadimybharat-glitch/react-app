interface SearchProps {
  value: string,
  onChange: (val: string) => void;
}

const UserSearch = ({value, onChange}: SearchProps) => {
  return (
    <input 
      type="text" 
      placeholder="Search..."
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      style={{ padding: "10px", width: "100%", marginBottom: "15px" }}
      />
  )
}
export default UserSearch;