const express = require("express");
const router = express.Router();

const { loginEmployee } = require("../controllers/employeeAuthController");

// Employee login
router.post("/employee/login", loginEmployee);

module.exports = router;
