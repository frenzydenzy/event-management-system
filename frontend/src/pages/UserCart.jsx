import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function UserCart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState({ items: [] });

  const fetchCart = async () => {
    const res = await api.get("/cart");
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    await api.delete(`/cart/item/${productId}`);
    fetchCart();
  };

  const checkout = async () => {
    await api.post("/orders/create", {
      items: cart.items,
      address: "Test Address",
    });
    await api.delete("/cart"); // clear cart
    alert("Order placed");
    navigate("/user/order-status");
  };

  const grandTotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>🛒 Your Shopping Cart</h2>

      {cart.items.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <button className="btn" onClick={() => navigate('/user')}>Browse Products</button>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
            {cart.items.map((item) => (
              <div key={item.productId} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--border-radius)' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h3>
                  <p style={{ margin: '0', fontWeight: 'bold', color: 'var(--primary)' }}>₹{item.price} x {item.quantity}</p>
                </div>
                <button className="btn btn-secondary" onClick={() => removeItem(item.productId)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>Order Summary</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>Total: ₹{grandTotal}</p>
            <button className="btn btn-success" onClick={checkout} style={{ marginTop: '1rem' }}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  // Styles moved to CSS classes and inline styles
};