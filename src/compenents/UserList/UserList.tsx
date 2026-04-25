import type { UserProps, DeleteHandler, ToggleStatusHandler } from "../../types/UserType/UserType";
import Usercard from "../UserCard/UserCard";
import { motion, AnimatePresence } from "framer-motion";


// Fixed the type definition here to include onDelete
interface UserListProps {
  items: UserProps[];
  onDelete: DeleteHandler;
  onToggleStatus: ToggleStatusHandler; // Add this
}

const listStyles = {
  wrapper: "divide-y divide-gray-100",
  empty: "p-10 text-center text-gray-500 italic bg-gray-50"
};

const UserList = ({ items, onDelete, onToggleStatus }: UserListProps) => {

  if (items.length === 0) {
    return <div className={listStyles.empty}>No team members. Please add Members</div>;
  }

  return (
  <div className="space-y-4">
    <AnimatePresence>
  <ul className={listStyles.wrapper}>
    {items.map((user)=>(
      <motion.div
          key={user.id} // Important: Framer uses the ID to know which item is moving
          initial={{ opacity: 0, x: -20 }} // Slide in from the left
          animate={{ opacity: 1, x: 0 }}   // Fade in to center
          exit={{ opacity: 0, x: 20, scale: 0.9 }} // Slide out to the right and shrink
          layout // This is the "Magic" prop that makes other items slide smoothly
          transition={{ duration: 0.3 }}
        >
      <Usercard 
        user={user}
        onRemove={onDelete} // This stays the same
        onToggle={onToggleStatus} // Pass it down
        />
        </motion.div>
    ))}
  </ul>
  </AnimatePresence>
  </div>
  )
}

export default UserList;