import React from 'react';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content d-flex justify-content-center mt-5">
        <span className="footer-brand"><img src="" alt="" /></span>
        <div className="footer-info d-flex flex-column align-items-center">
          <span className="footer-copy d-flex flex-column align-items-center">
            <img src="public/logo.svg" alt="Logo Beatfinder" />
            <p>© 2024 Beatfinder S.L., Todos los derechos reservados.</p>
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
