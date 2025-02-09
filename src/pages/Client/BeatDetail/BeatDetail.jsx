import React, { useEffect, useState } from "react";
import SoundWave from "../../../components/SoundWave/SoundWave";
import { FaHeart, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "/src/components/Loader/Loader";
import Sidebar from "/src/components/Sidebar/Sidebar";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { BASE_URL } from "./../../../config";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "/src/redux/features/cartSlice";
import { useGetPurchasedBeatsQuery } from '/src/redux/services/shazamCore';
import "bootstrap/dist/css/bootstrap.min.css";

const BeatDetail = () => {
  const [selectedLicense, setSelectedLicense] = useState(null);
  const { id } = useParams();
  const [beat, setBeat] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { data: purchasedBeats, isFetching, error } = useGetPurchasedBeatsQuery();

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

  const isInCart = beat ? cart.some((item) => item.id === beat.id) : false;
  const isPurchased = beat ? purchasedBeats?.some(item => item.id === beat.id) : false;

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
        setSelectedLicense(null);
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

  const handleLicenseSelection = (index) => {
    if (!isInCart) {
      setSelectedLicense(index);
    }
  };

  return (
    <div style={{ display: "flex"}}>
      <Sidebar />
      <div className="flex-grow-1">
        <LoggedHeader />
        {!beat ? (
          <Loader title="Cargando instrumental..." />
        ) : (
          <div className="container py-4">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="bg-dark text-white p-3 rounded shadow">
                  <img src={beat.cover} alt="Beat cover" className="img-fluid rounded mb-3" />
                  <h2 className="fs-4">{beat.title}</h2>
                  <Link to={`/producer/${beat.user.id}`} className="text-decoration-none text-secondary">
                    <p className="mb-3">{beat.user.name}</p>
                  </Link>

                  <div className="d-flex gap-3 my-3">
                    <button className="btn btn-outline-light rounded-circle position-relative" onClick={toggleLike} disabled={isLoading}>
                      {isLoading ? <ClipLoader size={24} color={"#3498db"} /> : <FaHeart className={liked ? "text-danger" : ""} />}
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {likeCount}
                      </span>
                    </button>
                    <button className="btn btn-outline-light rounded-circle">
                      <FaPlus />
                    </button>
                    <button className="btn btn-outline-light rounded-circle" onClick={handleCartToggle} disabled={isPurchased}>
                      <FaShoppingCart className={isInCart ? "text-danger" : ""} />
                    </button>
                  </div>

                  <h3 className="fs-5">Información</h3>
                  <ul className="list-unstyled small">
                    <li><strong>Fecha:</strong> {new Date(beat.created_at).toLocaleDateString("es-ES")}</li>
                    <li><strong>BPM:</strong> {beat.bpm}</li>
                    <li><strong>Tonalidad:</strong> {beat.key}</li>
                    <li><strong>Género:</strong> {beat.genre}</li>
                    <li><strong>Estado:</strong> {beat.status}</li>
                  </ul>

                  <h3 className="fs-5">Tags</h3>
                  <div className="d-flex gap-2 flex-wrap">
                    {beat.tags?.map((tag, index) => (
                      <span key={index} className="badge bg-primary">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="bg-dark text-white p-3 rounded shadow">
                  <SoundWave audioUrl={beat.mp3_file} />
                  <div className="mt-4">
                    <h3 className="fs-5">Licencias</h3>
                    <div className="row g-3">
                      {beat.licenses?.map((license, index) => (
                        <div className="col-md-4" key={index}>
                          <div
                            className={`p-3 rounded text-center ${selectedLicense === index ? "bg-light text-dark" : "bg-secondary"} shadow-sm`}
                            onClick={() => handleLicenseSelection(index)}
                            style={{ cursor: "pointer", opacity: isInCart || isPurchased ? 0.5 : 1 }}
                          >
                            <h4 className="fs-6 mb-2">{license.license_name}</h4>
                            <p className="fs-5 fw-bold">{license.price}€</p>
                            <p className="small">{license.license_name === "premium" ? "MP3 / WAV" : "MP3"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    className="btn btn-primary w-100 mt-4"
                    onClick={handlePurchase}
                    disabled={isPurchased || selectedLicense === null}
                  >
                    {isPurchased ? "Ya comprado" : "Comprar ahora"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeatDetail;
