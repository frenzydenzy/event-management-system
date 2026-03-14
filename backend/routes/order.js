const router = require("express").Router();
const Order = require("../models/order");
const auth = require("../middleware/auth");

/* ================= PLACE ORDER (User only) ================= */
router.post("/create", auth(["user"]), async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      userId: req.user.id
    });
    res.json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/* ================= USER ORDER HISTORY ================= */
router.get("/my", auth(["user"]), async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

/* ================= VENDOR UPDATE STATUS ================= */
router.put("/:id", auth(["vendor"]), async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
});

/* ================= ADMIN VIEW ALL ORDERS ================= */
router.get("/all", auth(["admin"]), async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});
/* ================= CANCEL ORDER (User only) ================= */
router.delete("/:id", auth(["user"]), async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!order) return res.status(404).json("Order not found");

    res.json("Order cancelled");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/* ================= VENDOR VIEW ORDERS ================= */
router.get("/vendor", auth(["vendor"]), async (req, res) => {
  const Product = require("../models/product");
  const User = require("../models/user");
  // Find orders where any item has a product with vendorId == req.user.id
  const orders = await Order.find({
    "items.productId": { $exists: true }
  }).populate({
    path: "items.productId",
    model: "Product"
  }).populate({
    path: "userId",
    model: "User",
    select: "name email"
  });

  const vendorOrders = orders.filter(order =>
    order.items.some(item => item.productId && item.productId.vendorId === req.user.id)
  );

  res.json(vendorOrders);
});

module.exports = router;