import { createContext, useContext } from "react";
import type { UserProps } from "../../types/UserType/UserType";

export interface UserContextType {
  users: UserProps[];
  isLoading: boolean;
  addUser: (user: UserProps) => void;
  deleteUser: (id: number) => void;
  toggleStatus: (id: number) => void;
  toggleSort: () => void;
  sortOrder: string;
  updateUser: (id: number, data: { name: string; lastname: string }) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used within a UserProvider");
  return context;
};
