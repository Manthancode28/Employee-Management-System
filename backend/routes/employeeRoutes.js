const express = require("express");
const router = express.Router();

const { addEmployee, getEmployees } = require("../controllers/employeeController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

/*
  Only Organization Admin can ADD employee
*/
router.post(
  "/add",
  auth,
  authorize("ORG_ADMIN"),
  addEmployee
);

/*
  Organization Admin + Employee can VIEW employees
  (organization-specific)
*/
router.get(
  "/",
  auth,
  authorize("ORG_ADMIN", "EMPLOYEE"),
  getEmployees
);

module.exports = router;
