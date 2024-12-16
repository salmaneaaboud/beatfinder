import React, { useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaHeart,
  FaRandom,
  FaVolumeUp,
} from "react-icons/fa";
import "./AudioPlayer.css";

const AudioPlayer = ({
  trackTitle = "Trap type beat",
  artist = "Productor 1",
  audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Audio de ejemplo
  coverImage = "https://via.placeholder.com/50", // Imagen por defecto
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isLiked, setIsLiked] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    setProgress(value);
  };

  const updateProgress = () => {
    const value =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(value);
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    audioRef.current.volume = value / 100;
    setVolume(value);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="audio-player">
      {/* Sección Izquierda */}
      <div className="left-section">
        <img src={coverImage} alt="Cover" className="cover-image" />
        <div className="track-details">
          <div className="track-title">{trackTitle}</div>
          <div className="track-artist">{artist}</div>
        </div>
      </div>

      {/* Sección Central */}
      <div className="center-section">
        <div className="controls">
          <FaStepBackward className="control-icon" />
          <button onClick={togglePlayPause} className="play-pause">
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <FaStepForward className="control-icon" />
          <FaHeart
            className="control-icon"
            onClick={toggleLike}
            style={{ color: isLiked ? "red" : "white", cursor: "pointer" }}
          />
        </div>
        {/* Barra de progreso debajo de los controles */}
        <div className="progress-bar">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgress}
          />
        </div>
      </div>

      {/* Control de Volumen */}
      <div className="volume-control">
        <FaVolumeUp className="control-icon" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>

      {/* Elemento de audio */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={updateProgress}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;
