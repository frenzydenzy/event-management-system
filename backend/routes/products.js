const router = require("express").Router();
const Product = require("../models/product");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

/* ================= ADD PRODUCT (Vendor only) ================= */
router.post(
  "/add",
  auth(["vendor"]),
  upload.single("image"),
  async (req, res) => {
    try {
      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        vendorId: req.user.id,
        image: req.file ? `/uploads/${req.file.filename}` : null,
      });

      res.json(product);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

/* ================= GET ALL PRODUCTS (Public) ================= */
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
/* ================= GET VENDOR PRODUCTS ================= */
router.get("/my", auth(["vendor"]), async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/* ================= DELETE PRODUCT (Vendor only) ================= */
router.delete("/:id", auth(["vendor"]), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;