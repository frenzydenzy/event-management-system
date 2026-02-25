import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Welcome to Event Management System</h1>

      <p style={styles.desc}>
        Plan events, book vendors, and manage guests easily.
      </p>

      <div>
        <button style={styles.btn} onClick={() => navigate("/")}>
          Login
        </button>

        <button style={styles.btn} onClick={() => navigate("/signup-user")}>
          Signup as User
        </button>

        <button style={styles.btn} onClick={() => navigate("/signup-vendor")}>
          Signup as Vendor
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#f2f2f2",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  desc: { margin: 20 },
  btn: { margin: 8, padding: "10px 20px" },
};