const router = require("express").Router();
const Guest = require("../models/guests");
const auth = require("../middleware/auth");

/* ================= ADD GUEST ================= */
router.post("/", auth(["user"]), async (req, res) => {
  const guest = await Guest.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(guest);
});

/* ================= GET MY GUESTS ================= */
router.get("/", auth(["user"]), async (req, res) => {
  const guests = await Guest.find({ userId: req.user.id });
  res.json(guests);
});

/* ================= UPDATE GUEST ================= */
router.put("/:id", auth(["user"]), async (req, res) => {
  const updated = await Guest.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* ================= DELETE GUEST ================= */
router.delete("/:id", auth(["user"]), async (req, res) => {
  await Guest.findByIdAndDelete(req.params.id);
  res.json("Guest removed");
});

module.exports = router;