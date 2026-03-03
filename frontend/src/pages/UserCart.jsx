import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function UserCart() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get("/orders/my");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const removeItem = async (id) => {
    await api.delete(`/orders/${id}`);
    fetchOrders();
  };

  const grandTotal = orders.reduce(
    (sum, o) => sum + (o.items?.[0]?.price || 0),
    0
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Shopping Cart</h2>

      <div style={styles.headerRow}>
        <div>Name</div>
        <div>Price</div>
        <div>Action</div>
      </div>

      {orders.map((o) => (
        <div key={o._id} style={styles.row}>
          <div>{o.items?.[0]?.name}</div>
          <div>₹{o.items?.[0]?.price}</div>
          <button onClick={() => removeItem(o._id)}>Remove</button>
        </div>
      ))}

      <div style={styles.total}>Grand Total: ₹{grandTotal}</div>

      <button
        style={styles.checkout}
        onClick={() => navigate("/user/checkout")}
      >
        Proceed to Checkout
      </button>
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
  },
  headerRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    background: "#4c78c9",
    color: "white",
    padding: 10,
    marginTop: 20,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    background: "#7ea0db",
    padding: 10,
    marginTop: 5,
  },
  total: {
    marginTop: 20,
    background: "#4c78c9",
    color: "white",
    padding: 10,
  },
  checkout: {
    marginTop: 20,
    padding: 10,
    width: "100%",
  },
};