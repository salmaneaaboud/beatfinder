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
            <NavLink exact to="/client" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="tachometer-alt">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/discover" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="compass">Explorar</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/purchased-beats" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="music">Beats comprados</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/client/likes" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="heart">Mis Favoritos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/edit-user" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cogs">Perfil</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
