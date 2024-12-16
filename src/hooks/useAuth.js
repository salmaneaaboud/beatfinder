import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const useAuth = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post("/login", { email, password });
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            
            setUser(response.data.user);
            navigate("/dashboard");
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
        user,
        login,
        logout,
        isAuthenticated: !!user
    };
}; 