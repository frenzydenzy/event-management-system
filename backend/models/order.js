const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  address: String,
  status: {
    type: String,
    default: "Received"
  }
});

module.exports = mongoose.model("Order", orderSchema);