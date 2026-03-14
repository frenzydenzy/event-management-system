import { useNavigate } from "react-router-dom";

export default function VendorDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <div className="card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>🏪 Vendor Dashboard</h2>
        <p style={{ color: 'var(--secondary)' }}>Manage your products and track orders</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: '800px' }}>
        <div className="card">
          <h3>📦 Your Products</h3>
          <p>View and manage your product catalog</p>
          <button className="btn" onClick={() => navigate("/vendor/products")}>
            Manage Items
          </button>
        </div>

        <div className="card">
          <h3>➕ Add Product</h3>
          <p>List new items for sale</p>
          <button className="btn" onClick={() => navigate("/vendor/add-product")}>
            Add Item
          </button>
        </div>

        <div className="card">
          <h3>📋 Orders</h3>
          <p>View and update customer orders</p>
          <button className="btn" onClick={() => navigate("/vendor/status")}>
            View Orders
          </button>
        </div>

        <div className="card">
          <h3>📊 Analytics</h3>
          <p>Coming soon - sales insights</p>
          <button className="btn btn-secondary" disabled>
            Coming Soon
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button className="btn btn-secondary" onClick={logout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

const styles = {
  // Styles moved to CSS classes and inline styles
};
  },
  btn: {
    padding: "10px 20px",
    background: "#ddd",
    borderRadius: 6,
    border: "none",
  },
};