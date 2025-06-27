const express = require("express");
const router = express.Router();
const {register,login,resetPassword,} = require("../controllers/authControllers");

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// RESET PASSWORD
router.post("/reset-password", resetPassword);

module.exports = router;
