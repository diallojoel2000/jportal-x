import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavLinkTree = ({ children }) => {
  const [isNavTreeOpen, setNavTreeOpen] = useState(false);
  const [isNavTreeActive, setNavTreeActive] = useState(false);

  const toggleMenu = () => {
    setNavTreeOpen(!isNavTreeOpen);
  };

  return (
    <li
      className={isNavTreeOpen ? "nav-item menu-open" : "nav-item"}
      onClick={toggleMenu}
    >
      <NavLink
        to="#"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <i className="nav-icon bi bi-person-fill-gear"></i>
        <p>
          User Management
          <i className="nav-arrow bi bi-chevron-right"></i>
        </p>
      </NavLink>

      <ul className="nav nav-treeview">
        <li className="nav-item">
          <NavLink
            to="/users"
            className={({ isActive }) => {
              if (isActive) {
                setNavTreeActive(true);
                setNavTreeOpen(true);
              }
              return isActive ? "nav-link active" : "nav-link";
            }}
          >
            <i className="nav-icon bi bi-people"></i>
            <p>Users</p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="../index2.html" className="nav-link">
            <i className="nav-icon bi bi-universal-access"></i>
            <p>Roles</p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="../index3.html" className="nav-link">
            <i className="nav-icon bi bi-shield-lock"></i>
            <p>Permissions</p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="../index3.html" className="nav-link">
            <i className="nav-icon bi bi-person-lock"></i>
            <p>Users In Role</p>
          </NavLink>
        </li>
      </ul>
    </li>
  );
};

export default NavLinkTree;
