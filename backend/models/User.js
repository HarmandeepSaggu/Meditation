const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  otp: { type: String },
  otpExpires: { type: Date },
  resetToken: String,
  resetTokenExpires: Date,
});


module.exports = mongoose.model("User", userSchema);
