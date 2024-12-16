import React, { useRef, useState } from 'react';
import './BeatItem.css';
import { FaShoppingCart, FaPlay, FaPause } from 'react-icons/fa';

const BeatItem = ({ image, title, price, audioUrl }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="beatitem-card">
      <div
        className="beatitem-card-image-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={image} alt={title} className="beatitem-card-image" />
        <div className="beatitem-card-overlay"></div>
        {(isHovered || isPlaying) && (
          <button className="play-button" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        )}
        <audio ref={audioRef} src={audioUrl}></audio>
      </div>
      <p className="beatitem-card-artist"><strong>{title}</strong></p>
      <div className="beatitem-card-footer">
        <button className="beatitem-card-button">
          <FaShoppingCart />
          {price}€
        </button>
      </div>
    </div>
  );
};

export default BeatItem;
