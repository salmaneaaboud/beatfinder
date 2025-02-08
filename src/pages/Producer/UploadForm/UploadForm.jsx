import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import { FaCamera } from "react-icons/fa"; 
import { initializeEssentia, processAudioFile } from "./audioAnalysis";
import ProducerSidebar from "/src/components/ProducerSidebar/ProducerSidebar";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import api from "/src/services/api";
import { toast } from "sonner"; // Importa sonner

const UploadForm = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [coverArt, setCoverArt] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    cover: "",
    bpm: "",
    key: "",
    mood: [],
    genre: "Hip-Hop",
    tags: [],
    pricing: [
      {
        name: "Basic",
        price: 0,
      },
      {
        name: "Premium",
        price: 0,
      },
    ],
  });

  const [currentTag, setCurrentTag] = useState("");

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
        toast.error("Error al procesar el archivo de audio"); // Muestra un error con sonner
      }
    }
  };

  const handleCoverArtChange = (e) => {
    const file = e.target.files[0];
    setCoverArt(file);
    setFormData((prevData) => ({
      ...prevData,
      cover: file,
    }));
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
    setCurrentTag("");
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
        [name]: parseInt(value, 10),
      },
    }));
  };

  const handleAudioUpload = async () => {
    if (audioFile) {
      const data = new FormData();
      data.append("file", audioFile);
      data.append("upload_preset", "avatars");
      data.append("cloud_name", "dayc24gzd");
      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dayc24gzd/video/upload",
          {
            method: "POST",
            body: data,
          }
        );

        if (!res.ok) {
          throw new Error("Error al subir el archivo de audio");
        }

        const result = await res.json();
        console.log(
          "Archivo de audio subido correctamente:",
          result.secure_url
        );
        return result.secure_url;
      } catch (error) {
        console.error("Error al subir el archivo de audio:", error);
        toast.error("Error al subir el archivo de audio"); // Muestra el error
      }
    }
  };

  const handleCoverUpload = async () => {
    if (coverArt) {
      const data = new FormData();
      data.append("file", coverArt);
      data.append("upload_preset", "avatars");
      data.append("cloud_name", "dayc24gzd");
      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dayc24gzd/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        if (!res.ok) {
          throw new Error("Error al subir la carátula");
        }

        const result = await res.json();
        console.log("Carátula subida correctamente:", result.secure_url);
        return result.secure_url;
      } catch (error) {
        console.error("Error al subir la carátula:", error);
        toast.error("Error al subir la carátula"); // Muestra el error
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const audioURL = await handleAudioUpload();
    const coverURL = await handleCoverUpload();
  
    if (!formData.title || !formData.bpm || !audioURL || !coverURL) {
      toast.error("Faltan campos por rellenar"); // Muestra un error si falta algún campo
      return;
    }

    const beatData = {
      title: formData.title,
      cover: coverURL,
      genre: formData.genre,
      bpm: formData.bpm,
      key: formData.key,
      mp3_file: audioURL,
      wav_file: audioURL,
      tags: formData.tags, 
      licenses: [
        { license_id: 1, price: formData.pricing.basic },
        { license_id: 2, price: formData.pricing.premium },
      ],
    };

    try {
      console.log("Datos del beat enviados a la API:", beatData);
      const response = await api.post("/beat-upload", beatData);
      console.log("Datos del beat subidos correctamente:", response.data);
      toast.success("Beat subido correctamente"); 
      window.location.href = "/producer";
    } catch (error) {
      console.error("Error al subir los datos del beat:", error);
      toast.error("Error al subir los datos del beat");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTag(e);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <ProducerSidebar />
      <div style={{ flex: 1 }}>
        <LoggedHeader />
        <h2 className="text-center mb-4">Subir Beat</h2>


        <form onSubmit={handleSubmit} className=" text-white p-4 rounded">
          <div className="row mb-4">
            <div className="col-lg-4 d-flex justify-content-center align-items-center">
              <label htmlFor="coverArt" className="d-block w-100">
                <div
                  className="border border-light rounded-3 p-3 d-flex justify-content-center align-items-center"
                  style={{
                    height: "300px",
                    width: "300px",
                    cursor: "pointer",
                    backgroundColor: "#f8f9fa",
                    position: "relative",
                    margin: "0 auto",
                  }}
                >
                  {coverArt ? (
                    <img
                      src={URL.createObjectURL(coverArt)}
                      alt="Cover Art"
                      className="img-fluid rounded-3"
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
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
                <span className="d-block text-center mt-2 text-light">
                  Sube la carátula
                </span>
              </label>
            </div>

            <div className="col-lg-8">
              <div className="mb-4">
                <label htmlFor="audioFile" className="form-label">
                  Sube tu archivo de audio:
                </label>
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
                    <strong>Archivo seleccionado: </strong>
                    {audioFile.name}
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">Nombre del Beat:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
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
                  <label className="form-label">Tonalidad:</label>
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
                  <select
                    className="form-select"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                  >
                    {["Hip-Hop", "Pop", "Trap", "Electronic"].map((genre) => (
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
                  <CustomButton
                    type="btn-warning"
                    value="Añadir"
                    onClick={handleAddTag}
                  />
                </div>
                <div className="mt-2">
                  <div
                    className="d-flex flex-wrap"
                    style={{ minHeight: "40px" }}
                  >
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
            </div>
          </div>


          <div className="d-flex justify-content-end gap-3">
            <CustomButton
              type="btn-outline-light"
              value="Cancelar"
              onClick={() => (window.location.href = "/producer-dashboard")}
            />
            <CustomButton
              type="btn-primary"
              value="Publicar"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;




