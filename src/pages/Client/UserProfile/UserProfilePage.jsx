import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfilePage.css';
import AuthContext from '/src/contexts/AuthContext';

const UserProfilePage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
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
    const [uploadedImageURL, setUploadedImageURL] = useState('');
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

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const data = new FormData();
            data.append("file", selectedFile);
            data.append("upload_preset", "avatars");
            data.append("cloud_name", "dayc24gzd");
            try {
                const res = await fetch("https://api.cloudinary.com/v1_1/dayc24gzd/image/upload", {
                    method: "POST",
                    body: data
                });
                if (!res.ok) throw new Error('Error al subir la imagen');
                const result = await res.json();
                setUploadedImageURL(result.secure_url);
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            name: formData.name,
            email: formData.email,
            avatar: uploadedImageURL || formData.avatar
        };
        if (selectedTab === 'credentials') {
            if (formData.newPassword !== formData.confirmNewPassword) {
                alert('Las contraseñas nuevas no coinciden');
                return;
            }
            dataToSend.currentPassword = formData.currentPassword;
            dataToSend.newPassword = formData.newPassword;
        }
        try {
            const response = await fetch(`http://10.14.4.163:8000/api/update-user/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
            if (!response.ok) throw new Error('Error al actualizar los datos');
            alert('Datos actualizados correctamente');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="user-profile-container">
            <aside className="user-profile-sidebar">
                <ul>
                    <li className={selectedTab === 'info' ? 'active' : ''} onClick={() => setSelectedTab('info')}>Información personal</li>
                    <li className={selectedTab === 'credentials' ? 'active' : ''} onClick={() => setSelectedTab('credentials')}>Credenciales</li>
                    <li>Métodos de pago</li>
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
                                        {formData.avatar && <img src={formData.avatar} alt="Avatar" className="profile-avatar" />}
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
    );
};

export default UserProfilePage;
