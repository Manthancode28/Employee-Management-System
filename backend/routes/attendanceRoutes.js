const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  checkIn,
  checkOut
} = require("../controllers/attendanceController");

router.post("/checkin", auth, checkIn);
router.post("/checkout", auth, checkOut);

module.exports = router;
