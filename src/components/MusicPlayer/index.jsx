import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';

import { nextSong, prevSong, playPause, resetPlayer } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

import './MusicPlayer.css';

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <div className="music-player-container position-fixed bottom-0 w-100 p-3 bg-dark bg-opacity-75 shadow-lg z-index-10">
      <div className="music-player-content d-flex flex-column flex-lg-row justify-content-between align-items-center container">
        {/* Track Info */}
        <div className="track-section d-flex align-items-center justify-content-center mb-3 mb-lg-0 col-12 col-lg-3">
          <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
        </div>

        {/* Controls Section */}
        <div className="controls-section d-flex flex-column align-items-center justify-content-center col-12 col-lg-6">
          <Controls
            isPlaying={isPlaying}
            isActive={isActive}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
          />
          <Seekbar
            value={appTime}
            min="0"
            max={duration}
            onInput={(event) => setSeekTime(event.target.value)}
            setSeekTime={setSeekTime}
            appTime={appTime}
          />
          <Player
            activeSong={activeSong}
            volume={volume}
            isPlaying={isPlaying}
            seekTime={seekTime}
            repeat={repeat}
            currentIndex={currentIndex}
            onEnded={handleNextSong}
            onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
            onLoadedData={(event) => setDuration(event.target.duration)}
          />
        </div>

        {/* Volume Section */}
        <div className="volume-section d-none d-lg-flex align-items-center col-12 col-lg-3 justify-content-end">
          <VolumeBar
            value={volume}
            min="0"
            max="1"
            onChange={(event) => setVolume(event.target.value)}
            setVolume={setVolume}
          />
        </div>
      </div>

      {/* Close Button */}
      <IoClose
        size={24}
        color="#FFF"
        className="position-absolute top-0 end-0 m-3"
        onClick={() => dispatch(resetPlayer())}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default MusicPlayer;
