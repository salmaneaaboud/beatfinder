import React from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom, FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';
import { FaRepeat } from "react-icons/fa6";
import { useDispatch } from 'react-redux';

const Controls = ({ 
  isPlaying, 
  repeat, 
  setRepeat, 
  shuffle, 
  setShuffle, 
  currentSongs, 
  handlePlayPause, 
  handlePrevSong, 
  handleNextSong 
}) => {
  const dispatch = useDispatch();

  return (
    <div className="d-flex align-items-center justify-content-around w-100 position-relative">

      {/* Icono de Repetir */}
      <FaRepeat 
        size={20} 
        color={repeat ? '#FF6347' : '#FFF'} 
        onClick={() => setRepeat((prev) => !prev)} 
        style={{ cursor: 'pointer' }} 
      />

      {currentSongs?.length && (
        <FaStepBackward 
          size={30} 
          color="#FFF" 
          onClick={handlePrevSong} 
          style={{ cursor: 'pointer' }} 
        />
      )}

      {isPlaying ? (
        <FaPause 
          size={45} 
          color="#FFF" 
          onClick={handlePlayPause} 
          style={{ cursor: 'pointer' }} 
        />
      ) : (
        <FaPlay 
          size={45} 
          color="#FFF" 
          onClick={handlePlayPause} 
          style={{ cursor: 'pointer' }} 
        />
      )}

      {currentSongs?.length && (
        <FaStepForward 
          size={30} 
          color="#FFF" 
          onClick={handleNextSong} 
          style={{ cursor: 'pointer' }} 
        />
      )}

      <FaRandom 
        size={20} 
        color={shuffle ? '#FF6347' : '#FFF'} 
        onClick={() => setShuffle((prev) => !prev)} 
        style={{ cursor: 'pointer' }} 
      />
    </div>
  );
};

export default Controls;
