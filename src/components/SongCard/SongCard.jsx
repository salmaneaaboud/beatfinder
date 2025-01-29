import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from '../PlayPause/PlayPause';
import { playPause, setActiveSong, setSelectedSong } from '/src/redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      className="d-flex flex-column p-3 bg-light bg-opacity-10 rounded"
      style={{
        width: '250px',
        backdropFilter: 'blur(5px)',
        cursor: 'pointer',
      }}
    >
      <div
        className="position-relative"
        style={{ width: '100%', height: '14rem' }}
      >
        <div
          className={`position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50`}
          style={{
            display: activeSong?.title === song.title ? 'flex' : 'none',
          }}
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
        <Link
          to={`/beat-detail/${song.id}`}
          className="text-decoration-none text-white"
        >
          <p className="fw-bold text-white text-truncate">{song.title}</p>
          <p className="fw-semibold text-white text-truncate mt-1">
            {song.user.name}
          </p>
        </Link>

      </div>
    </div>
  );
};

export default SongCard;
