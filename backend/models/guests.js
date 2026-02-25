const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  phone: String
});

module.exports = mongoose.model("Guest", guestSchema);