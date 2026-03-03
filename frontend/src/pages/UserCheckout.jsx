import { useState } from "react";
import api from "../utils/api";

export default function UserCheckout() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
    payment: "COD",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [total, setTotal] = useState(0);

  const placeOrder = async () => {
    try {
      const res = await api.post("/orders", form);
      // backend could return order details including total price
      const order = res.data;
      setTotal(order.items?.reduce((s, i) => s + i.price, 0) || 0);
      setShowPopup(true);
    } catch (err) {
      console.error(err);
      alert("Unable to place order");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Details</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key.toUpperCase()}
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button style={styles.orderBtn} onClick={placeOrder}>
        Order Now
      </button>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2>THANK YOU</h2>

            <div style={styles.total}>Total Amount: ₹{total}</div>

            <div style={styles.grid}>
              <Field label="Name" value={form.name} />
              <Field label="Number" value={form.phone} />
              <Field label="E-mail" value={form.email} />
              <Field label="Payment Method" value={form.payment} />
              <Field label="Address" value={form.address} />
              <Field label="State" value={form.state} />
              <Field label="City" value={form.city} />
              <Field label="PinCode" value={form.pin} />
            </div>

            <button
              style={styles.continue}
              onClick={() => (window.location.href = "/user")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- FIELD ---------- */
const Field = ({ label, value }) => (
  <div style={styles.field}>
    <strong>{label}</strong>
    <div>{value}</div>
  </div>
);

/* ---------- STYLES ---------- */
const styles = {
  container: { padding: 20, background: "#ddd", minHeight: "100vh" },
  title: {
    background: "#4c78c9",
    color: "white",
    padding: 10,
    textAlign: "center",
  },
  input: {
    display: "block",
    width: "100%",
    padding: 10,
    marginTop: 10,
  },
  orderBtn: {
    marginTop: 20,
    padding: 12,
    width: "100%",
    background: "#4c78c9",
    color: "white",
  },

  /* POPUP */
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    background: "white",
    padding: 30,
    borderRadius: 10,
    width: 400,
    textAlign: "center",
  },
  total: {
    background: "#4c78c9",
    color: "white",
    padding: 10,
    margin: "10px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginTop: 20,
  },
  field: {
    background: "#4c78c9",
    color: "white",
    padding: 10,
    borderRadius: 8,
  },
  continue: {
    marginTop: 20,
    padding: 12,
    width: "100%",
    background: "#4c78c9",
    color: "white",
  },
};