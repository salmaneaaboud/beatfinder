import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";


export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="light" className="client-dropdown" id="dropdown-basic">
        {i18n.language === "en" ? "English" : "Español"}
      </Dropdown.Toggle>
      <Dropdown.Menu className="custom-dropdown-menu">
        <Dropdown.Item
          onClick={() => changeLanguage("es")}
          style={{ fontWeight: i18n.language === "es" ? "bold" : "normal" }}
        >
          Español
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => changeLanguage("en")}
          style={{ fontWeight: i18n.language === "en" ? "bold" : "normal" }}
        >
          English
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
