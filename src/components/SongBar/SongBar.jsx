import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from '../PlayPause/PlayPause';

const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div
    className={`d-flex flex-row align-items-center py-2 px-4 rounded mb-2 ${activeSong?.title === song?.title ? 'bg-secondary' : 'bg-transparent'} hover-bg-secondary`}
    style={{ cursor: 'pointer' }}
  >
    <h3 className="fw-bold text-white me-3" style={{ fontSize: '1rem' }}>{i + 1}.</h3>
    <div className="flex-grow-1 d-flex flex-row justify-content-between align-items-center">
      <img
        className="rounded"
        style={{ width: '5rem', height: '5rem' }}
        src={artistId ? song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-grow-1 d-flex flex-column justify-content-center mx-3">
        {!artistId ? (
          <Link to={`/songs/${song.key}`} className="text-decoration-none">
            <p className="text-white fw-bold" style={{ fontSize: '1.25rem' }}>
              {song?.title}
            </p>
          </Link>
        ) : (
          <p className="text-white fw-bold" style={{ fontSize: '1.25rem' }}>
            {song?.attributes?.name}
          </p>
        )}
        <p className="text-muted mt-1" style={{ fontSize: '1rem' }}>
          {artistId ? song?.attributes?.albumName : song?.subtitle}
        </p>
      </div>
    </div>
    {!artistId && (
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
    )}
  </div>
);

export default SongBar;
