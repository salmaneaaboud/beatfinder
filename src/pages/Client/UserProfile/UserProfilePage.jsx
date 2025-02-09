import React, { useState, useEffect, useContext } from 'react';
import { LoggedHeader } from '/src/components/LoggedHeader/LoggedHeader';
import clientAvatar from "/src/assets/avatar_temp.png";
import { useParams } from 'react-router-dom';
import './UserProfilePage.css';
import AuthContext from '/src/contexts/AuthContext';
import { toast } from 'sonner';
import { BASE_URL } from "./../../../config";
import BackButton from "/src/components/BackButton/BackButton";

const UserProfilePage = () => {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: user ? user.name : '',
        email: user ? user.email : '',
        avatar: user ? user.avatar : '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [file, setFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [selectedTab, setSelectedTab] = useState('info');

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, email: user.email, avatar: user.avatar });
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setAvatarPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedTab === 'credentials') {
            if (formData.newPassword !== formData.confirmNewPassword) {
                toast.error('Las contraseñas nuevas no coinciden');
                return;
            }
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(BASE_URL + '/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        current_password: formData.currentPassword,
                        new_password: formData.newPassword,
                        new_password_confirmation: formData.confirmNewPassword
                    })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Error al actualizar la contraseña');
                }

                toast.success('Contraseña actualizada correctamente');
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                }));
            } catch (error) {
                toast.error(error.message);
            }
            return;
        }

        let avatarURL = formData.avatar;

        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "avatars");
            data.append("cloud_name", "dayc24gzd");

            try {
                const res = await fetch("https://api.cloudinary.com/v1_1/dayc24gzd/image/upload", {
                    method: "POST",
                    body: data
                });

                if (!res.ok) throw new Error('Error al subir la imagen');
                const result = await res.json();
                avatarURL = result.secure_url;
                setUser({ ...user, avatar: avatarURL });
                localStorage.setItem('user', JSON.stringify({ ...user, avatar: avatarURL }));
                setFormData(prev => ({ ...prev, avatar: avatarURL }));
            } catch (error) {
                toast.error(error.message);
                return;
            }
        }

        const dataToSend = {
            name: formData.name,
            avatar: avatarURL
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/update-profile/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error al actualizar los datos');
            }

            toast.success('Datos actualizados correctamente');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <LoggedHeader />
            <div className="backbutton">
            <BackButton  />
            </div>
            <div className="user-profile-container">
                <aside className="user-profile-sidebar">
                    <ul>
                        <li className={selectedTab === 'info' ? 'active' : ''} onClick={() => setSelectedTab('info')}>Información personal</li>
                        <li className={selectedTab === 'credentials' ? 'active' : ''} onClick={() => setSelectedTab('credentials')}>Credenciales</li>
                    </ul>
                </aside>
                <main className="user-profile-main">
                    {loading && <div className="loading">Cargando...</div>}
                    {!loading && error && <div className="error">Error: {error}</div>}
                    {!loading && !error && (
                        <>
                            {selectedTab === 'info' && (
                                <div>
                                    <div className="user-profile-header">
                                        <div className="avatar-container">
                                            {avatarPreview ? (
                                                <img src={avatarPreview} alt="Avatar" className="profile-avatar" />
                                            ) : (
                                                <img src={formData?.avatar || clientAvatar} alt="Avatar" className="profile-avatar" />
                                            )}
                                        </div>
                                        <label htmlFor="upload-avatar" className="user-profile-btn-upload">Subir Foto</label>
                                        <input id="upload-avatar" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                                    </div>
                                    <form onSubmit={handleSubmit} className="user-profile-form">
                                        <div className="form-group">
                                            <label>Nombre:</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </div>
                                        <button type="submit" className="user-profile-btn-save">Guardar cambios</button>
                                    </form>
                                </div>
                            )}
                            {selectedTab === 'credentials' && (
                                <form onSubmit={handleSubmit} className="user-profile-form">
                                    <div className="form-group">
                                        <label>Contraseña actual:</label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Nueva contraseña:</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Repetir nueva contraseña:</label>
                                        <input
                                            type="password"
                                            name="confirmNewPassword"
                                            value={formData.confirmNewPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="user-profile-btn-save">Actualizar credenciales</button>
                                </form>
                            )}
                        </>
                    )}
                </main>
            </div>
        </>
    );
};

export default UserProfilePage;
