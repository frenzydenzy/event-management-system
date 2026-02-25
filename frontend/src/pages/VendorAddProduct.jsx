import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function VendorAddProduct() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/products/my", {
      headers: { Authorization: token },
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    await axios.post("http://localhost:5000/products", form, {
      headers: { Authorization: token },
    });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`, {
      headers: { Authorization: token },
    });
    fetchProducts();
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        Welcome Vendor
        <div>
          <button onClick={() => navigate("/vendor/status")}>Product Status</button>
          <button onClick={() => navigate("/vendor/requests")} style={styles.topBtn}>Request Item</button>
          <button style={styles.topBtn}>View Product</button>
        </div>
      </div>

      <div style={styles.body}>
        {/* LEFT FORM */}
        <div style={styles.form}>
          <input
            placeholder="Product Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Product Price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            placeholder="Product Image"
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <button onClick={addProduct}>Add The Product</button>
        </div>

        {/* TABLE */}
        <div style={styles.table}>
          <div style={styles.headerRow}>
            <div>Product Name</div>
            <div>Price</div>
            <div>Action</div>
          </div>

          {products.map((p) => (
            <div key={p._id} style={styles.row}>
              <div>{p.name}</div>
              <div>₹{p.price}</div>
              <div>
                <button onClick={() => deleteProduct(p._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { background: "#d9d9d9", minHeight: "100vh" },
  header: {
    background: "#4c78c9",
    color: "white",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  topBtn: { marginLeft: 10, background: "white" },
  body: { display: "flex", padding: 30 },
  form: {
    background: "#4c78c9",
    padding: 20,
    width: 300,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  table: { marginLeft: 40, flex: 1 },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    background: "#4c78c9",
    color: "white",
    padding: 10,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    background: "#7ea0db",
    padding: 10,
    marginTop: 5,
  },
};