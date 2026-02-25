const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  vendorId: String,
  duration: {
    type: String,
    enum: ["6 months", "1 year", "2 years"],
    default: "6 months"
  }
});

module.exports = mongoose.model("Membership", membershipSchema);