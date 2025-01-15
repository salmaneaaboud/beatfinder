import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '/src/contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
