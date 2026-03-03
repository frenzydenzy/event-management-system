import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";

export default function AdminMaintain() {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);
  const [memberships, setMemberships] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showVendors, setShowVendors] = useState(false);

  const [selectedVendor, setSelectedVendor] = useState("");
  const [duration, setDuration] = useState("6 months");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  /* ================= FETCH DATA ================= */
  const fetchVendors = async () => {
    const res = await api.get("/admin/vendors");
    setVendors(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
    setShowUsers(true);
  };

  const fetchMemberships = async () => {
    const res = await api.get("/admin/membership");
    setMemberships(res.data);
    setShowUpdate(true);
  };

  /* ================= MEMBERSHIP ================= */
  const openAddMembership = async () => {
    await fetchVendors();
    setShowAdd(true);
  };

  const addMembership = async () => {
    await api.post("/admin/membership/add", { vendorId: selectedVendor, duration });
    alert("Membership added");
    setShowAdd(false);
  };

  const updateMembership = async (id) => {
    await api.put(`/admin/membership/${id}`, { duration });
    alert("Updated");
    setShowUpdate(false);
  };

  /* ================= DELETE USER ================= */
  const deleteUser = async (id) => {
    await api.delete(`/admin/user/${id}`);
    fetchUsers();
  };

  return (
    <div style={styles.container}>
      {/* TOP BAR */}
      <div style={styles.topBar}>
        <button style={styles.btn} onClick={() => navigate("/admin")}>
          Home
        </button>
        <button style={styles.btn} onClick={logout}>
          LogOut
        </button>
      </div>

      {/* MEMBERSHIP SECTION */}
      <Section title="Membership">
        <button style={styles.centerBtn} onClick={openAddMembership}>
          Add
        </button>
        <button style={styles.centerBtn} onClick={fetchMemberships}>
          Update
        </button>
      </Section>

      {/* VENDOR MANAGEMENT */}
      <Section title="Vendor Management">
        <button
          style={styles.centerBtn}
          onClick={async () => {
            await fetchVendors();
            setShowVendors(true);
          }}
        >
          View Vendors
        </button>
      </Section>

      {/* USER MANAGEMENT */}
      <Section title="User Management">
        <button style={styles.centerBtn} onClick={fetchUsers}>
          View Users
        </button>
      </Section>

      {/* ADD MEMBERSHIP MODAL */}
      {showAdd && (
        <Modal close={() => setShowAdd(false)}>
          <h3>Add Membership</h3>
          <select
            style={styles.input}
            onChange={(e) => setSelectedVendor(e.target.value)}
          >
            <option>Select Vendor</option>
            {vendors.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name}
              </option>
            ))}
          </select>

          <select
            style={styles.input}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option>6 months</option>
            <option>1 year</option>
            <option>2 years</option>
          </select>

          <button onClick={addMembership}>Submit</button>
        </Modal>
      )}

      {/* UPDATE MEMBERSHIP MODAL */}
      {showUpdate && (
        <Modal close={() => setShowUpdate(false)}>
          <h3>Update Membership</h3>
          {memberships.map((m) => (
            <div key={m._id} style={styles.row}>
              {m.vendorId} ({m.duration})
              <button onClick={() => updateMembership(m._id)}>Update</button>
            </div>
          ))}
        </Modal>
      )}

      {/* USERS MODAL */}
      {showUsers && (
        <Modal close={() => setShowUsers(false)}>
          <h3>Users</h3>
          {users.map((u) => (
            <div key={u._id} style={styles.row}>
              {u.name} ({u.email})
              <button onClick={() => deleteUser(u._id)}>Delete</button>
            </div>
          ))}
        </Modal>
      )}

      {/* VENDORS MODAL */}
      {showVendors && (
        <Modal close={() => setShowVendors(false)}>
          <h3>Vendors</h3>
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

/* ---------- SECTION ---------- */
const Section = ({ title, children }) => (
  <div style={styles.section}>
    <div style={styles.sideBtn}>{title}</div>
    <div style={styles.centerBtns}>{children}</div>
  </div>
);

/* ---------- MODAL ---------- */
const Modal = ({ children, close }) => (
  <div style={styles.overlay}>
    <div style={styles.modal}>
      {children}
      <button onClick={close}>Close</button>
    </div>
  </div>
);

/* ---------- STYLES ---------- */
const styles = {
  container: { minHeight: "100vh", background: "#d9d9d9", padding: 40 },
  topBar: { display: "flex", justifyContent: "space-between", marginBottom: 40 },
  btn: { padding: 10, border: "2px solid green", borderRadius: 8 },
  section: { display: "flex", alignItems: "center", marginTop: 40 },
  sideBtn: { width: 180, padding: 10, border: "2px solid green" },
  centerBtns: { marginLeft: 120, display: "flex", flexDirection: "column", gap: 10 },
  centerBtn: { padding: 10, border: "2px solid green", width: 150 },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: { background: "white", padding: 20, borderRadius: 8, width: 350 },
  input: { marginTop: 10, width: "100%", padding: 8 },
  row: { display: "flex", justifyContent: "space-between", marginTop: 10 },
};