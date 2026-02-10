import { Link } from "react-router-dom";
import "./NavBar.css";
import { useAuth } from "../hooks/use-auth.js";

function NavBar() {
  const { auth, setAuth } = useAuth();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <img
            src="/brand-icon.png"
            alt="SoothingNest logo"
            className="brand-icon"
          />
          <span className="brand-text">Soothing&est</span>
        </div>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/fundraisers" className="navbar-link">
            Lives
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <Link to="/contact" className="navbar-link">
            Cantact
          </Link>
          {auth.token ? (
            <Link to="/" className="navbar-link" onClick={handleLogout}>
              Sign out
            </Link>
          ) : (
            <Link to="/login" className="navbar-link">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
