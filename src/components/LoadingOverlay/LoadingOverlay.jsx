import React from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = ({ isLoading, message = "Cargando..." }) => {
  if (!isLoading) return null; // Si no está cargando, no renderiza nada

  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingOverlay;
