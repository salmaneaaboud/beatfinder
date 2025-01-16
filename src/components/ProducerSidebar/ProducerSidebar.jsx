import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import logo from "/src/assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { LanguageSwitcher } from "/src/components/LanguageSwitcher/LanguageSwitcher";
import "./ProducerSidebar.css";

const ProducerSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapseToggle = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className="mt-3">
      <CDBSidebar
        textColor="#fff"
        id="sidebar-bg"
        className={isCollapsed ? "collapsed" : ""}
      >
        <CDBSidebarHeader
          prefix={
            <i
              className="fa fa-bars fa-large"
              onClick={handleCollapseToggle}
              style={{ cursor: "pointer" }}
            ></i>
          }
        >
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Menú
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/producer-dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="tachometer-alt">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/upload-beat" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="upload">Subir beat</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/explore" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="compass">Explorar</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/settings" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cogs">Configuración</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          {!isCollapsed && (
            <div className="language-switcher-container">
              <LanguageSwitcher />
            </div>
          )}
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default ProducerSidebar;
