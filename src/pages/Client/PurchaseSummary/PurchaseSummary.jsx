import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "/src/services/api";
import { LoggedHeader } from "../../../components/LoggedHeader/LoggedHeader";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap
import "./PurchaseSummary.css";

const PurchaseSummary = () => {
  const { orderId } = useParams();
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchasedBeats();
  }, []);

  const fetchPurchasedBeats = async () => {
    try {
      const response = await api.get(`/purchases/${orderId}`);
      setBeats(response.data);
    } catch (error) {
      console.error("Error al obtener los beats comprados", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoggedHeader />
      <div className="container mt-5">
        <h2 className="text-center text-white fw-bold">Resumen de Compra</h2>
        {loading ? (
          <div className="text-center text-white mt-4">
            <div className="spinner-border text-primary" role="status"></div>
            <p>Cargando...</p>
          </div>
        ) : beats.length === 0 ? (
          <p className="text-center text-white mt-4">No hay beats comprados.</p>
        ) : (
          <div className="row justify-content-center">
            {beats.map((beat) => (
              <div key={beat.id} className="col-md-6 col-lg-4">
                <div className="card beat-card">
                  <img
                    src={beat.cover}
                    alt={beat.title}
                    className="card-img-top beat-cover"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-white">{beat.title}</h5>
                    <p className="text-secondary">
                      <strong>Productor:</strong> {beat.producer}
                    </p>
                    <p className="text-secondary">
                      <strong>Licencia:</strong> {beat.license_type}
                    </p>
                    <p className="text-success fw-bold">
                      <strong>Precio:</strong>{" "}
                      {beat.price.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                      €
                    </p>
                    <div className="download-buttons d-flex justify-content-between">
                      <a
                        href={beat.mp3_file}
                        download
                        className="btn btn-primary"
                      >
                        Descargar MP3
                      </a>

                      {beat.license_type === "Premium" ? (
                        <a
                          href={beat.wav_file}
                          download
                          className="btn btn-success" 
                        >
                          Descargar WAV
                        </a>
                      ) : (
                        <a
                          href={beat.wav_file}
                          download
                          className="btn btn-secondary" 
                        >
                          Descargar WAV
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PurchaseSummary;
