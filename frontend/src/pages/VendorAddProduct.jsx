import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function VendorAddProduct() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchProducts = async () => {
    const res = await api.get("/products/my");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("image", image);

    await api.post("/products/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setForm({ name: "", price: "" });
    setImage(null);
    setPreview(null);

    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        Welcome Vendor
        <div>
          <button onClick={() => navigate("/vendor/status")}>
            Product Status
          </button>
          <button
            onClick={() => navigate("/vendor/requests")}
            style={styles.topBtn}
          >
            Request Item
          </button>
          <button style={styles.topBtn}>View Product</button>
        </div>
      </div>

      <div style={styles.body}>
        {/* LEFT FORM */}
        <div style={styles.form}>
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Product Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />

          {/* IMAGE PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{ width: "100%", marginTop: 10 }}
            />
          )}

          <button onClick={addProduct}>Add The Product</button>
        </div>

        {/* TABLE */}
        <div style={styles.table}>
          <div style={styles.headerRow}>
            <div>Product Name</div>
            <div>Price</div>
            <div>Image</div>
            <div>Action</div>
          </div>

          {products.map((p) => (
            <div key={p._id} style={styles.row}>
              <div>{p.name}</div>
              <div>₹{p.price}</div>

              <div>
                {p.image && (
                  <img
                    src={`http://localhost:5000${p.image}`}
                    alt={p.name}
                    style={{ width: 60 }}
                  />
                )}
              </div>

              <div>
                <button onClick={() => deleteProduct(p._id)}>
                  Delete
                </button>
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
    alignItems: "center",
  },
};