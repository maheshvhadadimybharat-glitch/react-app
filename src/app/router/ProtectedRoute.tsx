import { Navigate } from 'react-router-dom';
import { useAuth } from '../../compenents/GlobalContext/AuthContext'; // Path to your AuthContext

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Prevent flash of login screen

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/authpage" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;