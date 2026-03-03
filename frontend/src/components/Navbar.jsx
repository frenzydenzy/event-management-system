import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api";

function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = jwtDecode(token);
        setRole(payload.role);
        setName(payload.name || "");
      } catch (e) {
        // invalid token
        localStorage.removeItem("token");
      }
    }
  }, []);

  // load cart count for users
  useEffect(() => {
    if (role === "user") {
      api
        .get("/orders/my")
        .then((res) => setCartCount(res.data.length || 0))
        .catch((_) => {});
    }
  }, [role]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/index" className="nav-logo">
          Event‑Mgmt
        </Link>
        {role === "user" && (
          <>
            <Link to="/user">Dashboard</Link>
            <Link to="/user/cart">
              Cart {cartCount > 0 && <span>({cartCount})</span>}
            </Link>
          </>
        )}
        {role === "vendor" && (
          <>
            <Link to="/vendor">Dashboard</Link>
            <Link to="/vendor/status">Orders</Link>
          </>
        )}
        {role === "admin" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin-maintain">Maintenance</Link>
          </>
        )}
      </div>
      <div className="navbar-right">
        {role && <span className="navbar-user">{name}</span>}
        {role && (
          <button className="nav-logout" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
