import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="d-flex align-items-center justify-content-start flex-grow-1">
    <div
      className={`${
        isPlaying && isActive ? 'spinner-border text-secondary' : ''
      } d-none d-sm-block rounded-circle me-3`}
      style={{ width: '4rem', height: '4rem', overflow: 'hidden' }}
    >
      <img
        src={activeSong?.cover}
        alt="cover art"
        className="img-fluid rounded-circle"
      />
    </div>
    <div style={{ width: '50%' }}>
      <p className="text-truncate text-white fw-bold mb-1">
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className="text-truncate text-secondary mb-0">
        {activeSong?.subtitle ? activeSong?.subtitle : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
