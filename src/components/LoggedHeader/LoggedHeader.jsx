import React, { useState } from "react";
import { Navbar, Container, Form, Dropdown, Badge, Button } from "react-bootstrap";
import { FaSearch, FaRegCommentDots, FaRegHeart, FaBars } from "react-icons/fa";
import logo from "/src/assets/logo.png";
import clientAvatar from "/src/assets/avatar_temp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoggedHeader.css";

export function LoggedHeader({ clientName = "Cliente" }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="d-flex">
      {/* Sidebar (Navbar vertical a la izquierda) */}
      <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="sidebar-links">
          <Dropdown.Item href="#home">Inicio</Dropdown.Item>
          <Dropdown.Item href="#explore">Explorar</Dropdown.Item>
          <Dropdown.Item href="#playlists">Mis Playlists</Dropdown.Item>
          <Dropdown.Item href="#favourites">Mis favoritos</Dropdown.Item>
          <Dropdown.Item href="#settings">Ajustes</Dropdown.Item>
          <Dropdown.Item href="#logout">Cerrar sesión</Dropdown.Item>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="content">
        {/* Navbar superior */}
        <Navbar expand="lg" className="custom-navbar">
          <Container fluid className="d-flex justify-content-between align-items-center">
            {/* Botón para abrir/cerrar sidebar */}
            <Button variant="link" onClick={toggleSidebar} className="sidebar-toggle">
              <FaBars size={30} color="#fff" />
            </Button>

            {/* Barra de búsqueda */}
            <Form className="d-flex search-container">
              <div className="search-bar-container">
                <FaSearch className="search-icon" />
                <input
                  type="search"
                  placeholder="Buscar productor, artista..."
                  className="search-bar"
                  aria-label="Search"
                />
              </div>
            </Form>

            {/* Notificaciones y avatar del cliente */}
            <div className="d-flex align-items-center gap-4 notifications">
              <div className="notification-item">
                <FaRegCommentDots className="notification-icon" />
                <Badge pill bg="danger" className="notification-badge">
                  5
                </Badge>
              </div>
              <div className="notification-item">
                <FaRegHeart className="notification-icon" />
                <Badge pill bg="danger" className="notification-badge">
                  3
                </Badge>
              </div>

              <Dropdown align="end">
                <Dropdown.Toggle className="client-dropdown" id="dropdown-basic">
                  <div className="d-flex align-items-center gap-2">
                    <span className="client-name">{clientName}</span>
                    <img src={clientAvatar} alt="Avatar" className="avatar" />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-dropdown-menu">
                  <Dropdown.Item href="#profile">Mi perfil</Dropdown.Item>
                  <Dropdown.Item href="#logout">Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
