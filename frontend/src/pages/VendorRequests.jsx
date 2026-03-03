import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function VendorRequests() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await api.get("/requests/all");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Request Item</h2>

      <div style={styles.topBar}>
        <button onClick={() => navigate("/vendor/add-product")}>Home</button>
        <button onClick={logout}>LogOut</button>
      </div>

      <div style={styles.grid}>
        {requests.map((r, i) => (
          <div key={i} style={styles.card}>
            <h4>{r.itemName}</h4>
            <p>{r.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { background: "#ddd", minHeight: "100vh", padding: 20 },
  title: {
    background: "#4c78c9",
    color: "white",
    padding: 10,
    textAlign: "center",
  },
  topBar: { display: "flex", justifyContent: "space-between", marginTop: 10 },
  grid: {
    marginTop: 30,
    display: "flex",
    justifyContent: "space-around",
  },
  card: {
    background: "#4c78c9",
    color: "white",
    padding: 30,
    width: 150,
    textAlign: "center",
  },
};