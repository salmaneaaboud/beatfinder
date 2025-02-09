import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProducerDetailsQuery } from "/src/redux/services/shazamCore";
import api from "/src/services/api";
import Loader from "/src/components/Loader/Loader";
import Error from "/src/components/Error/Error";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from "../../../contexts/AuthContext";
import ProducerSidebar from "../../../components/ProducerSidebar/ProducerSidebar";
import { toast } from "sonner"; 

const ProducerProfileForm = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const producerId = user?.id || id;

    const { data: producerData, isFetching, error } = useGetProducerDetailsQuery(producerId);

    const [formData, setFormData] = useState({
        name: "",
        biografia: "",
        avatar: "",
        banner: "",
    });

    const [preview, setPreview] = useState({
        avatar: "/default-avatar.png",
        banner: "/default-banner.jpg",
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (producerData) {
            setFormData({
                name: producerData.user?.name || "",
                biografia: producerData.biografia || "",
                avatar: producerData.user?.avatar || "",
                banner: producerData.banner || "",
            });

            setPreview({
                avatar: producerData.user?.avatar || "/default-avatar.png",
                banner: producerData.banner || "/default-banner.jpg",
            });
        }
    }, [producerData]);

    if (isFetching) return <Loader title="Cargando perfil del productor..." />;
    if (error) return <Error />;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            const imageUrl = URL.createObjectURL(files[0]);
            setPreview({ ...preview, [name]: imageUrl });
            setFormData({ ...formData, [name]: files[0] });
        }
    };

    const handleRemoveImage = (type) => {
        setPreview({ ...preview, [type]: type === "avatar" ? "/default-avatar.png" : "/default-banner.jpg" });
        setFormData({ ...formData, [type]: "" });
    };

    const uploadImageToCloudinary = async (file) => {
        if (!file || !(file instanceof File)) return file;

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
            return result.secure_url;
        } catch (error) {
            toast.error('Error al subir la imagen');
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");

        try {
            const avatarUrl = formData.avatar ? await uploadImageToCloudinary(formData.avatar) : "";
            const bannerUrl = formData.banner ? await uploadImageToCloudinary(formData.banner) : "";

            const updatedData = {
                name: formData.name,
                biografia: formData.biografia,
                avatar: avatarUrl || formData.avatar, 
                banner: bannerUrl || formData.banner,
            };

            await api.put(`/producer/${producerId}/edit`, updatedData);

            setSuccessMessage("Perfil actualizado con éxito.");
            toast.success("Perfil actualizado correctamente.");
        } catch (error) {
            console.error("Error actualizando el perfil:", error);
            toast.error("Error al actualizar el perfil.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex">
            <ProducerSidebar />
            <div className="flex-grow-1">
                <LoggedHeader />
                <div className="container mt-4">
                    <div className="position-relative text-center">
                        {/* Banner */}
                        <div className="position-relative w-100" style={{ height: "300px", backgroundImage: `url(${preview.banner})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "10px" }}>
                            <input type="file" name="banner" accept="image/*" onChange={handleImageChange} className="d-none" id="banner-upload" />
                            <label htmlFor="banner-upload" className="btn btn-light position-absolute bottom-0 end-0 m-3">
                                Cambiar Banner
                            </label>
                            {formData.banner && (
                                <i className="bi bi-x-circle-fill text-white position-absolute top-0 end-0 m-3" style={{ fontSize: "1.5rem", cursor: "pointer" }} onClick={() => handleRemoveImage("banner")}></i>
                            )}
                        </div>

                        {/* Avatar */}
                        <div className="position-absolute start-50 translate-middle" style={{ top: "250px" }}>
                            <div className="position-relative">
                                <img src={preview.avatar} alt="Avatar" className="rounded-circle border border-light shadow" width="150" height="150" />
                                {formData.avatar && (
                                    <i className="bi bi-x-circle-fill text-white position-absolute top-0 end-0" style={{ fontSize: "1.3rem", cursor: "pointer", background: "rgba(0,0,0,0.5)", borderRadius: "50%" }} onClick={() => handleRemoveImage("avatar")}></i>
                                )}
                            </div>
                            <input type="file" name="avatar" accept="image/*" onChange={handleImageChange} className="d-none" id="avatar-upload" />
                            <label htmlFor="avatar-upload" className="btn btn-light d-block mt-2">Cambiar Avatar</label>
                        </div>
                    </div>

                    <div className="mt-5 pt-5 text-center">
                        <h2 className="text-white">{formData.name}</h2>
                        <p className="text-white">{formData.biografia}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-dark p-4 rounded mt-4">
                        <h4 className="text-white mb-3">Editar Perfil</h4>
                        <div className="mb-3">
                            <label className="form-label text-white">Nombre</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-white">Biografía</label>
                            <textarea name="biografia" value={formData.biografia} onChange={handleChange} className="form-control" rows="3"></textarea>
                        </div>

                        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar Cambios"}
                        </button>

                        {successMessage && <p className="text-success mt-3">{successMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProducerProfileForm;
