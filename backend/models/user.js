const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "vendor", "user"]
  },
  category: String // only for vendors (catering, florist etc.)
});

module.exports = mongoose.model("User", userSchema);