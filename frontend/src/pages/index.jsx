import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>🛍️ EventMart</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--secondary)' }}>
          Your one-stop solution for event planning, vendor booking, and seamless guest management.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn" onClick={() => navigate("/")}>
            Sign In
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/signup-user")}>
            Join as Customer
          </button>
          <button className="btn btn-success" onClick={() => navigate("/signup-vendor")}>
            Become a Vendor
          </button>
        </div>
      </div>
    </div>
  );
}