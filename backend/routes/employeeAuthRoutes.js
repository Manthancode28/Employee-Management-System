const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// ✅ IMPORT BOTH FUNCTIONS
const {
  loginEmployee,
  changePassword
} = require("../controllers/employeeAuthController");

// Employee login
router.post("/employee/login", loginEmployee);

// Employee change password (protected)
router.post(
  "/employee/change-password",
  auth,
  changePassword
);

module.exports = router;
