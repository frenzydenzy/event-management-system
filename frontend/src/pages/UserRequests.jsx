import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRequests() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");

  const sendRequest = async () => {
    await axios.post(
      "http://localhost:5000/requests",
      { itemName, description },
      { headers: { Authorization: token } }
    );
    alert("Request sent!");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button onClick={() => navigate("/user")}>Home</button>
        <h3>Request Item</h3>
        <button onClick={logout}>LogOut</button>
      </div>

      <div style={styles.grid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={styles.card}>
            <input
              placeholder={`Item ${i}`}
              onChange={(e) => setItemName(e.target.value)}
            />
            <textarea
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={sendRequest}>Request</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { background: "#ddd", minHeight: "100vh", padding: 20 },
  topBar: { display: "flex", justifyContent: "space-between" },
  grid: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 40,
  },
  card: {
    background: "#4c78c9",
    padding: 20,
    color: "white",
    width: 150,
  },
};