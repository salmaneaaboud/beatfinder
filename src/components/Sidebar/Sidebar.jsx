import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import logo from "/src/assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="mt-3">
      <CDBSidebar textColor="#fff" id="sidebar-bg">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
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
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="tachometer-alt">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/explore" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="compass">Explorar</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/playlists" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="music">Mis Playlists</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/favorites" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="heart">Mis Favoritos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/settings" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cogs">Configuración</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
