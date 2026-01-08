const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const {
  addEmployee,
  getEmployees
} = require("../controllers/employeeController");

const { changeEmployeeRole } = require("../controllers/employeeController");

router.post(
  "/add",
  auth,
  authorize("admin"),
  addEmployee
);


router.get(
  "/",
  auth,
  authorize("admin", "manager"),
  getEmployees
);

router.put(
  "/change-role",
  auth,
  authorize("admin"),
  changeEmployeeRole
);

module.exports = router;
