import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

//Parent does not need permission check, this will be checked in submenu
//use UseEffect to load the sidebar if the menu is coming from backend
const SIDE_BAR_MENU = [
  {
    name: "User Management",
    path: "#",
    icon: "bi bi-person-fill-gear",
    permission: "ManageUser",
    subMenu: [
      {
        name: "Users",
        path: "/user-management/users",
        icon: "bi bi-people",
        permission: "ManageUser",
      },
      {
        name: "Roles",
        path: "/user-management/roles",
        icon: "bi bi-universal-access",
        permission: "ManageUser",
      },
    ],
  },
  {
    name: "User Management1",
    path: "#",
    icon: "bi bi-person-fill-gear",
    permission: "ManageUser",
    subMenu: [
      {
        name: "Users1",
        path: "/user-management/users1",
        icon: "bi bi-people",
        permission: "ManageUser",
      },
      {
        name: "Roles1",
        path: "/user-management/roles1",
        icon: "bi bi-universal-access",
        permission: "ManageUser",
      },
    ],
  },
];

const Sidebar = () => {
  const parentRef = useRef();
  const [treeNavIndex, setTreeNavIndex] = useState(null);

  const toggleMenu = (index) => {
    setTreeNavIndex(index);
  };
  return (
    <>
      <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          <NavLink to="/" className="brand-link">
            <img
              src="/vite.svg"
              alt="AdminLTE Logo"
              className="brand-image opacity-75 shadow"
            />
            <span className="brand-text fw-light">AdminLTE 4</span>
          </NavLink>
        </div>
        <div className="sidebar-wrapper">
          <nav className="mt-2">
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              {SIDE_BAR_MENU.map((menu, menuIndex) => (
                <li
                  key={menuIndex}
                  className={`nav-item ${
                    treeNavIndex === menuIndex ? "menu-open" : ""
                  }`}
                  onClick={() => {
                    toggleMenu(menuIndex);
                  }}
                >
                  <NavLink
                    to={menu.path}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <i className={`nav-icon ${menu.icon}`}></i>

                    <p>
                      {menu.name}
                      {menu.subMenu.length > 0 && (
                        <i className="nav-arrow bi bi-chevron-right"></i>
                      )}
                    </p>
                  </NavLink>

                  {menu.subMenu.length > 0 && (
                    <ul className="nav nav-treeview">
                      {menu.subMenu.map((subMenu, subMenuKey) => (
                        <li key={subMenuKey} className="nav-item">
                          <NavLink
                            to={subMenu.path}
                            className={({ isActive }) =>
                              isActive ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className={`nav-icon ${subMenu.icon}`}></i>
                            <p>{subMenu.name}</p>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
