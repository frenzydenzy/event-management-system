import { useState } from "react";
import api from "../utils/api";

export default function SignupUser() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSignup = async () => {
    await api.post("/auth/register", {
      ...form,
      role: "user",
    });
    alert("User registered");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Event Management System</h2>

      <Input label="Name" onChange={(v) => setForm({ ...form, name: v })} />
      <Input label="Email" onChange={(v) => setForm({ ...form, email: v })} />
      <Input
        label="Password"
        type="password"
        onChange={(v) => setForm({ ...form, password: v })}
      />

      <button style={styles.btn} onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
}

const Input = ({ label, type = "text", onChange }) => (
  <div style={styles.row}>
    <div style={styles.label}>{label}</div>
    <input
      type={type}
      style={styles.input}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const styles = {
  container: { padding: 40, background: "#ccc", minHeight: "100vh" },
  title: { textAlign: "center", background: "#7aa6d8", padding: 10 },
  row: { display: "flex", margin: 15 },
  label: { width: 120, background: "#3d6fb6", color: "white", padding: 10 },
  input: { flex: 1, padding: 10, background: "#6f95d8", border: "none" },
  btn: { marginTop: 20, padding: 10 },
};