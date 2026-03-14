import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("catering");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>👋 Welcome to Your Dashboard</h2>
        <p style={{ color: 'var(--secondary)' }}>Browse vendors, manage your cart, and track your orders</p>
      </div>

      {/* CATEGORY SELECTION */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1rem' }}>Choose Service Category</h4>
        <select
          className="input"
          style={{ maxWidth: '300px' }}
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="catering">🍽️ Catering</option>
          <option value="florist">🌸 Florist</option>
          <option value="decoration">🎨 Decoration</option>
          <option value="lighting">💡 Lighting</option>
        </select>
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3>🏪 Browse Vendors</h3>
          <p>Find the perfect vendors for your event</p>
          <button className="btn" onClick={() => navigate(`/user/vendors/${category}`)}>
            View Vendors
          </button>
        </div>
        <div className="card">
          <h3>🛒 Your Cart</h3>
          <p>Review items in your shopping cart</p>
          <button className="btn" onClick={() => navigate("/user/cart")}>View Cart</button>
        </div>
        <div className="card">
          <h3>📋 Guest List</h3>
          <p>Manage your event guest list</p>
          <button className="btn" onClick={() => navigate("/user/request-item")}>
            Manage Guests
          </button>
        </div>
        <div className="card">
          <h3>📦 Order Status</h3>
          <p>Track your order progress</p>
          <button className="btn" onClick={() => navigate("/user/order-status")}>
            View Orders
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button className="btn btn-secondary" onClick={logout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

const styles = {
  // Styles moved to CSS classes
};
    textAlign: "center",
  },
  dropdownBox: { marginTop: 20 },
  select: { padding: 10, marginTop: 10 },
  menu: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 40,
  },
  logout: { marginTop: 40 },
};