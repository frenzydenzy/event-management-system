import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, role, name } = res.data;
      localStorage.setItem("token", token);
      if (role) localStorage.setItem("role", role);
      if (name) localStorage.setItem("name", name);

      // ROLE BASED REDIRECT
      if (role === "admin") navigate("/admin");
      else if (role === "vendor") navigate("/vendor");
      else navigate("/user");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div style={styles.box}>
        <h2 style={styles.title}>Event Management System</h2>

        <div style={styles.formRow}>
          <div style={styles.label}>User Id</div>
          <input
            style={styles.input}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.formRow}>
          <div style={styles.label}>Password</div>
          <input
            type="password"
            style={styles.input}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={styles.buttonRow}>
<button className="btn" onClick={() => navigate("/index") }>
            Cancel
          </button>
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#d9d9d9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 600,
    background: "#e5e5e5",
    padding: 30,
    borderRadius: 6,
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  title: {
    background: "linear-gradient(to right, #6fa8dc, #3d85c6)",
    color: "white",
    padding: 10,
    textAlign: "center",
    marginBottom: 40,
  },
  formRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    width: 120,
    background: "#3d85c6",
    color: "white",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
    marginRight: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    background: "linear-gradient(to right, #9fc5e8, #6fa8dc)",
    border: "none",
    borderRadius: 4,
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 30,
  },
  cancel: {
    padding: "10px 25px",
    background: "#999",
    border: "none",
    borderRadius: 6,
  },
  login: {
    padding: "10px 25px",
    background: "#666",
    color: "white",
    border: "none",
    borderRadius: 6,
  },
};