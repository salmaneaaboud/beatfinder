import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useContext } from 'react';
import AuthContext from '/src/contexts/AuthContext';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { resetPlayer } from '../redux/features/playerSlice';

export const useAuth = () => {
    const { setUser } = useContext(AuthContext); 
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await api.post("/login", { email, password });
            const data = response.data; 
            if (data.user.status == 'inactive') {
                toast.error("Su cuenta está deshabilitada");
            } else {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user)); 
                setUser(data.user);
                api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                return { user: data.user, token: data.token };
            }
        } catch (error) {
            console.error("Error de login:", error);
            toast.error(error.response?.data?.message || "Error de inicio de sesión");
        }
    };

    const logout = async () => {
        try {
            dispatch(resetPlayer());
            await api.post('/logout');
            toast.success("Sesión cerrada exitosamente");
        } catch (error) {
            console.error('Error en logout:', error);
            toast.error("Error al cerrar sesión");
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
