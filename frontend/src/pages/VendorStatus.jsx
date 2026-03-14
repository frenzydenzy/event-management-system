import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function VendorStatus() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get("/orders/vendor");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status });
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await api.delete(`/orders/${id}`);
    fetchOrders();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Product Status</h2>

      <div style={styles.topBar}>
        <button onClick={() => navigate("/vendor/add-product")}>Home</button>
        <button onClick={logout}>LogOut</button>
      </div>

      <div style={styles.tableHeader}>
        <div>Name</div>
        <div>Email</div>
        <div>Address</div>
        <div>Status</div>
        <div>Update</div>
        <div>Delete</div>
      </div>

      {orders.map((o) => (
        <div key={o._id} style={styles.row}>
          <div>{o.userId?.name || "User"}</div>
          <div>{o.userId?.email || "-"}</div>
          <div>{o.address}</div>
          <div>{o.status}</div>
          <button onClick={() => updateStatus(o._id, "Shipped")}>
            Update
          </button>
          <button onClick={() => deleteOrder(o._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: 20, background: "#ddd", minHeight: "100vh" },
  title: {
    background: "#4c78c9",
    color: "white",
    padding: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  topBar: { display: "flex", justifyContent: "space-between" },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    background: "#4c78c9",
    color: "white",
    padding: 10,
    marginTop: 20,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    background: "#7ea0db",
    padding: 10,
    marginTop: 5,
  },
};