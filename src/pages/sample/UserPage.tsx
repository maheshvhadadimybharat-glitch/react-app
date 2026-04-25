import React, { useState } from "react";
import type { UserProps } from "../../types/UserType/UserType";
import UserList from "../../compenents/UserList/UserList";
import SearchBar from "../../compenents/SearchBar/SearchBar";
import AddUserForm from "../../compenents/AddUserForm/AddUserForm";
import StatBar from "../../compenents/StatBar/StatBar";
import UserSkeleton from "../../compenents/UserSkeleton/UserSkeleton";
import { useUsers } from "../../compenents/GlobalContext/UserContext";
import { supabase } from "../../lib/supabase";
import DeleteModal from "../../compenents/Modals/DeleteModal";
import { useAuth } from "../../compenents/GlobalContext/AuthContext";
import { Link } from "react-router-dom";
import Button from "../../compenents/Button";
import toast from 'react-hot-toast';

const UserPage = () => {

  const { signOut } = useAuth();
  const { user } = useAuth();

  // Grab everything from the "Cloud"
  const { users, isLoading, deleteUser, toggleStatus, addUser } = useUsers();

  // Your search and filter logic stays here (because it's specific to this page)
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setisModalOpen] = useState(false);
  const [userToDelete, setuserToDelete] = useState<UserProps | null>(null);

  const {toggleSort, sortOrder} = useUsers();

  // 2. Create a handler for when the "Trash" icon is clicked
  const handleDeleteClick = (user: UserProps) => {
    //console.log("Clicked User:", user); // Check your console!
    setuserToDelete(user);
    setisModalOpen(true);
  };

  // 3. Create the actual confirmation handler
  const confirmDelete = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete.id); // This calls your existing Supabase logic
      setisModalOpen(false);
      setuserToDelete(null);
    }
  };

  // Style constants
  const loadingStyles = "flex flex-col items-center justify-center p-20 space-y-4";
  const spinner = "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500";
  const listStyles = {
  // ... your other styles
  emptyContainer: "flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200",
  emptyText: "text-gray-500 font-medium mt-2",
  emptySubtext: "text-gray-400 text-sm",
  clearBtn: "mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
};

  // States
  const [err, setError] = useState("");
 

  // User count
  const TotalUser = users.length;
  const OnlineUsers = users.filter(user=> user.status === "online").length;
  const OffileUsers = TotalUser - OnlineUsers;

  const AddUser = async (newUser: UserProps) => {

    if(newUser.name.trim() === "" || newUser.lastname.trim() === "") {
      toast.error("Please provide both a name and lastname.");
      return;
    }

    const loadingToast = toast.loading("Adding user...");   

    try {

      // Send to Supabase
      const { data, error } = await supabase
        .from('Users')
        .insert([
          { 
            name: newUser.name, 
            lastname: newUser.lastname, 
            status: 'online'
          }
        ])
        .select(); // This returns the user WITH the new ID from the DB

        if (error) throw error;

        if (data) {
          // Update our Global Brain with the real DB entry
          addUser(data[0]);
          toast.success("User added successfully!", { id: loadingToast });
        }
        
      // const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      //   method: "POST",
      //   body: JSON.stringify(newUser),
      //   headers: { "Content-type": "application/json" }
      // });

      //const savedUserFromServer = await response.json();

      // We use the ID the server gave us!
      //addUser( { ...newUser, id: savedUserFromServer.id });

      // if(response.ok) {
      //   // 2. ONLY if the server says "OK", update our local screen
      //   const savedUserFromServer = await response.json();

      //   // Correct Way: Use the function provided by the Context
      // // This tells the "Global Brain" to update the state for everyone
      // addUser({ ...newUser, id: savedUserFromServer.id });
      // }
      
    } catch(err: any) {
      //alert("Database error: Could not save user.");
      // This will show you if it's a "Policy Violation" or a "Table Not Found" error
      // 2. Catching RLS errors specifically
    if (err.code === '42501') { // Supabase RLS error code
      toast.error("Permission denied. Are you logged in?", { id: loadingToast });
    } else {
      toast.error(`Error: ${err.message}`, { id: loadingToast });
    }
    } finally {

    }
  }

  const fetchUsersData = users.filter((user: any) => 
    user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  )

   if(isLoading) {
    return (
    <div className="bg-white dark:bg-slate-900 min-h-screen p-10">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
       {[1, 2, 3, 4, 5].map(n => <UserSkeleton key={n} />)}
      </div>
    </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen">
        
      <div className="max-w-xl mx-auto">
      {user && (
        <Button label="Logout" variant="secondary" onClick={signOut} />
      )}

       {/* <ThemeToggle/> Add the button here! */}

       
      
      <AddUserForm onAdd={AddUser} disabled={!user}/>

      {!user && (
      <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded mt-2">
        Please <Link to="/authpage" className="underline">log in</Link> to add new members.
      </p>
    )}

      <StatBar total={TotalUser} online={OnlineUsers} offline={OffileUsers} />
      <SearchBar value={searchTerm} onSearch={setSearchTerm}/>
      
      {searchTerm && fetchUsersData.length === 0 ? (
        <div className={listStyles.emptyContainer}>
        <span className="text-4xl text-gray-300">🔍</span>
        <p className={listStyles.emptyText}>No matches found for "{searchTerm}"</p>
        <p className={listStyles.emptySubtext}>Try checking your spelling or using a different name.</p>
        <Button
          label="Clear Search"
          variant="secondary"
          onClick={() => setSearchTerm("")}
        />
      </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <button 
          onClick={toggleSort}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border rounded-lg hover:bg-slate-50 transition-all shadow-sm"
        >
          <span className="text-sm font-medium text-slate-600">
            Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </span>
          {/* A simple arrow icon that flips based on order */}
          <span className={`transition-transform duration-300 ${sortOrder === 'desc' ? 'rotate-180' : ''}`}>
            ↓
          </span>
        </button>
      </div>
        
        <UserList 
          items={fetchUsersData} 
          onDelete={handleDeleteClick} // 👈 Change this to trigger the modal!
          onToggleStatus={toggleStatus} // Check: Is this line here?
        />
        </div>
      )}
      
  </div>

    <DeleteModal 
      isOpen={isModalOpen}
      onClose={() => setisModalOpen(false)}
      onConfirm={confirmDelete}
      userName={userToDelete ? `${userToDelete.name} ${userToDelete.lastname}` : ""}
    />

    </div>
  )

}

export default UserPage;