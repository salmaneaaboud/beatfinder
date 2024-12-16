import { Navigate } from 'react-router-dom';
import { useAuth } from '/src/hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  
  const token = localStorage.getItem('token');
  
  if (!auth.user && !token) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;