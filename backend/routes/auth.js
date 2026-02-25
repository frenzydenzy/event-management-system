const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, category } = req.body;

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      category
    });

    res.json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json("Wrong password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret123"
    );

    res.json({
      token,
      role: user.role,
      name: user.name
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;