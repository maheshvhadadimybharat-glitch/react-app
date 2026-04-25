// src/app/store/auth.store.ts

import { create } from "zustand";

type User = {
  name: String,
  role: "admin" | "user"
}

type AuthState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  //setUser: (user: any) => void;
};



export const userAuthStore = create<AuthState>((set) => ({
  user: {name: "Mahesh", role: "admin"},
  login: (user) => set({user}),
  logout: ()=> set({user: null}),
  //setUser: (user) => set({ user }),
}))

