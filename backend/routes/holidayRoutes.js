const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  addHoliday,
  getHolidays
} = require("../controllers/holidayController");

router.post("/", auth, authorize("admin"), addHoliday);
router.get("/", auth, getHolidays);

module.exports = router;
