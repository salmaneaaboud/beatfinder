import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PlayPause from '../PlayPause/PlayPause';
import { playPause, setActiveSong } from '/src/redux/features/playerSlice';
import { addToCart, removeFromCart } from '/src/redux/features/cartSlice';
import { useGetPurchasedBeatsQuery } from '/src/redux/services/shazamCore';
import api from '../../services/api';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart); 
  const { data: purchasedBeats, isFetching, error } = useGetPurchasedBeatsQuery();

  const isInCart = cart.some(item => item.id === song.id);
  const isPurchased = purchasedBeats?.some(item => item.id === song.id);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = async () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));

    try {
      await api.post(`/beat/${song.id}/listen`);
    } catch (error) {
      console.error("Error tracking listen:", error);
    }
  };

  const handleCartToggle = () => {
    if (isInCart) {
      dispatch(removeFromCart(song));
    } else {
      dispatch(addToCart(song)); 
    }
  };

  return (
    <div
      className="d-flex flex-column p-3 bg-light bg-opacity-10 rounded"
      style={{ width: '250px', backdropFilter: 'blur(5px)', cursor: 'pointer' }}
    >
      <div className="position-relative" style={{ width: '100%', height: '14rem' }}>
        <div
          className={`position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50`}
          style={{ display: activeSong?.title === song.title ? 'flex' : 'none' }}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          src={song?.cover}
          className="w-100 h-100 rounded"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="mt-3">
        <Link to={`/beat-detail/${song.id}`} className="text-decoration-none text-white">
          <p className="fw-bold text-white text-truncate">{song.title}</p>
          <p className="fw-semibold text-white text-truncate mt-1">{song.user.name}</p>
        </Link>
        <p className="fw-bold text-white mt-1">{song.price}€</p>
        {isFetching ? (
          <p className="text-white mt-2">Cargando...</p>
        ) : isPurchased ? (
          <button className="btn btn-success mt-2 w-100" disabled>Ya comprado</button>
        ) : (
          <button className="btn btn-primary mt-2 w-100" onClick={handleCartToggle}>
            {isInCart ? 'Eliminar del carrito' : 'Añadir al carrito'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SongCard;