import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause } from "react-icons/fa"; // Importamos los iconos

const SoundWave = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const timeRef = useRef(null);
  const durationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#656666',
      progressColor: '#EE772F',
      barWidth: 2,
      barGap: 1,
      height: 100,
      cursorWidth: 1,
      cursorColor: '#fff',
      normalize: true,
      responsive: true,
      fillParent: true,
      minPxPerSec: 50,
    });

    wavesurferRef.current.load(audioUrl);

    wavesurferRef.current.on('ready', () => {
      const duration = wavesurferRef.current.getDuration();
      durationRef.current.textContent = formatTime(duration);
    });

    wavesurferRef.current.on('audioprocess', () => {
      const currentTime = wavesurferRef.current.getCurrentTime();
      timeRef.current.textContent = formatTime(currentTime);
    });

    wavesurferRef.current.on('finish', () => {
      setIsPlaying(false);
    });

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    return `${minutes}:${secondsRemainder.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ 
      backgroundColor: '#1E1E1E', 
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px' 
    }}>
      <div style={{ position: 'relative' }}>
        <button 
          onClick={handlePlayPause}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            backgroundColor: '#EE772F',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          {isPlaying ? <FaPause size={15} /> : <FaPlay size={15} style={{ marginLeft: "2px" }} />}
        </button>
        <div
          ref={timeRef}
          style={{
            position: 'absolute',
            left: '60px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            fontSize: '12px',
            zIndex: 2,
          }}
        >
          0:00
        </div>
        <div
          ref={durationRef}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            fontSize: '12px',
            zIndex: 2,
          }}
        >
          0:00
        </div>
        <div 
          ref={waveformRef} 
          style={{ 
            width: '100%',
            cursor: 'pointer',
            marginLeft: '50px'
          }}
        />
      </div>
    </div>
  );
};

export default SoundWave;