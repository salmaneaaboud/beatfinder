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

  const API_KEY = import.meta.env.VITE_API_KEY;

    const login = async (email, password) => {
        try {
            const response = await api.post("/login", { email, password });
            const data = response.data; 
    
            if (data.user.status === 'inactive') {
                toast.error("Su cuenta está deshabilitada");
                return;
            }
    
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); 
            setUser(data.user);
            api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    
            const geoResponse = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`);
            const geoData = await geoResponse.json();
    
            const userAgentResponse = await fetch(`https://api.ipgeolocation.io/user-agent?apiKey=${API_KEY}`);
            const userAgentData = await userAgentResponse.json();
    
            await api.post("http://10.14.4.163:8000/api/storeip", {
                country: geoData.country_name,
                city: geoData.city,
                user_id: data.user.id,
                ip: geoData.ip,
                userAgent: userAgentData.name,
                device: userAgentData.device.name,
                operatingSystem: userAgentData.operatingSystem.name,
            });
    
            return { user: data.user, token: data.token };
    
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
