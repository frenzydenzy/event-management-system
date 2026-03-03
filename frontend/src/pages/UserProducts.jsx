import { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";

export default function UserProducts() {
  const { vendorId } = useParams();
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get(`/user/vendor-products/${vendorId}`)
      .then((res) => setProducts(res.data));
  }, [vendorId]);

  const addToCart = async (product) => {
    await api.post(
      "/orders",
      {
        vendorId,
        items: [product],
        address: "Test Address",
      },
      { headers: { Authorization: token } }
    );
    alert("Added to cart / order placed");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Products</h2>

      <div style={styles.cards}>
        {products.map((p) => (
          <div key={p._id} style={styles.card}>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>
              Add to Cart
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