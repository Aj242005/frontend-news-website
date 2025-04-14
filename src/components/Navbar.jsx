import { NavLink } from "react-router-dom";
import logo from "../assets/MyNewsLogo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4 sticky-top border-bottom">
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
        <div className="w-100 d-flex justify-content-center align-items-center">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img id="logoImage" src={logo} alt="Logo" />
          </NavLink>
        </div>

        <div className="w-100 d-flex justify-content-center align-items-center">
          <ul id="navbarItems" className="navbar-nav d-flex flex-row gap-4 mb-0">
            {[
              { to: "/", label: "Home" },
              { to: "/news", label: "News" },
              { to: "/chat", label: "Chat with AI" },
              { to: "/about", label: "About" },
            ].map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `nav-link px-2 ${isActive ? "fw-bold border-2 border-bottom border-danger text-dark" : "text-muted"}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
