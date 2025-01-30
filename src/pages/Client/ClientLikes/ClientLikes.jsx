import SongCard from '/src/components/SongCard/SongCard';
import Loader from '/src/components/Loader/Loader';
import Error from '/src/components/Error/Error';
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "./../../../config";

const ClientLikes = () => {
  const [likedBeats, setLikedBeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para ver tus likes.");
        navigate("/login");
        return;
      }

      const response = await fetch(`${BASE_URL}/user/likes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLikedBeats(data);
      } else {
        console.error("Error al cargar los beats que te gustan");
      }
    };

    fetchLikes();
  }, [navigate]);

  if (likedBeats.length === 0) {
    return <Loader title="Cargando tus likes..." />;
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <LoggedHeader />
        {likedBeats.length === 0 ? (
          <Error message="No tienes beats likeados aún" />
        ) : (
          <div className="d-flex flex-column mx-auto" style={{ width: "90%" }}>
            <div className="d-flex flex-wrap justify-content-around gap-4 ">
              {likedBeats?.map((like) => (
                <SongCard
                  key={like.id}
                  song={like.beat} // Aquí se pasa el objeto beat
                  // Puedes añadir otras props necesarias para SongCard, como el estado de reproducción
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientLikes;
