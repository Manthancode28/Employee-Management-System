const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  addEmployee,
  getEmployees,
  changeEmployeeRole,
  getMyLeaveBalance
} = require("../controllers/employeeController");

/* ================= ADD EMPLOYEE ================= */
router.post(
  "/add",
  auth,
  authorize("admin"),
  addEmployee
);

/* ================= GET EMPLOYEES ================= */
router.get(
  "/",
  auth,
  authorize("admin", "manager"),
  getEmployees
);

/* ================= CHANGE ROLE ================= */
router.put(
  "/change-role",
  auth,
  authorize("admin"),
  changeEmployeeRole
);

router.get(
  "/me/leave-balance",
  auth,
  authorize("employee"),
  getMyLeaveBalance
);
module.exports = router;
