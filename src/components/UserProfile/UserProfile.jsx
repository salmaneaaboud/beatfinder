import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'sonner';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: ''
    });
    const [file, setFile] = useState(null);
    const [uploadedImageURL, setUploadedImageURL] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://10.14.4.163:8080/api/user/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener el usuario');
                }
                const data = await response.json();
                setUser(data);
                setFormData({ name: data.name, email: data.email, avatar: data.avatar });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

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

                if (!res.ok) {
                    throw new Error('Error al subir la imagen');
                }

                const result = await res.json();
                setUploadedImageURL(result.secure_url); 
            } catch (error) {
                toast.error('Error al subir la imagen');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            name: formData.name,
            email: formData.email,
            avatar: uploadedImageURL || null,
        };
        try {
            const response = await fetch(`http://10.14.4.163:8080/api/update-user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el perfil');
            }
            toast.success('Perfil actualizado correctamente');
        } catch (error) {
            toast.error('Error al actualizar el perfil');
        }
    };

    if (loading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="text-danger">Error: {error}</div>;

    return (
        <div className="container mt-4" style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '25px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' }}>
            <h4>Editar Perfil de Usuario</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ padding: '12px', verticalAlign: 'middle' }}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ padding: '12px', verticalAlign: 'middle' }}
                    />
                </Form.Group>
                <Form.Group controlId="formAvatar">
                    <Form.Label>Avatar</Form.Label>
                    <div>
                        {formData.avatar && <img src={formData.avatar} alt="Avatar" className="img-thumbnail" style={{ width: '100px', height: '100px', objectFit: 'cover', border: '3px solid #5a6268' }} />}
                    </div>
                    <Form.Control
                        type="file"
                        name="avatar"
                        onChange={handleFileChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ transition: 'background-color 0.4s ease, color 0.4s ease' }}>
                    Guardar Cambios
                </Button>
            </Form>
        </div>
    );
};

export default UserProfile;
