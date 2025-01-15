import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useContext } from 'react';
import AuthContext from '/src/contexts/AuthContext';

export const useAuth = () => {
    const { setUser } = useContext(AuthContext); 

    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await api.post("/login", { email, password });
            const data = response.data; 

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); 

            setUser(data.user);
            api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            
            return { user: data.user, token: data.token };
        } catch (error) {
            console.error("Error de login:", error);
            alert(error.response?.data?.message || "Error de inicio de sesión");
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Error en logout:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete api.defaults.headers.common["Authorization"];
            setUser(null);
            navigate('/login');
        }
    };

    return {
        login,
        logout
    };
}; 