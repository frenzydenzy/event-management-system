const router = require("express").Router();
const Membership = require("../models/membership");
const auth = require("../middleware/auth");

/* ================= ADD MEMBERSHIP ================= */
router.post("/membership/add", auth(["admin"]), async (req, res) => {
  try {
    const membership = await Membership.create(req.body);
    res.json(membership);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/* ================= UPDATE MEMBERSHIP ================= */
router.put("/membership/:id", auth(["admin"]), async (req, res) => {
  const updated = await Membership.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* ================= VIEW ALL MEMBERSHIPS ================= */
router.get("/membership", auth(["admin"]), async (req, res) => {
  const data = await Membership.find();
  res.json(data);
});
const User = require("../models/user");

/* ================= ALL USERS ================= */
router.get("/users", auth(["admin"]), async (req, res) => {
  const users = await User.find({ role: "user" });
  res.json(users);
});
/* ================= ALL VENDORS ================= */
router.get("/vendors", auth(["admin"]), async (req, res) => {
  const vendors = await User.find({ role: "vendor" });
  res.json(vendors);
});
/* ================= DELETE USER ================= */
router.delete("/user/:id", auth(["admin"]), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json("User deleted");
});

module.exports = router;