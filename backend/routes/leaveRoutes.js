const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  applyLeave,
  getManagerLeaves,
  updateLeaveStatus,
  getMyLeaves
} = require("../controllers/leaveController");

/**
 * Employee / Manager
 */
router.post(
  "/",
  auth,
  authorize("employee", "manager"),
  applyLeave
);

/* ================= MANAGER VIEW ================= */
router.get(
  "/manager",
  auth,
  authorize("manager"),
  getManagerLeaves
);

/* ================= APPROVE / REJECT ================= */
router.patch(
  "/:leaveId",
  auth,
  authorize("manager"),
  updateLeaveStatus
);

module.exports = router;

router.get(
  "/me",
  auth,
  authorize("employee"),
  getMyLeaves
);
