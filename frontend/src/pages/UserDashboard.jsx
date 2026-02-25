import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("catering");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>WELCOME USER</h2>

      {/* CATEGORY DROPDOWN */}
      <div style={styles.dropdownBox}>
        <h4>Drop Down</h4>
        <select
          style={styles.select}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="catering">Catering</option>
          <option value="florist">Florist</option>
          <option value="decoration">Decoration</option>
          <option value="lighting">Lighting</option>
        </select>
      </div>

      {/* MENU BUTTONS */}
      <div style={styles.menu}>
        <button onClick={() => navigate(`/user/vendors/${category}`)}>
          Vendor
        </button>
        <button onClick={() => navigate("/user/cart")}>Cart</button>
        <button onClick={() => navigate("/user/request-item")}>
        Guest List
        </button>
        <button onClick={() => navigate("/user/order-status")}>
        Order Status
        </button>
      </div>

      <button style={styles.logout} onClick={logout}>
        LogOut
      </button>
    </div>
  );
}

const styles = {
  container: { padding: 40, background: "#ddd", minHeight: "100vh" },
  header: {
    background: "#4c78c9",
    color: "white",
    padding: 10,
    textAlign: "center",
  },
  dropdownBox: { marginTop: 20 },
  select: { padding: 10, marginTop: 10 },
  menu: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 40,
  },
  logout: { marginTop: 40 },
};