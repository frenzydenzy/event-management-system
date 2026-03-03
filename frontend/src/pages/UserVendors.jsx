import { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";

export default function UserVendors() {
  const { category } = useParams();
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/user/vendors/${category}`)
      .then((res) => setVendors(res.data));
  }, [category]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Vendor {category}</h2>

      <div style={styles.cards}>
        {vendors.map((v) => (
          <div key={v._id} style={styles.card}>
            <h3>{v.name}</h3>
            <p>Contact Details</p>
            <button
              onClick={() => navigate(`/user/products/${v._id}`)}
            >
              Shop Item
            </button>
          </div>
        ))}
      </div>
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
  cards: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 40,
  },
  card: {
    background: "#4c78c9",
    color: "white",
    padding: 20,
    borderRadius: 20,
    textAlign: "center",
  },
};