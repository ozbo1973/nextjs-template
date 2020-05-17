const express = require("express");
const {
  validateSignup,
  validateLogin,
  requireAuth,
} = require("../../middlewares/authValidators");
const { login, signup, logout } = require("./auth.controller");

const router = express.Router();

router.post("/login", [validateLogin], login);
router.post("/signup", [validateSignup], signup);
router.get("/logout", [requireAuth], logout);

module.exports = router;
