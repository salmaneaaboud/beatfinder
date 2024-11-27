import React, { useState } from "react";
import { Navbar, Container, Form, Dropdown, Badge } from "react-bootstrap";
import { FaSearch, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import logo from "/src/assets/logo.png";
import clientAvatar from "/src/assets/avatar_temp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoggedHeader.css";

export function LoggedHeader({ clientName = "Cliente" }) {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid className="d-flex justify-content-between align-items-center">
        
        <div className="d-flex align-items-center gap-3">
          <Navbar.Brand href="#home">
            <img src={logo} alt="logo" className="logo" />
          </Navbar.Brand>
        </div>

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
