const User = require("../models/User");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Utility to generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ==============================
// SEND OTP CONTROLLER
// ==============================
exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await resend.emails.send({
      from: "Your App <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    });

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("OTP Send Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ==============================
// VERIFY OTP CONTROLLER
// ==============================
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ error: "Email and OTP are required" });

  try {
    const user = await User.findOne({ email });

    if (!user || !user.otp || !user.otpExpires)
      return res.status(404).json({ error: "OTP not requested or expired" });

    const isExpired = user.otpExpires < new Date();
    const isMatch = user.otp === otp;

    if (!isMatch) return res.status(400).json({ error: "Invalid OTP" });
    if (isExpired) return res.status(400).json({ error: "OTP expired" });

    // Set to null instead of deleting the fields
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "OTP verified. Proceed to next step." });
  } catch (err) {
    console.error("OTP Verify Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
