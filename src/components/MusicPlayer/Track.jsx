import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => {
  const spinnerStyle = {
    animation: 'spinner-border 1.5s linear infinite',
    width: '50px',
    height: '50px',
  };

  return (
    <div className="d-flex align-items-center justify-content-start flex-grow-1">
      <div
        className={`${isPlaying && isActive ? 'text-secondary' : ''} d-none d-sm-block rounded-circle me-3`}
        style={isPlaying && isActive ? spinnerStyle : { width: '50px', height: '50px' }}
      >
        <img
          src={activeSong?.cover}
          alt="cover art"
          className="img-fluid rounded-circle"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ width: '50%' }}>
        <p className="text-truncate text-white fw-bold mb-1">
          {activeSong?.title ? activeSong?.title : 'No active Song'}
        </p>
        <p className="text-truncate text-secondary mb-0">
          {activeSong?.user?.name}
        </p>
      </div>
    </div>
  );
};

export default Track;
