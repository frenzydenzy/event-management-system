const router = require("express").Router();
const User = require("../models/user");
const Product = require("../models/product");

/* ================= GET VENDORS BY CATEGORY ================= */
router.get("/vendors/:category", async (req, res) => {
  const vendors = await User.find({
    role: "vendor",
    category: req.params.category
  });
  res.json(vendors);
});

/* ================= GET PRODUCTS OF A VENDOR ================= */
router.get("/vendor-products/:vendorId", async (req, res) => {
  const products = await Product.find({
    vendorId: req.params.vendorId
  });
  res.json(products);
});

module.exports = router;