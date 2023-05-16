import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const AdminRoutes = () => {
    const {user, loading} = useContext(AuthContext);
    if (loading) {
        // Still loading user data
        return null; // or any loading indicator or message you prefer
      }
    
      if (!user || !user.authorities || !user.authorities.includes('ADMIN')) {
        return <Navigate to="/profile" replace />;
      }
    
      return <Outlet />;
  };
export default AdminRoutes;
