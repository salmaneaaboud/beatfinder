import { Navbar, Container, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "/src/assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useTranslation } from 'react-i18next';

export function Header() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar expand="lg" className="navbar-transparent">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>

        <div className="d-flex gap-3">
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" className="client-dropdown" id="dropdown-basic">
              Idioma
            </Dropdown.Toggle>
            <Dropdown.Menu className="custom-dropdown-menu">
              <Dropdown.Item onClick={() => changeLanguage("es")}>Español</Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage("en")}>English</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Link to="/register">
            <Button variant="outline-light" className="btn-register">
              {t("header.register_button")}
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="primary" className="btn-login">
            {t("header.login_button")}
            </Button>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}
