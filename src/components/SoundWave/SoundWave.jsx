import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { resetPlayer } from '/src/redux/features/playerSlice';

const SoundWave = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const timeRef = useRef(null);
  const durationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#656666",
      progressColor: "#EE772F",
      barWidth: 2,
      barGap: 1,
      height: 100,
      cursorWidth: 1,
      cursorColor: "#fff",
      normalize: true,
      responsive: true,
      fillParent: true, // Ajusta la onda al contenedor disponible
    });

    wavesurferRef.current.load(audioUrl);

    wavesurferRef.current.on("ready", () => {
      const duration = wavesurferRef.current.getDuration();
      durationRef.current.textContent = formatTime(duration);
    });

    wavesurferRef.current.on("audioprocess", () => {
      const currentTime = wavesurferRef.current.getCurrentTime();
      timeRef.current.textContent = formatTime(currentTime);
    });

    wavesurferRef.current.on("finish", () => {
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
      dispatch(resetPlayer());
      wavesurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    return `${minutes}:${secondsRemainder.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-dark p-3 rounded mb-4">
      <div className="d-flex align-items-center mb-2">
        <button
          onClick={handlePlayPause}
          className="btn btn-warning rounded-circle d-flex align-items-center justify-content-center me-3"
          style={{ width: "40px", height: "40px",  backgroundColor: '#EE772F', border: 'none', borderRadius: '50%', }}
        >
          {isPlaying ? <FaPause size={15} /> : <FaPlay size={15} />}
        </button>

        <span ref={timeRef} className="text-white me-3">
          0:00
        </span>

        <div
          className="flex-grow-1 overflow-hidden"
          style={{ height: "100px", display: "flex", alignItems: "center" }}
        >
          <div
            ref={waveformRef}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <span ref={durationRef} className="text-white ms-3">
          0:00
        </span>
      </div>
    </div>
  );
};

export default SoundWave;
