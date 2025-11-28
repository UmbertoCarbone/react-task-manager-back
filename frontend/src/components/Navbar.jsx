import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item">
        <span>Lista Task</span>
      </NavLink>

      <NavLink to="/add" className="nav-item">
        <span>Aggiungi Task</span>
      </NavLink>
    </nav>
  );
}
