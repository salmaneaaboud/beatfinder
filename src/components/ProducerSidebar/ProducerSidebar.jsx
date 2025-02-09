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
import "./ProducerSidebar.css";

const ProducerSidebar = () => {
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
            <NavLink exact to="/producer" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="tachometer-alt">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/upload-beat" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="upload">Subir beat</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/discover" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="compass">Explorar</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/settings" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cogs">Mi perfil</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default ProducerSidebar;
