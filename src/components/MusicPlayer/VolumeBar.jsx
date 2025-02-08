import React from 'react';
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';

const VolumeBar = ({ value, min, max, onChange, setVolume }) => (
  <div className="d-none d-lg-flex flex-grow-1 align-items-center justify-content-end">
    {value > 0.5 && value <= 1 && (
      <FaVolumeUp size={25} className="text-white" onClick={() => setVolume(0)} />
    )}
    {value > 0 && value <= 0.5 && (
      <FaVolumeDown size={25} className="text-white" onClick={() => setVolume(0)} />
    )}
    {value === 0 && (
      <FaVolumeMute size={25} className="text-white" onClick={() => setVolume(1)} />
    )}
    <input
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className="form-range w-50 ms-2"
    />
  </div>
);

export default VolumeBar;
