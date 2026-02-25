require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// connect DB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/test", require("./routes/test"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/order"));
app.use("/admin", require("./routes/admin"));
app.use("/user", require("./routes/user"));
app.use("/requests", require("./routes/request"));
app.use("/guests", require("./routes/guest"));


// test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));