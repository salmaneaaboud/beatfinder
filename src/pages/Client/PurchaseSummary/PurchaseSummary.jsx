import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "/src/services/api";
import { LoggedHeader } from "../../../components/LoggedHeader/LoggedHeader";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap
import "./PurchaseSummary.css";
import useDownloadFile from "/src/hooks/useDownloadFile";

const PurchaseSummary = () => {
  const { orderId } = useParams();
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const downloadFile = useDownloadFile();

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
                  <div className="card-body text-white">
                    <h5 className="card-title text-center">{beat.title}</h5>
                    <p>
                      <strong>Productor:</strong> {beat.producer}
                    </p>
                    <p>
                      <strong>Licencia:</strong> {beat.license_type}
                    </p>
                    <p>
                      <strong>Precio:</strong>{" "}
                      {beat.price.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                      €
                    </p>
                    <div className="download-buttons d-flex justify-content-between">
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() =>
                          downloadFile(beat.mp3_file, `beat_${beat.id}.mp3`)
                        }
                      >
                        Descargar MP3
                      </button>

                      {beat.license_type === "premium" && (
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() =>
                            downloadFile(beat.wav_file, `beat_${beat.id}.wav`)
                          }
                        >
                          Descargar WAV
                        </button>
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
