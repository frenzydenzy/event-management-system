const router = require("express").Router();
const Cart = require("../models/cart");
const auth = require("../middleware/auth");

/* ================= ADD TO CART ================= */
router.post("/add", auth(["user"]), async (req, res) => {
  const { productId, name, price, image } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ productId, name, price, image, quantity: 1 });
  }

  await cart.save();
  res.json(cart);
});

/* ================= GET CART ================= */
router.get("/", auth(["user"]), async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.json(cart || { items: [] });
});

/* ================= REMOVE ITEM FROM CART ================= */
router.delete("/item/:productId", auth(["user"]), async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();
  }
  res.json(cart);
});

/* ================= CLEAR CART ================= */
router.delete("/", auth(["user"]), async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user.id });
  res.json({ message: "Cart cleared" });
});

module.exports = router;