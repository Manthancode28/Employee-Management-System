const express = require("express");
const router = express.Router();

const { addEmployee, getEmployees } = require("../controllers/employeeController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");


router.post(
  "/add",
  auth,
  authorize("ORG_ADMIN"),
  addEmployee
);


router.get(
  "/",
  auth,
  authorize("ORG_ADMIN", "EMPLOYEE"),
  getEmployees
);

module.exports = router;
