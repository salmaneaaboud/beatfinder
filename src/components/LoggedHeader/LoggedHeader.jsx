import { Nav, Navbar, Container, Form, Dropdown, Badge } from "react-bootstrap";
import { FaSearch, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";
import clientAvatar from "/src/assets/avatar_temp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoggedHeader.css";
import logo from "/src/assets/logo.png";
import { useAuth } from '/src/hooks/useAuth';

export function LoggedHeader() {
  const auth = useAuth();
  
  return (
    <Navbar expand="lg" className="custom-navbar w-100">
      <Container fluid className="px-3">
        <Navbar.Brand href="#home">
          <img src={logo} alt="Logo" className="logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler border-0">
          <BiMenuAltRight color="white" size={35}/>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 flex-column flex-lg-row">
            <Form className="search-bar-container col-12 col-lg-6 ms-lg-auto mx-0 my-lg-0 my-3">
              <FaSearch className="search-icon" />
              <input
                type="search"
                placeholder="Buscar productor, artista..."
                className="search-bar w-100"
                aria-label="Search"
              />
            </Form>

            <div className="d-flex align-items-center gap-4 ms-auto notifications">
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
                    <span className="client-name">{auth.user?.name || "Usuario"}</span>
                    <img src={clientAvatar} alt="Avatar" className="avatar" />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-dropdown-menu">
                  <Dropdown.Item href="#profile">Mi perfil</Dropdown.Item>
                  <Dropdown.Item onClick={auth.logout}>Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
