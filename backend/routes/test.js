const router = require("express").Router();
const auth = require("../middleware/auth");

// Admin only route
router.get("/admin", auth(["admin"]), (req, res) => {
  res.send("Welcome Admin 🔐");
});

// Vendor only route
router.get("/vendor", auth(["vendor"]), (req, res) => {
  res.send("Welcome Vendor 🛒");
});

module.exports = router;