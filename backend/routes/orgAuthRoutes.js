const express = require("express");
const router = express.Router();

const {
  registerOrg,
  loginOrg
} = require("../controllers/orgAuthController");

// Register organization
router.post("/register", registerOrg);

// Login organization
router.post("/login", loginOrg);

module.exports = router;
