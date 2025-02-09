import React from 'react';

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // Convierte el tiempo al formato 0:00
  const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div className="container-fluid d-flex flex-row align-items-center">
      <p className="text-white mb-0">{value === 0 ? '0:00' : getTime(value)}</p>

      {/* Barra de progreso personalizada */}
      <div className="seekbar-container container-fluid mx-3 w-100">
        <input
          type="range"
          step="any"
          value={value}
          min={min}
          max={max}
          onInput={onInput}
          className="seekbar w-100"
        />
      </div>

      <p className="text-white mb-0">{max === 0 ? '0:00' : getTime(max)}</p>
    </div>
  );
};

export default Seekbar;
