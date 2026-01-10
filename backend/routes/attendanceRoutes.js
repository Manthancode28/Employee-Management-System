const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { getManagerAttendance } = require("../controllers/attendanceController");


const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance
} = require("../controllers/attendanceController");

router.post("/checkin", auth, checkIn);
router.post("/checkout", auth, checkOut);

router.get("/me", auth, authorize("employee"), getMyAttendance);
router.get("/all", auth, authorize("admin"), getAllAttendance);

router.get(
  "/manager",
  auth,
  authorize("manager"),
  getManagerAttendance
);


module.exports = router;
