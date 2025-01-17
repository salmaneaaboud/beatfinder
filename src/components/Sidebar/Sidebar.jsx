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
import "./Sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapseToggle = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className="mt-3">
      <CDBSidebar className={`bg-transparent text-light vh-100 ${isCollapsed ? "collapsed" : ""}`}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" onClick={handleCollapseToggle}></i>}>
          <a href="/" className="text-decoration-none text-white">
            Menú
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard" activeClassName="active">
              <CDBSidebarMenuItem icon="tachometer-alt">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/discover" activeClassName="active">
              <CDBSidebarMenuItem icon="compass">Explorar</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/playlists" activeClassName="active">
              <CDBSidebarMenuItem icon="music">Mis Playlists</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/favorites" activeClassName="active">
              <CDBSidebarMenuItem icon="heart">Mis Favoritos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/settings" activeClassName="active">
              <CDBSidebarMenuItem icon="cogs">Configuración</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          <div className={`language-switcher-container ${isCollapsed ? "d-none" : ""}`}>
            <LanguageSwitcher />
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
