import { Navbar, Container, Button } from 'react-bootstrap';
import logo from '/src/assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; 

export function Header() {
  return (
    <Navbar expand="lg" className="navbar-transparent">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>
        
        <div className="d-flex gap-3">
          <Button variant="outline-light" className="btn-register">Registrarse</Button>
          <Button variant="primary" className="btn-login">Iniciar sesión</Button>
        </div>
      </Container>
    </Navbar>
  );
}
