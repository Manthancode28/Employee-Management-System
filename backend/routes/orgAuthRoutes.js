const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  registerOrg,
  loginOrg,
  setLeavePolicy,
  applyLeavePolicy
} = require("../controllers/orgAuthController");

/* AUTH */
router.post("/register", registerOrg);
router.post("/login", loginOrg);

/* 🔥 ADMIN LEAVE POLICY */
router.post(
  "/leave-policy",
  auth,
  authorize("admin"),
  setLeavePolicy
);

router.post(
  "/apply-leave-policy",
  auth,
  authorize("admin"),
  applyLeavePolicy
);

module.exports = router;
