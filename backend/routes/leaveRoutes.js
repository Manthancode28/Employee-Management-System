const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  applyLeave,
  getManagerLeaves,
  updateLeaveStatus
} = require("../controllers/leaveController");

router.post("/", auth, authorize("employee"), applyLeave);

router.get(
  "/manager",
  auth,
  authorize("manager"),
  getManagerLeaves
);

router.patch(
  "/:leaveId",
  auth,
  authorize("manager"),
  updateLeaveStatus
);

module.exports = router;
