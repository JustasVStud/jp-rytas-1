import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoutes = () => {
    const user = useContext(AuthContext);
    const isLoggedIn = !!user;
    
    if(!isLoggedIn) {
      return <Navigate to={"/login"} replace/>
    }
  
    return <Outlet/>;
  };
export default ProtectedRoutes;
