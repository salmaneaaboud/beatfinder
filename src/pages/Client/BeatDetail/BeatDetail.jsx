import React, { useState } from "react";
import SoundWave from "../../../components/SoundWave/SoundWave";
import { FaHeart, FaPlus } from "react-icons/fa";
import "./BeatDetail.css";
import CommentBox from "../../../components/CommentBox/CommentBox";
import { useSelector } from 'react-redux';

const BeatDetail = () => {
  const selectedSong = useSelector((state) => state.player.selectedSong);
  console.log(selectedSong || "no hay una cancion seleccionada");
  const [selectedLicense, setSelectedLicense] = useState(null);

  const licenses = [
    {
      id: 1,
      name: "Licencia Básica",
      price: "40€",
      format: "MP3",
    },
    {
      id: 2,
      name: "Licencia Premium",
      price: "80€",
      format: "MP3, WAV",
    },
    {
      id: 3,
      name: "Licencia Exclusiva",
      price: "Precio negociable",
      format: "MP3, WAV",
    },
  ];

  const handleLicenseSelect = (licenseId) => {
    setSelectedLicense(licenseId);
  };

  if (!selectedSong) {
    return <p>No hay detalles disponibles para esta canción.</p>;
  }

  return (
    <div className="beat-detail">
      <div className="beat-detail__left">
        <div className="beat-cover">
          <img
            src={selectedSong?.cover}
            alt="Beat cover"
          />
        </div>
        <h2>R&B type beat</h2>
        <p>Productor 2</p>
        <div className="action-buttons">
          <button className="like-button">
            <FaHeart size={20} />
          </button>
          <button className="add-button">
            <FaPlus size={20} />
          </button>
        </div>

        <div className="beat-info">
          <h3>Información</h3>
          <div className="info-grid">
            <div>Fecha de publicación</div>
            <div>Oct 19, 2024</div>
            <div>BPM</div>
            <div>90</div>
            <div>Clave</div>
            <div>Si bemol</div>
            <div>Reproducciones</div>
            <div>1.2K</div>
          </div>
        </div>
      </div>

      <div className="beat-detail__right">
        <SoundWave audioUrl={selectedSong?.mp3_file} />

        <div className="licenses">
          <h3>Licencias</h3>
          <div className="license-options">
            {licenses.map((license) => (
              <div
                key={license.id}
                className={`license-card ${
                  selectedLicense === license.id ? "selected" : ""
                }`}
                onClick={() => handleLicenseSelect(license.id)}
              >
                <h4>{license.name}</h4>
                <p className="price">{license.price}</p>
                <p className="format">{license.format}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="comments">
          <CommentBox />
        </div>
      </div>
    </div>
  );
};

export default BeatDetail;
