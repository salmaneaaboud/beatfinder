import React from 'react';
import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';

const VolumeBar = ({ value, min, max, onChange, setVolume }) => (
  <div className="d-none d-lg-flex flex-grow-1 align-items-center justify-content-end">
    {value <= 1 && value > 0.5 && (
      <BsFillVolumeUpFill size={25} className="text-white" onClick={() => setVolume(0)} />
    )}
    {value <= 0.5 && value > 0 && (
      <BsVolumeDownFill size={25} className="text-white" onClick={() => setVolume(0)} />
    )}
    {value === 0 && (
      <BsFillVolumeMuteFill size={25} className="text-white" onClick={() => setVolume(1)} />
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
