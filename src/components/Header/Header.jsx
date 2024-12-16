import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import logo from '/src/assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

export function Header() {
  return (
    <Navbar expand="lg" className="navbar-transparent">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>

        <div className="d-flex gap-3">
          <Link to="/register">
            <Button variant="outline-light" className="btn-register">Registrarse</Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" className="btn-login">Iniciar sesión</Button>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}
