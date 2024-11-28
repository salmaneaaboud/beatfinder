import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { AiOutlineAlignLeft } from "react-icons/ai";

function Navbar() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div  className={`d-flex flex-column ${collapsed ? '' : 'bg-dark'} text-white vh-100`} style={{ width: collapsed ? 'auto' : '20%' }}>
      <nav id='nav' className={`navbar navbar-dark flex-column align-items-start p-3 ${collapsed ? 'bg-transparent' : 'bg-dark'}`}>
        <button
          className="navbar-toggler mb-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={collapsed ? 'false' : 'true'}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <AiOutlineAlignLeft />
        </button>
        <div className={`collapse navbar-collapse w-100 ${collapsed ? '' : 'show'}`} id="navbarNav">
          <ul className="navbar-nav flex-column w-100">
          <div className='top-nav'>
                <li className="nav-item">
                <a href="#" className="nav-link text-white d-flex align-items-center">
                    <i className="bi bi-grid-fill me-3"></i>
                    Dashboard
                </a>
                </li>
                <li className="nav-item">
                <a href="#" className="nav-link text-white d-flex align-items-center">
                    <i className="bi bi-compass me-3"></i>
                    Explorar
                </a>
                </li>
                <li className="nav-item">
                <a href="#" className="nav-link text-white d-flex align-items-center">
                    <i className="bi bi-music-note-list me-3"></i>
                    Mi Playlist
                </a>
                </li>
                <li className="nav-item">
                <a href="#" className="nav-link text-white d-flex align-items-center">
                    <i className="bi bi-heart me-3"></i>
                    Mis favoritos
                </a>
                </li>
                <li className="nav-item">
                <a href="#" className="nav-link text-white d-flex align-items-center">
                    <i className="bi bi-envelope me-3"></i>
                    Mensaje
                </a>
                </li>
            </div>
            <div className='bottom-nav'>
                <li className="nav-item">
                <a href="#" className="nav-link text-white d-flex align-items-center">
                    <i className="bi bi-gear me-3"></i>
                    Configuración
                </a>
                </li>
                <li className="nav-item">
                <a href="#" className="nav-link text-white d-flex align-items-center">
                    <i className="bi bi-question-circle me-3"></i>
                    FAQ
                </a>
                </li>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
