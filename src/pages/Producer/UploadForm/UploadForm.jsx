import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import { FaCamera } from 'react-icons/fa';  // Icono de la cámara
import { initializeEssentia, processAudioFile } from './audioAnalysis';

const UploadForm = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [coverArt, setCoverArt] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        bpm: '',
        key: '',
        mood: [],
        genre: 'Hip-Hop',
        tags: [],
        pricing: {
            basic: '',
            premium: '',
            exclusive: '',
        },
    });

    const [currentTag, setCurrentTag] = useState('');

    useEffect(() => {
        initializeEssentia();
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setAudioFile(file);

        if (file) {
            try {
                const { bpm, keyData } = await processAudioFile(file);
                setFormData((prevData) => ({
                    ...prevData,
                    bpm,  
                    key: keyData.key,  
                }));
            } catch (error) {
                console.error("Error procesando el archivo de audio:", error);
            }
        }
    };

    const handleCoverArtChange = (e) => {
        setCoverArt(e.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddTag = (e) => {
        e.preventDefault();
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData((prevData) => ({
                ...prevData,
                tags: [...prevData.tags, currentTag.trim()],
            }));
        }
        setCurrentTag('');
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData((prevData) => ({
            ...prevData,
            tags: prevData.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handlePricingChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            pricing: {
                ...prevData.pricing,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form data:', { audioFile, coverArt, ...formData });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTag(e);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Subir Beat</h2>
            <form onSubmit={handleSubmit} className="bg-dark text-white p-4 rounded">
                <div className="row mb-4">
                    <div className="col-lg-4 d-flex justify-content-center align-items-center">
                        <label htmlFor="coverArt" className="d-block w-100">
                            <div
                                className="border border-light rounded-3 p-3 d-flex justify-content-center align-items-center"
                                style={{
                                    height: '300px',
                                    width: '300px',
                                    cursor: 'pointer',
                                    backgroundColor: '#f8f9fa',
                                    position: 'relative',
                                    margin: '0 auto',
                                }}
                            >
                                {coverArt ? (
                                    <img
                                        src={URL.createObjectURL(coverArt)}
                                        alt="Cover Art"
                                        className="img-fluid rounded-3"
                                        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                    />
                                ) : (
                                    <FaCamera size={50} color="#f0ad4e" />
                                )}
                            </div>
                            <input
                                type="file"
                                id="coverArt"
                                accept=".jpg,.jpeg,.png"
                                className="d-none"
                                onChange={handleCoverArtChange}
                            />
                            <span className="d-block text-center mt-2 text-light">Sube la carátula</span>
                        </label>
                    </div>

                    <div className="col-lg-8">
                        <div className="mb-4">
                            <label htmlFor="audioFile" className="form-label">Sube tu archivo de audio:</label>
                            <input
                                type="file"
                                id="audioFile"
                                accept=".mp3,.wav,.ogg"
                                className="form-control"
                                onChange={handleFileChange}
                                required
                            />
                            {audioFile && (
                                <div className="mt-2 text-light">
                                    <strong>Archivo seleccionado: </strong>{audioFile.name}
                                </div>
                            )}
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label">Nombre del Beat:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Tempo (BPM):</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="bpm"
                                    value={formData.bpm}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <label className="form-label">Clave:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="key"
                                    value={formData.key}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Género:</label>
                                <select className="form-select" name="genre" value={formData.genre} onChange={handleInputChange}>
                                    {['Hip-Hop', 'Pop', 'Trap', 'Electronic'].map((genre) => (
                                        <option key={genre} value={genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mb-4 mt-4">
                            <label className="form-label">Tags:</label>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Escribe un tag y presiona Enter"
                                />
                                <CustomButton type="btn-warning" value="Añadir" onClick={handleAddTag} />
                            </div>
                            <div className="mt-2">
                            <div className="d-flex flex-wrap" style={{ minHeight: '40px' }}>
                                    {formData.tags.map((tag, index) => (
                                        <span key={index} className="badge bg-secondary me-2">
                                            {tag}
                                            <button
                                                type="button"
                                                className="btn-close btn-close-white ms-1"
                                                aria-label="Close"
                                                onClick={() => handleRemoveTag(tag)}
                                            ></button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <h3>Licensing</h3>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Básica:</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                name="basic"
                                value={formData.pricing.basic}
                                onChange={handlePricingChange}
                            />
                        </div>

                        <div className="col-md-3 mb-3">
                            <label className="form-label">Premium:</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                name="premium"
                                value={formData.pricing.premium}
                                onChange={handlePricingChange}
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Exclusiva:</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                name="exclusive"
                                value={formData.pricing.exclusive}
                                onChange={handlePricingChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between">
                    <CustomButton type="btn-warning" value="Publicar" onClick={handleSubmit} />
                    <CustomButton type="btn-danger" value="Cancelar" />
                </div>
            </form>
        </div>
    );
};

export default UploadForm;
