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
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 style={{ marginBottom: '2rem', color: 'var(--primary)' }}>Welcome to EventMart</h2>
        <p style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Sign in to your account</p>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
          <input
            className="input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={() => navigate("/index")}>
            Cancel
          </button>
          <button className="btn" onClick={handleLogin}>
            Sign In
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p>Don't have an account? <a href="#" onClick={() => navigate("/signup-user")} style={{ color: 'var(--primary)' }}>Sign up as User</a> | <a href="#" onClick={() => navigate("/signup-vendor")} style={{ color: 'var(--primary)' }}>Sign up as Vendor</a></p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  // Removed old styles, using CSS classes now
};
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