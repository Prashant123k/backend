const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
connectDB();
app.use("/api/users", routes.userRoutes);
app.use("/api/products", routes.productRoutes);
app.use("/api/orders", routes.orderRoutes);
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
