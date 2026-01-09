const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  checkIn,
  checkOut,
  getOrgAttendance
} = require("../controllers/attendanceController");

router.post("/checkin", auth, checkIn);
router.post("/checkout", auth, checkOut);

module.exports = router;
