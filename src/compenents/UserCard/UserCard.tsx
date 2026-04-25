import { useState } from "react";
import { useUsers } from "../GlobalContext/UserContext";
import type { UserProps, DeleteHandler, ToggleStatusHandler } from "../../types/UserType/UserType";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useAuth } from "../GlobalContext/AuthContext";
import { Lock } from 'lucide-react'; // Or any icon library you use

// 1. Define your "Design System" as variables
const styles = {
  cardRow: "flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b last:border-0",
  avatar: "h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold",
  statusBadge: (status: string) => `text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
    status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
  }`,
  statusBtn: (status: string) => `text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full transition-all cursor-pointer hover:opacity-80 ${
    status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
  }`,
  deleteBtn: "text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors text-sm font-medium"
};
interface UserCardProps {
  user: UserProps;
  onRemove: DeleteHandler;
  onToggle: ToggleStatusHandler;
}

const Usercard = ({ user, onRemove, onToggle }: UserCardProps) => {

  const { updateUser } = useUsers(); // Grab the new function
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: user.name, lastname: user.lastname });
  
  const { user: authUser } = useAuth(); // Get the authenticated user

  const handleSave = async () => {
    await updateUser(user.id, editData);
    setIsEditing(false);
  }

  return (
  <li 
    className={styles.cardRow}
    key={user.id}>
    <div className="flex items-center space-x-4">
      <div className={styles.avatar}>
        {user.name[0]}{user.lastname[0]}
      </div>
      {isEditing ? (
        <div> 
          <input 
            className="border p-1 rounded bg-white dark:bg-slate-700 text-sm"
            type="text" 
            value={editData.name}
            onChange={(e) => setEditData({...editData, name: e.target.value})}
            />
          <input 
            type="text" 
            className="border p-1 rounded bg-white dark:bg-slate-700 text-sm"
            value={editData.lastname}
            onChange={(e) => setEditData({...editData, lastname: e.target.value})}
            />
        </div>
      ): (
        <div className="flex gap-2 items-center">
          <p className="font-medium text-gray-900">
            <Link 
              to={`/user/${user.id}`} 
              className="hover:underline font-bold text-lg">
            {user.name} {user.lastname}
            </Link>
          </p>
          <button
            onClick={() => onToggle(user.id)}
            className={styles.statusBtn(user.status)}
          >

          </button>
          <span className={styles.statusBadge(user.status)}>
            {user.status}
          </span>
        </div>
      )}
    </div>
    {/* <div className="flex gap-2 items-center">
      <p className="font-medium text-gray-900">
        <Link 
          to={`/user/${user.id}`} 
          className="hover:underline font-bold text-lg">
        {user.name} {user.lastname}
        </Link>
      </p>
      <button
        onClick={() => onToggle(user.id)}
        className={styles.statusBtn(user.status)}
      >

      </button>
      <span className={styles.statusBadge(user.status)}>
        {user.status}
      </span>
    </div> */}


    <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="text-green-600 text-sm font-bold">Save</button>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 text-sm">Cancel</button>
          </>
        ) : (
          <>
          {/* 2. ONLY show Edit/Delete if authUser exists (someone is logged in) */}
          {authUser ? (
            <>
            <button 
              onClick={() => setIsEditing(true)} 
              className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
            >
              ✏️
            </button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemove(user)}
              className="p-2 text-red-500 bg-red-50 rounded-full"
            >
              🗑️
            </motion.button>
            </>
            ) : (
              /* 3. Show a lock icon for anonymous users */
          <div className="p-2 text-slate-300" title="Login to edit">
            <Lock size={16} />
          </div>
          )}
          </>
        )}
      </div>

  </li>
  )
} 

export default Usercard;