import React, { useState } from "react";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";
import "./navbar.css"; // Import the CSS file

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Navigation Links */}
      <nav
        className="navbar"
        style={{
          backgroundColor: "#f5f5f5",
          transition:
            "background-color 0.3s ease, color 0.3s ease, padding 0.3s ease",
          position: "sticky",
          zIndex: "1000",
          width: "100%",
          height: 'auto'
        }}
      >
        <div className="container" style={{display: "flex", flexDirection: "row"}}>
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img
                src={logo}
                style={{ width: "100px", height: "70px", objectFit: "cover" }}
              />
            </a>
            </div>

            {/* Hamburger Icon */}
            <div className="hamburger" onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>

            {/* Menu items */}
            <ul className={`nav nav-underline justify-content-center ${isOpen ? "open" : ""}`}>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  activeClassName="active-link"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className="nav-link"
                  activeClassName="active-link"
                >
                  About us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/services"
                  className="nav-link"
                  activeClassName="active-link"
                >
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/projects"
                  className="nav-link"
                  activeClassName="active-link"
                >
                  Projects
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/career"
                  className="nav-link"
                  activeClassName="active-link"
                >
                  Career
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  to="/contact"
                  className=" btn btn-dark"
                  activeClassName="active-link"
                  style={{ borderRadius: "10px", marginLeft: "10px" }}
                >
                  Contact
                </button>
              </li>
            </ul>
          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
