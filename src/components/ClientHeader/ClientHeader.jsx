import React from "react";
import { Navbar, Container, Form, Dropdown, Badge } from "react-bootstrap";
import { FaSearch, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import { CgMenuLeft } from "react-icons/cg";
import logo from "/src/assets/logo.png";
import clientAvatar from "/src/assets/avatar_temp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ClientHeader.css";

export function ClientHeader({ clientName = "Cliente" /*clientAvatar*/ }) {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container className="d-flex justify-content-between align-items-center">
        <div className="menu-icon">
          <CgMenuLeft  className="menu-icon-style" />
        </div>

        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>

        <Form className="d-flex search-container">
          <div className="search-bar-container">
            <FaSearch className="search-icon" />
            <input
              type="search"
              placeholder="Productor, Artista, Cliente, ..."
              className="search-bar"
              aria-label="Search"
            />
          </div>
        </Form>

        {/* Notificaciones (Inbox y Likes) */}
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
            <Dropdown.Menu>
              <Dropdown.Item href="#profile">Mi perfil</Dropdown.Item>
              <Dropdown.Item href="#logout">Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}
