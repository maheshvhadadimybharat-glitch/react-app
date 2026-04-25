// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import AppProvider from "./app/providers/AppProvider";
import AppRouter from "./app/router/AppRouter";
import { AuthProvider } from "./compenents/GlobalContext/AuthContext";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </AppProvider>
);