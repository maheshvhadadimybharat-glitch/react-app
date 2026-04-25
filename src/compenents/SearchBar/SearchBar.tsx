const searchStyles = {
  container: "relative mb-6",
  input: "w-full pl-10 pl-6 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm",
  icon: "absolute left-3 top-2.5 text-gray-400"
};

interface SearchProps {
  value: string,
  onSearch: (text: string) => void  
}

const SearchBar = ({value, onSearch}: SearchProps) => {
  return (
  <div className={searchStyles.container}>
    <span className={searchStyles.icon}>🔍</span>
    <input 
      className={searchStyles.input}
      type="text" 
      placeholder="Type here..."
      value={value}
      onChange={(e)=> onSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchBar;