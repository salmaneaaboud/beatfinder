import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "/src/assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "/src/components/LanguageSwitcher/LanguageSwitcher";

export function Header() {
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" className="navbar-transparent">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>

        <div className="d-flex gap-3">
          <LanguageSwitcher />

          <Link to="/register">
            <Button variant="primary" className="btn-register">
              {t("header.register_button")}
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="outline-light" className="btn-login">
              {t("header.login_button")}
            </Button>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}


