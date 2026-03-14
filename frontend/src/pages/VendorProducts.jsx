import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function VendorProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get("/products/my");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>📦 Your Product Catalog</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
        <button className="btn btn-secondary" onClick={() => navigate("/vendor")}>← Back to Dashboard</button>
        <button className="btn" onClick={() => navigate("/vendor/add-product")}>+ Add New Product</button>
      </div>

      {products.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>No products yet</h3>
          <p>Start by adding your first product!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {products.map((p) => (
            <div key={p._id} className="card">
              <img src={`http://localhost:5000/uploads/${p.image}`} alt={p.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--border-radius)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>{p.name}</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>₹{p.price}</p>
              <button className="btn btn-secondary" onClick={() => deleteProduct(p._id)}>
                Delete Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  // Styles moved to CSS classes and inline styles
};