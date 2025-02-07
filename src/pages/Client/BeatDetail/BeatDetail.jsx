import React, { useEffect, useState } from "react";
import SoundWave from "../../../components/SoundWave/SoundWave";
import { FaHeart, FaPlus, FaShoppingCart } from "react-icons/fa";
import "./BeatDetail.css";
import CommentBox from "../../../components/CommentBox/CommentBox";
import { useParams } from "react-router-dom";
import Loader from "/src/components/Loader/Loader";
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { BASE_URL } from "./../../../config";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '/src/redux/features/cartSlice';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const BeatDetail = () => {
  const [selectedLicense, setSelectedLicense] = useState(null);
  const { id } = useParams();
  const [beat, setBeat] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const isInCart = beat ? cart.some(item => item.id === beat.id) : false;
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  useEffect(() => {
    const fetchBeat = async () => {
      const response = await fetch(`${BASE_URL}/beat/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await response.json();
      setBeat(data);
      setLiked(data.is_liked);
      setLikeCount(data.likes_count);
    };

    fetchBeat();
  }, [id]);

  const toggleLike = async () => {
    setIsLoading(true);
    const response = await fetch(`${BASE_URL}/beats/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    });

    if (response.ok) {
      setLiked(!liked);
      setLikeCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
    }
    setIsLoading(false);
  };

  const handleCartToggle = () => {
    if (beat) {
      if (isInCart) {
        dispatch(removeFromCart(beat));
      } else {
        dispatch(addToCart(beat));
      }
    }
  };

  const handlePurchase = () => {
    navigate("/payment"); // Usar navigate para redirigir
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleLicenseSelect = (licenseId) => {
    setSelectedLicense(licenseId);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <LoggedHeader />
        {!beat ? (
          <Loader title="Cargando instrumental..." />
        ) : (
          <div className="beat-detail">
            <div className="beat-detail__left">
              <div className="beat-cover">
                <img src={beat.cover} alt="Beat cover" />
              </div>
              <h2>{beat.title}</h2>
              <p>{beat.user.name}</p>
              <div className="action-buttons">
                <button onClick={toggleLike} disabled={isLoading}>
                  {isLoading ? (
                    <ClipLoader size={24} color={"#3498db"} loading={isLoading} />
                  ) : (
                    <FaHeart className={`like-button ${liked ? "liked" : ""}`} size={35} />
                  )}
                  <span className="like-count">{likeCount}</span>
                </button>
                <button className="add-button">
                  <FaPlus size={20} />
                </button>
                <button onClick={handleCartToggle} className="cart-button">
                  <FaShoppingCart size={20} color={isInCart ? "red" : "white"} />
                </button>
              </div>

              <div className="beat-info">
                <h3>Información</h3>
                <div className="info-grid">
                  <div>Fecha de publicación</div>
                  <div>{formatDate(beat.created_at)}</div>
                  <div>BPM</div>
                  <div>{beat.bpm}</div>
                  <div>Tonalidad</div>
                  <div>{beat.key}</div>
                  <div>Género</div>
                  <div>{beat.genre}</div>
                  <div>Estado</div>
                  <div>{beat.status}</div>
                </div>
              </div>
            </div>

            <div className="beat-detail__right">
              <SoundWave audioUrl={beat.mp3_file} />

              <div className="licenses">
                <h3>Licencias</h3>
                {beat.licenses && beat.licenses.length > 0 && (
                  <>
                    <div className="selected-license">
                      <h4>Licencia seleccionada</h4>
                      <p>{beat.licenses[selectedLicense]?.license_name || "Ninguna seleccionada"}</p>
                      <p>{beat.licenses[selectedLicense]?.price || "0€"}</p>
                    </div>
                    <div className="license-options">
                      {beat.licenses.map((license, index) => (
                        <div
                          key={index}
                          className={`license-card ${selectedLicense === index ? "selected" : ""} ${license.license_name === 'premium' ? 'premium' : 'basic'}`}
                          onClick={() => handleLicenseSelect(index)}
                        >
                          <h4>{license.license_name === 'premium' ? 'Premium' : 'Básica'}</h4>
                          <p className="price">{license.price}€</p>
                          <p className="format">
                            {license.license_name === 'premium' ? 'MP3 / WAV' : 'MP3'}
                          </p>
                          <span className={`license-type ${license.license_name}`}>{license.license_name === 'premium' ? 'Premium' : 'Básica'}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="comments">
                <CommentBox />
              </div>

              <div className="purchase-button">
                <button onClick={handlePurchase} className="btn-purchase">
                  Comprar ahora
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeatDetail;
