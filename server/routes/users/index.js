const express = require("express");
const { requireAuth } = require("../../middlewares/authValidators");
const { myProfile } = require("./users.controller");

const router = express.Router();

router.get("/my-profile", requireAuth, myProfile);

module.exports = router;
