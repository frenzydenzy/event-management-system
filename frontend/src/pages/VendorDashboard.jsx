import { useNavigate } from "react-router-dom";

export default function VendorDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.title}>Welcome Vendor</div>
      </div>

      {/* MENU BUTTONS */}
      <div style={styles.menu}>
        <button style={styles.btn}>Your Item</button>

        <button
          style={styles.btn}
          onClick={() => navigate("/vendor/add-product")}
        >
          Add New Item
        </button>

        <button style={styles.btn}>Transaction</button>

        <button style={styles.btn} onClick={logout}>
          LogOut
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#4c78c9",
    paddingTop: 60,
    textAlign: "center",
  },
  header: {
    background: "#ccc",
    width: "70%",
    margin: "auto",
    padding: 20,
    borderRadius: 6,
  },
  title: { fontSize: 20 },
  menu: {
    marginTop: 60,
    display: "flex",
    justifyContent: "center",
    gap: 20,
  },
  btn: {
    padding: "10px 20px",
    background: "#ddd",
    borderRadius: 6,
    border: "none",
  },
};