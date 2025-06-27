// require("dotenv").config(); // Load env first

// const express = require("express");
// const cors = require("cors");
// const ConnectDB = require("./config/db");
// const authRoute = require("./routes/auth");
// const sendOtpRoute = require("./routes/otp");

// const app = express();

// app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

// ConnectDB();
// app.use("/", authRoute);
// app.use("/api", sendOtpRoute);

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Server is running on Port ${port}`);
// });
require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://meditation-frontend-01o4.onrender.com", // Frontend origin
  credentials: true
}));

// Connect to MongoDB
ConnectDB();

// Routes
app.use("/", authRoutes);   // e.g., /api/auth/login, /api/auth/register
app.use("/api", otpRoutes);     // e.g., /api/otp/send-otp, /api/otp/verify-otp

// Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
