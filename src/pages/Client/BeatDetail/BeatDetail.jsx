import React, { useEffect, useState } from "react";
import SoundWave from "../../../components/SoundWave/SoundWave";
import { FaHeart, FaPlus, FaShoppingCart } from "react-icons/fa";
import "./BeatDetail.css";
import CommentBox from "../../../components/CommentBox/CommentBox";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "/src/components/Loader/Loader";
import Sidebar from "/src/components/Sidebar/Sidebar";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { BASE_URL } from "./../../../config";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "/src/redux/features/cartSlice";

const BeatDetail = () => {
  const [selectedLicense, setSelectedLicense] = useState(null);
  const { id } = useParams();
  const [beat, setBeat] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeat = async () => {
      const response = await fetch(`${BASE_URL}/beat/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      setBeat(data);
      setLiked(data.is_liked);
      setLikeCount(data.likes_count);
    };

    fetchBeat();
  }, [id]);

  const isInCart = cart.some((item) => item.id === beat?.id);

  const toggleLike = async () => {
    setIsLoading(true);
    const response = await fetch(`${BASE_URL}/beats/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      setLiked(!liked);
      setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    }
    setIsLoading(false);
  };

  const handleCartToggle = () => {
    if (beat && selectedLicense !== null) {
      const selectedBeatWithLicense = {
        ...beat,
        price: beat.licenses[selectedLicense].price,
        licenseName: beat.licenses[selectedLicense].license_name,
        beat_license_id: beat.licenses[selectedLicense].beat_license_id,
      };

      if (isInCart) {
        dispatch(removeFromCart(selectedBeatWithLicense));
      } else {
        dispatch(addToCart(selectedBeatWithLicense));
      }
    }
  };

  const handlePurchase = () => {
    if (selectedLicense !== null) {
      const selectedBeatWithLicense = {
        ...beat,
        price: beat.licenses[selectedLicense].price,
        licenseName: beat.licenses[selectedLicense].license_name,
        beat_license_id: beat.licenses[selectedLicense].beat_license_id,
      };
      dispatch(addToCart(selectedBeatWithLicense));
      navigate(`/payment`);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <LoggedHeader />
        <div className="container mt-4">
          {!beat ? (
            <Loader title="Cargando instrumental..." />
          ) : (
            <div className="row g-4">
              {/* Columna Izquierda */}
              <div className="col-lg-4">
                <div className="beat-detail__left p-3 rounded">
                  <div className="beat-cover mb-3">
                    <img src={beat.cover} alt="Beat cover" className="img-fluid rounded" />
                  </div>
                  <h2>{beat.title}</h2>
                  <Link to={`/producer/${beat.user.id}`} className="text-light">
                    <p>{beat.user.name}</p>
                  </Link>
                  <div className="d-flex gap-3 mt-3">
                    <button onClick={toggleLike} className="btn border-light rounded-circle" disabled={isLoading}>
                      {isLoading ? (
                        <ClipLoader size={24} color={"#3498db"} loading={isLoading} />
                      ) : (
                        <FaHeart className={`like-button ${liked ? "liked" : ""}`} size={35} />
                      )}
                      <span className="ms-2">{likeCount}</span>
                    </button>
                    <button className="btn border-light rounded-circle">
                      <FaPlus size={20} />
                    </button>
                    <button onClick={handleCartToggle} className={`btn ${isInCart ? "btn-danger" : "btn-outline-light"} rounded-circle`}>
                      <FaShoppingCart size={20} />
                    </button>
                  </div>

                  <div className="mt-4">
                    <h3>Información</h3>
                    <ul className="list-group">
                      <li className="list-group-item bg-dark text-light">Fecha: {new Date(beat.created_at).toLocaleDateString("es-ES")}</li>
                      <li className="list-group-item bg-dark text-light">BPM: {beat.bpm}</li>
                      <li className="list-group-item bg-dark text-light">Tonalidad: {beat.key}</li>
                      <li className="list-group-item bg-dark text-light">Género: {beat.genre}</li>
                      <li className="list-group-item bg-dark text-light">Estado: {beat.status}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Columna Derecha */}
              <div className="col-lg-8">
                <div className="beat-detail__right p-3 rounded">
                  <SoundWave audioUrl={beat.mp3_file} />
                  <div className="mt-4">
                    <h3>Licencias</h3>
                    <div className="row g-3">
                      {beat.licenses.map((license, index) => (
                        <div key={index} className="col-md-4">
                          <div
                            className={`license-card p-3 text-center rounded ${
                              selectedLicense === index ? "border-white" : "border-dark"
                            }`}
                            onClick={() => setSelectedLicense(index)}
                          >
                            <h5>{license.license_name}</h5>
                            <p className="price">{license.price}€</p>
                            <p className="text-muted">{license.license_name === "premium" ? "MP3 / WAV" : "MP3"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="comments mt-4">
                    <CommentBox />
                  </div>
                  <div className="text-center mt-4">
                    <button onClick={handlePurchase} className="btn btn-primary px-4 py-2">
                      Comprar ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeatDetail;
