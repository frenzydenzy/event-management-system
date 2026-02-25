const router = require("express").Router();
const Product = require("../models/product");
const auth = require("../middleware/auth");

/* ================= ADD PRODUCT (Vendor only) ================= */
router.post("/add", auth(["vendor"]), async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      vendorId: req.user.id
    });
    res.json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/* ================= GET ALL PRODUCTS (Public) ================= */
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/* ================= DELETE PRODUCT (Vendor only) ================= */
router.delete("/:id", auth(["vendor"]), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;