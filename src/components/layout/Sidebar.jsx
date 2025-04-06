import { NavLink } from "react-router-dom";
import NavLinkTree from "../NavLinkTree";

const Sidebar = () => {
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
              <NavLinkTree>
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
              </NavLinkTree>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
