import React, { useEffect, useState } from "react";
import SoundWave from "../../../components/SoundWave/SoundWave";
import { FaHeart, FaPlus, FaShoppingCart } from "react-icons/fa";
import "./BeatDetail.css";
import CommentBox from "../../../components/CommentBox/CommentBox";
import { useParams, Link } from "react-router-dom";
import Loader from "/src/components/Loader/Loader";
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { BASE_URL } from "./../../../config";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '/src/redux/features/cartSlice';

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
              <Link to={`/producer/${beat.user.id}`}>
                <p>{beat.user.name}</p>
              </Link>
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
                <div className="license-options">
                  {licenses.map((license) => (
                    <div
                      key={license.id}
                      className={`license-card ${selectedLicense === license.id ? "selected" : ""}`}
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
        )}
      </div>
    </div>
  );
};

export default BeatDetail;
