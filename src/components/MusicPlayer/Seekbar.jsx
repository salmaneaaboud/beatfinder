import React from 'react';

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // Convierte el tiempo al formato 0:00
  const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div className="d-none d-sm-flex flex-row align-items-center">
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        className="btn btn-link text-white d-none d-lg-block me-3"
      >
        -
      </button>
      <p className="text-white mb-0">{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="form-range mx-3 w-50"
      />
      <p className="text-white mb-0">{max === 0 ? '0:00' : getTime(max)}</p>
      <button
        type="button"
        onClick={() => setSeekTime(appTime + 5)}
        className="btn btn-link text-white d-none d-lg-block ms-3"
      >
        +
      </button>
    </div>
  );
};

export default Seekbar;
