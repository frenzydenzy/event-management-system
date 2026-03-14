import { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";

export default function UserProducts() {
  const { vendorId } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get(`/user/vendor-products/${vendorId}`)
      .then((res) => setProducts(res.data));
  }, [vendorId]);

  const addToCart = async (product) => {
    await api.post("/cart/add", {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    alert("Added to cart");
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>🛍️ Available Products</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {products.map((p) => (
          <div key={p._id} className="card">
            <img src={`http://localhost:5000/uploads/${p.image}`} alt={p.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--border-radius)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>{p.name}</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>₹{p.price}</p>
            <button className="btn" onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  // Styles moved to CSS classes and inline styles
};