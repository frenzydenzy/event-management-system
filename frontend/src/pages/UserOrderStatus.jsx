import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function UserOrderStatus() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get("/orders/my");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button onClick={() => navigate("/user")}>Home</button>
        <h3>User Order Status</h3>
        <button onClick={logout}>LogOut</button>
      </div>

      <div style={styles.headerRow}>
        <div>Name</div>
        <div>E-mail</div>
        <div>Address</div>
        <div>Status</div>
      </div>

      {orders.map((o) => (
        <div key={o._id} style={styles.row}>
          <div>{o.customerName || "User"}</div>
          <div>{o.email || "-"}</div>
          <div>{o.address}</div>
          <div>{o.status}</div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { background: "#ddd", minHeight: "100vh", padding: 20 },
  topBar: { display: "flex", justifyContent: "space-between" },
  headerRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    background: "#4c78c9",
    color: "white",
    padding: 10,
    marginTop: 20,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    background: "#7ea0db",
    padding: 10,
    marginTop: 5,
  },
};