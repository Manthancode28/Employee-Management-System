const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
  getManagerAttendance
} = require("../controllers/attendanceController");

router.post("/checkin", auth, checkIn);
router.post("/checkout", auth, checkOut);

router.get("/me", auth, authorize("employee"), getMyAttendance);
router.get("/manager", auth, authorize("manager"), getManagerAttendance);
router.get("/all", auth, authorize("admin"), getAllAttendance);

module.exports = router;
