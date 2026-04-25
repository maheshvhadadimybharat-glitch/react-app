// src/app/router/AppRouter.tsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserPage from "../../pages/sample/UserPage";
import AuthPage from "../../pages/auth/AuthPage";
import UserDetails from "../../pages/sample/UserDetails";
import { UserProvider } from "../../compenents/GlobalContext/UserContext";
import { ThemeProvider } from "../../compenents/GlobalContext/ThemeContext";
import AppProvider from "../providers/AppProvider";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../../compenents/GlobalContext/AuthContext"; // Import your hook
import { Toaster } from "react-hot-toast";

const AppRouter = () => {

  // 3. You must call the hook inside the component to get the 'user'
  const { user, loading } = useAuth();

if (loading) {
  return <div className="h-screen flex items-center justify-center font-bold">Checking session...</div>;
}

  return (
  <ThemeProvider>
      <Toaster position="top-right" />
      <AppProvider> 
        <UserProvider>
          <BrowserRouter>
            <Routes>
              {/* 1. The Gate: If logged in, "/" goes to UserPage. If not, goes to AuthPage */}
              {/* <Route path="/" element={
                user ? <Navigate to="/userpage" replace /> : <Navigate to="/authpage" replace />
              } /> */}

              <Route path="/" element={<UserPage />} />

              <Route path="/authpage" element={<AuthPage/>}/>
              <Route path="/userpage" element={<UserPage />} />  

              {/* 2. Public Route */}
              <Route path="/authpage" element={<AuthPage/>}/>

              {/* 3. Protected Routes: Wrapped in our Bouncer */}
              {/* <Route path="/userpage" element={
                <ProtectedRoute>
                  <UserPage/>
                </ProtectedRoute>
              }/> */}

              <Route path="/user/:id" element={
                <ProtectedRoute>
                  <UserDetails />
                </ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </AppProvider>

    </ThemeProvider>
    )
};

  // <Route path="/" element={<DashboardPage/>}/>
  // <Route path="/login" element={<LoginPage/>}/>
  // <Route path="/samplepage" element={<SamplePage/>}/>
  // <Route path="/parentpage" element={<ParentPage/>}/>
  // <Route path="/practicepage" element={<Practice/>}/>

export default AppRouter;