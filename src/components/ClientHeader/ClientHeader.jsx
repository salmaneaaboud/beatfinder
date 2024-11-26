import { Navbar, Container, Form, FormControl } from 'react-bootstrap';
import logo from '/src/assets/logo.png';  // Ruta del logo
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClientHeader.css';    

export function ClientHeader({ clientName, clientAvatar }) {
  return (
    <Navbar expand="lg" className="navbar-transparent">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Logo alineado a la izquierda */}
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>

        {/* Buscador centrado */}
        <Form className="d-flex w-50">
          <FormControl
            type="search"
            placeholder="Buscar"
            className="me-2"
            aria-label="Search"
          />
        </Form>

        {/* Nombre y Avatar del cliente alineados a la derecha */}
        <div className="d-flex align-items-center gap-3">
          <span className="client-name">{clientName}</span>
          <img src={clientAvatar} alt="Avatar" className="avatar" />
        </div>
      </Container>
    </Navbar>
  );
}
