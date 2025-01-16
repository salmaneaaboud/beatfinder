import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';
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

      {/* Controles existentes */}
      <BsArrowRepeat 
        size={20} 
        color={repeat ? 'red' : 'white'} 
        onClick={() => setRepeat((prev) => !prev)} 
        className="d-none d-sm-block" 
        style={{ cursor: 'pointer' }} 
      />

      {currentSongs?.length && (
        <MdSkipPrevious 
          size={30} 
          color="#FFF" 
          onClick={handlePrevSong} 
          style={{ cursor: 'pointer' }} 
        />
      )}

      {isPlaying ? (
        <BsFillPauseFill 
          size={45} 
          color="#FFF" 
          onClick={handlePlayPause} 
          style={{ cursor: 'pointer' }} 
        />
      ) : (
        <BsFillPlayFill 
          size={45} 
          color="#FFF" 
          onClick={handlePlayPause} 
          style={{ cursor: 'pointer' }} 
        />
      )}

      {currentSongs?.length && (
        <MdSkipNext 
          size={30} 
          color="#FFF" 
          onClick={handleNextSong} 
          style={{ cursor: 'pointer' }} 
        />
      )}

      <BsShuffle 
        size={20} 
        color={shuffle ? 'red' : 'white'} 
        onClick={() => setShuffle((prev) => !prev)} 
        className="d-none d-sm-block" 
        style={{ cursor: 'pointer' }} 
      />
    </div>
  );
};

export default Controls;