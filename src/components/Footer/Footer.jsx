import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-brand"><img src="" alt="" /></span>
        <div className="footer-info">
          <span className="footer-copy">
            <img src="public/logo.svg" alt="Logo Beatfinder" />
            © 2024 Beatfinder S.L., Todos los derechos reservados.
          </span>
          <a href="/terms" className="footer-terms">
            Términos y Condiciones
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
