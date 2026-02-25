const router = require("express").Router();
const Request = require("../models/request");
const auth = require("../middleware/auth");

/* ================= USER CREATE REQUEST ================= */
router.post("/", auth(["user"]), async (req, res) => {
  const request = await Request.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(request);
});

/* ================= USER VIEW OWN REQUESTS ================= */
router.get("/my", auth(["user"]), async (req, res) => {
  const data = await Request.find({ userId: req.user.id });
  res.json(data);
});

/* ================= VENDOR/ADMIN VIEW ALL REQUESTS ================= */
router.get("/all", auth(["vendor", "admin"]), async (req, res) => {
  const data = await Request.find();
  res.json(data);
});

module.exports = router;