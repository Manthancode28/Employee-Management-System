const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");


const {
  loginEmployee,
  changePassword
} = require("../controllers/employeeAuthController");


router.post("/employee/login", loginEmployee);


router.post(
  "/employee/change-password",
  auth,
  changePassword
);

module.exports = router;
