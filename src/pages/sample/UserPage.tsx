import React, { useState } from "react";
import type { UserProps } from "../../types/UserType/UserType";
import UserList from "../../compenents/UserList/UserList";
import SearchBar from "../../compenents/SearchBar/SearchBar";
import AddUserForm from "../../compenents/AddUserForm/AddUserForm";
import StatBar from "../../compenents/StatBar/StatBar";
import UserSkeleton from "../../compenents/UserSkeleton/UserSkeleton";
import { useUsers } from "../../compenents/GlobalContext/UserContext.context";
import { supabase } from "../../lib/supabase";
import DeleteModal from "../../compenents/Modals/DeleteModal";
import { useAuth } from "../../compenents/GlobalContext/AuthContext.context";
import { Link } from "react-router-dom";
import MaterialButton from "../../compenents/MaterialButton/MaterialButton";
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import { Button } from "../../compenents/atoms/Button";
import { MdOutlineFilterAlt } from "react-icons/md";
import Icon from "../../compenents/atoms/Icon/Icon";

const UserPage = () => {

  const { signOut } = useAuth();
  const { user } = useAuth();

  // Grab everything from the "Cloud"
  const { users, isLoading, deleteUser, toggleStatus, addUser } = useUsers();

  // Your search and filter logic stays here (because it's specific to this page)
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setisModalOpen] = useState(false);
  const [userToDelete, setuserToDelete] = useState<UserProps | null>(null);

  const [activeStatuses, setActiveStatuses] = useState<string[]>(['online', 'offline']);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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
  const listStyles = {
  // ... your other styles
  emptyContainer: "flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200",
  emptyText: "text-gray-500 font-medium mt-2",
  emptySubtext: "text-gray-400 text-sm",
  clearBtn: "mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
};

  // States
 

  // User count
  const TotalUser = users.length;
  const OnlineUsers = users.filter(user=> user.status === "online").length;
  const OffileUsers = TotalUser - OnlineUsers;

  const AddUser = async (newUser: UserProps) => {

    // if(newUser.name.trim() === "" || newUser.lastname.trim() === "") {
    //   toast.error("Please provide both a name and lastname.");
    //   return;
    // }

    // 1. Validation Logic
    if (!newUser.name.trim() || !newUser.lastname.trim()) {
      toast.error("Name fields cannot be empty");
      return;
    }

    const loadingToast = toast.loading("Creating member...");   

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
        .select() // This returns the user WITH the new ID from the DB
        .single();

        if (error) throw error;

        if (data) {
          // Update our Global Brain with the real DB entry
          addUser(data); // This sends the object with the real DB id to your Context
          toast.success(`${data.name} joined the team!`, { id: loadingToast });
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
      
    } catch (err: any) {
      
      console.error("Add Error:", err);
      toast.error(err.message || "Failed to add user", { id: loadingToast });
      
      // const e = err as { code?: string; message?: string };
      // if (e.code === '42501') {
      //   toast.error("Permission denied. Are you logged in?", { id: loadingToast });
      // } else if (e.message) {
      //   toast.error(`Error: ${e.message}`, { id: loadingToast });
      // } else {
      //   toast.error('An unexpected error occurred', { id: loadingToast });
      // }
    }
  }

  // const fetchUsersData = users.filter((user: UserProps) => 
  //   user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  // )

  const fetchUsersData = users.filter((u) => {
    const matchesSearch = `${u.name} ${u.lastname}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeStatuses.includes(u.status);
    
    return matchesSearch && matchesStatus;
  });

  const toggleSelectUser = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // A helper to clear selection after an action
  const clearSelection = () => setSelectedIds([]);


  const handleBulkDelete = async () => {
  if (selectedIds.length === 0) return;
  
  const loadingToast = toast.loading(`Deleting ${selectedIds.length} members...`);

  try {
    const { error } = await supabase
      .from('Users')
      .delete()
      .in('id', selectedIds); // 👈 This is the magic "Bulk" line

    if (error) throw error;

    // Update Global Context (you'll need to add a bulk delete function to your context or call delete multiple times)
    // For now, we can just refresh or filter them out locally:
    selectedIds.forEach(id => deleteUser(id)); 
    
    toast.success("Batch delete successful!", { id: loadingToast });
    clearSelection();
  } catch (err: any) {
    toast.error("Bulk delete failed", { id: loadingToast });
  }
};

   if(isLoading) {
    return (
    <div className="bg-white dark:bg-slate-900 min-h-screen p-10">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
       {[1, 2, 3, 4, 5].map(n => <UserSkeleton key={n} />)}
      </div>
    </div>
    )
  }

  // Helper logic to check state
const isAllSelected = activeStatuses.length === 2; // online + offline

  const toggleStatusFilter = (status: string) => {
    setActiveStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) // Remove if checked
        : [...prev, status]             // Add if unchecked
    );
  };

  const toggleAll = () => {
  if (isAllSelected) {
    setActiveStatuses([]); // Clear filters
  } else {
    setActiveStatuses(['online', 'offline']); // Select everything
  }
};

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="max-w-xl mx-auto">
      {user && (
        <MaterialButton label="Logout" variant="contained" color="primary" onClick={signOut} />
      )}

      {/* <ThemeToggle/> Add the button here! */}

       
      
      <AddUserForm onAdd={AddUser} disabled={!user}/>

      {!user && (
        <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded mt-2">
          Please <Link to="/authpage" className="underline">log in</Link> to add new members.
        </p>
      )}
      
      <Button 
        label="Hello" 
        variant="primary"
        icon={MdOutlineFilterAlt} 
        iconPosition="right" 
        />

      <StatBar total={TotalUser} online={OnlineUsers} offline={OffileUsers} />
      
      {/* Status Filters & Bulk Delete Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 mb-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Filter:</span>
          {/* The "All" Master Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleAll}
              className="w-4 h-4 accent-purple-600 rounded"
            />
            <span className={`text-sm font-medium ${isAllSelected ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
              All
            </span>
          </label>
          {['online', 'offline'].map(status => (
            <label key={status} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox"
                checked={activeStatuses.includes(status)}
                onChange={() => toggleStatusFilter(status)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <span className={`text-sm font-medium capitalize group-hover:text-blue-500 transition-colors ${activeStatuses.includes(status) ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                {status}
              </span>
            </label>
          ))}
        </div>
          
        {/* Bulk Delete Button - Only shows when items are selected */}
        {selectedIds.length > 0 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBulkDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2"
          >
            🗑️ Delete Selected ({selectedIds.length})
          </motion.button>
        )}
      </div>
      <SearchBar value={searchTerm} onSearch={setSearchTerm}/>
      
      {searchTerm && fetchUsersData.length === 0 ? (
        <div className={listStyles.emptyContainer}>
        <span className="text-4xl text-gray-300">🔍</span>
        <p className={listStyles.emptyText}>No matches found for "{searchTerm}"</p>
        <p className={listStyles.emptySubtext}>Try checking your spelling or using a different name.</p>
        <MaterialButton label="Clear Search" variant="outlined" color="primary" onClick={() => setSearchTerm("")} />
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
          selectedIds={selectedIds}          // Add this
          toggleSelectUser={toggleSelectUser} // Add this
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