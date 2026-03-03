import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../utils/api";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [showUsers, setShowUsers] = useState(false);
  const [showVendors, setShowVendors] = useState(false);
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // FETCH USERS
  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
    setShowUsers(true);
  };

  // FETCH VENDORS
  const fetchVendors = async () => {
    const res = await api.get("/admin/vendors");
    setVendors(res.data);
    setShowVendors(true);
  };

  const deleteUser = async (id) => {
    await api.delete(`/admin/user/${id}`);
    fetchUsers();
  };

  return (
    <div style={styles.container}>
      {/* TOP BAR */}
      <div style={styles.topBar}>
        <button style={styles.btn}>Home</button>
        <button style={styles.btn} onClick={logout}>
          LogOut
        </button>
      </div>

      <div style={styles.welcome}>Welcome Admin</div>

      <div style={styles.actions}>
        <button style={styles.actionBtn} onClick={() => navigate("/admin-maintain")}>
          Maintain User
        </button>
        <button style={styles.actionBtn} onClick={() => navigate("/admin-maintain")}>
          Maintain Vendor
        </button>
      </div>

      {/* USER MODAL */}
      {showUsers && (
        <Modal title="Users" close={() => setShowUsers(false)}>
          {users.map((u) => (
            <div key={u._id} style={styles.row}>
              {u.name} ({u.email})
              <button onClick={() => deleteUser(u._id)}>Delete</button>
            </div>
          ))}
        </Modal>
      )}

      {/* VENDOR MODAL */}
      {showVendors && (
        <Modal title="Vendors" close={() => setShowVendors(false)}>
          {vendors.map((v) => (
            <div key={v._id} style={styles.row}>
              {v.name} ({v.category})
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
}

/* ---------- MODAL COMPONENT ---------- */
const Modal = ({ title, children, close }) => (
  <div style={styles.overlay}>
    <div style={styles.modal}>
      <h3>{title}</h3>
      <div>{children}</div>
      <button onClick={close}>Close</button>
    </div>
  </div>
);

/* ---------- STYLES ---------- */
const styles = {
  container: { minHeight: "100vh", background: "#d9d9d9", padding: 40 },
  topBar: { display: "flex", justifyContent: "space-between" },
  btn: {
    padding: "10px 20px",
    border: "2px solid green",
    borderRadius: 10,
    background: "white",
  },
  welcome: {
    margin: "50px auto",
    width: "50%",
    textAlign: "center",
    padding: 15,
    border: "2px solid green",
    borderRadius: 10,
    background: "white",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 80,
    padding: "0 100px",
  },
  actionBtn: {
    padding: "15px 30px",
    border: "2px solid green",
    borderRadius: 10,
    background: "white",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: 20,
    borderRadius: 8,
    width: 400,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: 10,
  },
};